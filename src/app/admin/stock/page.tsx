"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import {
  Boxes,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Save,
  Clock,
  Sparkles,
  PackagePlus,
  ArrowUpRight,
  RefreshCw,
  Layers,
} from "lucide-react";

interface StockRow {
  productId: string;
  productName: string;
  productImage: string;
  categoryName: string;
  categoryId: string;
  variantId: string;
  variantName: string;
  weightGram?: number | null;
  price: number;
  originalStock: number;
  currentStock: number;
  isAvailable: boolean;
  isModified: boolean;
  saving?: boolean;
}

export default function AdminStockPage() {
  const [rows, setRows] = useState<StockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState<"ALL" | "LOW" | "OUT">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [batchSaving, setBatchSaving] = useState(false);

  // Quick Inflow Modal
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickVariantId, setQuickVariantId] = useState("");
  const [quickAddAmount, setQuickAddAmount] = useState(10);
  const [quickSubmitting, setQuickSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadStockData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      if (json.success) {
        const flatList: StockRow[] = [];
        (json.data as Product[]).forEach((p) => {
          p.variants.forEach((v) => {
            flatList.push({
              productId: p.id,
              productName: p.name,
              productImage: p.image,
              categoryName: p.category?.name || "Kategori",
              categoryId: p.categoryId,
              variantId: v.id,
              variantName: v.name,
              weightGram: v.weightGram,
              price: v.price,
              originalStock: v.stock,
              currentStock: v.stock,
              isAvailable: v.isAvailable,
              isModified: false,
            });
          });
        });
        setRows(flatList);
        if (flatList.length > 0) {
          setQuickVariantId((prev) => prev || flatList[0].variantId);
        }
      }
    } catch (e) {
      console.error("Gagal memuat data stok:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStockData();
  }, [loadStockData]);


  // Update a single row stock locally
  const handleStockChange = (variantId: string, val: number) => {
    const safeVal = Math.max(0, isNaN(val) ? 0 : val);
    setRows((prev) =>
      prev.map((r) =>
        r.variantId === variantId
          ? {
              ...r,
              currentStock: safeVal,
              isModified: safeVal !== r.originalStock,
              isAvailable: safeVal > 0,
            }
          : r
      )
    );
  };

  // Add quick amount (+5, +10, +20, +50)
  const handleQuickIncrement = (variantId: string, delta: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.variantId === variantId) {
          const nextVal = Math.max(0, r.currentStock + delta);
          return {
            ...r,
            currentStock: nextVal,
            isModified: nextVal !== r.originalStock,
            isAvailable: nextVal > 0,
          };
        }
        return r;
      })
    );
  };

  // Toggle availability
  const handleToggleAvailable = (variantId: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.variantId === variantId
          ? { ...r, isAvailable: !r.isAvailable, isModified: true }
          : r
      )
    );
  };

  // Save single row
  const handleSaveSingleRow = async (variantId: string) => {
    const target = rows.find((r) => r.variantId === variantId);
    if (!target) return;

    setRows((prev) =>
      prev.map((r) => (r.variantId === variantId ? { ...r, saving: true } : r))
    );

    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: target.productId,
          variantId: target.variantId,
          stock: target.currentStock,
          isAvailable: target.isAvailable,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setRows((prev) =>
          prev.map((r) =>
            r.variantId === variantId
              ? {
                  ...r,
                  originalStock: r.currentStock,
                  isModified: false,
                  saving: false,
                }
              : r
          )
        );
        showToast(`Stok "${target.productName} (${target.variantName})" berhasil disimpan!`);
      } else {
        alert(json.message || "Gagal menyimpan stok");
        setRows((prev) =>
          prev.map((r) => (r.variantId === variantId ? { ...r, saving: false } : r))
        );
      }
    } catch {
      alert("Terjadi kendala koneksi.");
      setRows((prev) =>
        prev.map((r) => (r.variantId === variantId ? { ...r, saving: false } : r))
      );
    }
  };

  // Save all modified rows
  const handleSaveAllModified = async () => {
    const modified = rows.filter((r) => r.isModified);
    if (modified.length === 0) return;

    setBatchSaving(true);
    try {
      const res = await fetch("/api/admin/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: modified.map((r) => ({
            productId: r.productId,
            variantId: r.variantId,
            newStock: r.currentStock,
            isAvailable: r.isAvailable,
          })),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setRows((prev) =>
          prev.map((r) => ({
            ...r,
            originalStock: r.currentStock,
            isModified: false,
          }))
        );
        showToast(`Berhasil memperbarui ${modified.length} varian stok kue!`);
      } else {
        alert(json.message || "Gagal memperbarui batch stok.");
      }
    } catch {
      alert("Terjadi kendala saat menyimpan semua stok.");
    } finally {
      setBatchSaving(false);
    }
  };

  // Quick Inflow Modal Submit
  const handleQuickAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = rows.find((r) => r.variantId === quickVariantId);
    if (!target) return;

    setQuickSubmitting(true);
    const newStockTotal = target.currentStock + quickAddAmount;

    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: target.productId,
          variantId: target.variantId,
          stock: newStockTotal,
          isAvailable: true,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setRows((prev) =>
          prev.map((r) =>
            r.variantId === quickVariantId
              ? {
                  ...r,
                  currentStock: newStockTotal,
                  originalStock: newStockTotal,
                  isAvailable: true,
                  isModified: false,
                }
              : r
          )
        );
        showToast(
          `+${quickAddAmount} unit berhasil ditambahkan ke ${target.productName} (${target.variantName})!`
        );
        setIsQuickAddOpen(false);
      } else {
        alert(json.message || "Gagal menambah stok.");
      }
    } catch {
      alert("Koneksi bermasalah.");
    } finally {
      setQuickSubmitting(false);
    }
  };

  // KPIs
  const totalVariants = rows.length;
  const totalUnits = rows.reduce((acc, r) => acc + r.currentStock, 0);
  const lowStockCount = rows.filter((r) => r.currentStock > 0 && r.currentStock < 10).length;
  const outOfStockCount = rows.filter((r) => r.currentStock === 0).length;
  const hasModifiedItems = rows.some((r) => r.isModified);

  // Filtered rows
  const filteredRows = rows.filter((r) => {
    const matchCat = selectedCategory === "ALL" || r.categoryId === selectedCategory;
    const matchQuery =
      r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.variantName.toLowerCase().includes(searchQuery.toLowerCase());
    let matchStock = true;
    if (stockFilter === "LOW") matchStock = r.currentStock > 0 && r.currentStock < 10;
    if (stockFilter === "OUT") matchStock = r.currentStock === 0;

    return matchCat && matchQuery && matchStock;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight flex items-center gap-2.5">
            <Boxes className="w-7 h-7 text-red-800" />
            <span>Entry &amp; Penyesuaian Stok Kue</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Catat hasil panggangan kue baru, tambah unit toples, dan sesuaikan stok ketersediaan secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <PackagePlus className="w-4 h-4" />
            <span>+ Catat Kue Baru Matang</span>
          </button>

          {hasModifiedItems && (
            <button
              onClick={handleSaveAllModified}
              disabled={batchSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] animate-pulse"
            >
              {batchSaving ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Simpan Semua Perubahan</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Total Unit Tersedia
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            {totalUnits}{" "}
            <span className="text-xs font-normal text-stone-500">toples / loyang</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Total Varian Terdata
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            {totalVariants}{" "}
            <span className="text-xs font-normal text-stone-500">macam</span>
          </div>
        </div>

        <div
          onClick={() => setStockFilter(stockFilter === "LOW" ? "ALL" : "LOW")}
          className={`p-4 sm:p-5 rounded-3xl border shadow-sm space-y-1 cursor-pointer transition-all ${
            stockFilter === "LOW"
              ? "bg-amber-100 border-amber-400 ring-2 ring-amber-400/30"
              : "bg-white border-amber-200 hover:border-amber-300"
          }`}
        >
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block flex items-center justify-between">
            <span>Stok Menipis (&lt; 10)</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-amber-900">
            {lowStockCount}{" "}
            <span className="text-xs font-normal text-amber-700">varian</span>
          </div>
        </div>

        <div
          onClick={() => setStockFilter(stockFilter === "OUT" ? "ALL" : "OUT")}
          className={`p-4 sm:p-5 rounded-3xl border shadow-sm space-y-1 cursor-pointer transition-all ${
            stockFilter === "OUT"
              ? "bg-rose-100 border-rose-400 ring-2 ring-rose-400/30"
              : "bg-white border-rose-200 hover:border-rose-300"
          }`}
        >
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block flex items-center justify-between">
            <span>Stok Habis (0)</span>
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-rose-900">
            {outOfStockCount}{" "}
            <span className="text-xs font-normal text-rose-700">varian</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "ALL"
                ? "bg-red-800 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Semua Kategori
          </button>
          <button
            onClick={() => setSelectedCategory("cat-kering")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "cat-kering"
                ? "bg-red-800 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Kue Kering
          </button>
          <button
            onClick={() => setSelectedCategory("cat-cake")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "cat-cake"
                ? "bg-red-800 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Cake &amp; Roll
          </button>
          <button
            onClick={() => setSelectedCategory("cat-hampers")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "cat-hampers"
                ? "bg-red-800 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Hampers
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama kue / varian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-xs text-stone-500">
            <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
            <span>Memuat data persediaan stok...</span>
          </div>
        ) : filteredRows.length === 0 ? (
          <div className="p-16 text-center text-xs text-stone-500 space-y-2">
            <Boxes className="w-8 h-8 mx-auto text-stone-400" />
            <p className="font-bold text-stone-700 text-sm">Tidak ada varian stok yang cocok</p>
            <p>Silakan sesuaikan filter atau kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Kue &amp; Varian</th>
                  <th className="py-3.5 px-3">Harga</th>
                  <th className="py-3.5 px-3 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Stok Saat Ini</th>
                  <th className="py-3.5 px-4">Entry / Tambah Cepat</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredRows.map((r) => {
                  const isLow = r.currentStock > 0 && r.currentStock < 10;
                  const isOut = r.currentStock === 0;

                  return (
                    <tr
                      key={r.variantId}
                      className={`hover:bg-stone-50/60 transition-colors ${
                        r.isModified ? "bg-amber-50/40" : ""
                      }`}
                    >
                      {/* Product & Variant Details */}
                      <td className="py-3 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                            <Image
                              src={r.productImage}
                              alt={r.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-sm">
                              {r.productName}
                            </div>
                            <div className="text-stone-500 font-medium">
                              {r.variantName}{" "}
                              {r.weightGram && (
                                <span className="text-stone-400">
                                  ({r.weightGram}g)
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400">
                              {r.categoryName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 font-semibold text-stone-800">
                        {formatRupiah(r.price)}
                      </td>

                      {/* Availability Badge */}
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleAvailable(r.variantId)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition-colors ${
                            r.isAvailable && !isOut
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                          }`}
                        >
                          {r.isAvailable && !isOut ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              <span>Tersedia</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                              <span>Habis</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Current Stock Input */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            value={r.currentStock}
                            onChange={(e) =>
                              handleStockChange(r.variantId, parseInt(e.target.value))
                            }
                            className={`w-20 px-2 py-1.5 text-center font-bold text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-700 ${
                              isOut
                                ? "border-rose-300 bg-rose-50 text-rose-900"
                                : isLow
                                ? "border-amber-300 bg-amber-50 text-amber-900"
                                : "border-stone-200 text-stone-900 bg-white"
                            }`}
                          />
                          <span className="text-[11px] text-stone-400 font-medium">
                            unit
                          </span>
                        </div>
                      </td>

                      {/* Quick Add Inflow (+5, +10, +20) */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {[5, 10, 20, 50].map((delta) => (
                            <button
                              key={delta}
                              type="button"
                              onClick={() => handleQuickIncrement(r.variantId, delta)}
                              className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold transition-colors"
                            >
                              +{delta}
                            </button>
                          ))}
                        </div>
                      </td>

                      {/* Row Action (Save) */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          disabled={!r.isModified || r.saving}
                          onClick={() => handleSaveSingleRow(r.variantId)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                            r.isModified
                              ? "bg-red-800 hover:bg-red-900 text-white shadow-sm"
                              : "bg-stone-100 text-stone-400 cursor-not-allowed"
                          }`}
                        >
                          {r.saving ? (
                            <Clock className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Save className="w-3.5 h-3.5" />
                          )}
                          <span>Simpan</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK INFLOW MODAL */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif font-black text-lg text-stone-900">
                  Catat Kue Baru Selesai Dipanggang
                </h3>
                <p className="text-xs text-stone-500">
                  Tambahkan hasil produksi dapur langsung ke stok toko.
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Pilih Kue &amp; Varian:
                </label>
                <select
                  value={quickVariantId}
                  onChange={(e) => setQuickVariantId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 font-semibold"
                >
                  {rows.map((r) => (
                    <option key={r.variantId} value={r.variantId}>
                      {r.productName} — {r.variantName} (Stok saat ini: {r.currentStock} unit)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Jumlah Baru Matang (Unit Masuk):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    required
                    value={quickAddAmount}
                    onChange={(e) => setQuickAddAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-28 px-3 py-2 text-center text-sm font-bold rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
                  />
                  <div className="flex items-center gap-1">
                    {[10, 20, 30, 50].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setQuickAddAmount(amt)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          quickAddAmount === amt
                            ? "bg-amber-600 text-white"
                            : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                        }`}
                      >
                        +{amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Stok otomatis bertambah dan status kue akan langsung aktif <strong>Tersedia</strong> untuk pelanggan.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={quickSubmitting}
                  className="px-5 py-2 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {quickSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Menambahkan...</span>
                    </>
                  ) : (
                    <>
                      <PackagePlus className="w-4 h-4 text-amber-300" />
                      <span>Tambah ke Stok Toko</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
