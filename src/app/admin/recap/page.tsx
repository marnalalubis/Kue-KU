"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { OrderStatus } from "@/types";

import {
  ClipboardCheck,
  Printer,
  Calendar,
  ChefHat,
  Search,
  Filter,
  CheckSquare,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Boxes,
  Users,
  CheckCircle2,
  Package,
} from "lucide-react";

interface ItemRecap {
  productId: string;
  variantId?: string | null;
  productName: string;
  variantName: string;
  totalQuantity: number;
  currentStock: number;
  deficit: number;
  datesBreakdown: Record<string, number>;
  orders: {
    orderCode: string;
    customerName: string;
    customerPhone: string;
    quantity: number;
    deliveryDate: string;
    status: string;
  }[];
}

interface DateRecap {
  date: string;
  orderCount: number;
  totalItems: number;
  items: {
    name: string;
    variant: string;
    quantity: number;
  }[];
}

interface OrderItemInfo {
  productName: string;
  variantName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderInfo {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDate: string;
  notes?: string | null;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  items: OrderItemInfo[];
}

export default function AdminRecapPage() {
  const [loading, setLoading] = useState(true);
  const [itemsRecap, setItemsRecap] = useState<ItemRecap[]>([]);
  const [datesRecap, setDatesRecap] = useState<DateRecap[]>([]);
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCakesToMake, setTotalCakesToMake] = useState(0);

  // Filters
  const [selectedDate, setSelectedDate] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("TO_MAKE");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ITEMS" | "DATES" | "PACKING">("ITEMS");

  // Expandable row states
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const fetchRecapData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedDate !== "ALL") params.append("date", selectedDate);
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);

      const res = await fetch(`/api/admin/recap?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setItemsRecap(json.data.itemsRecap);
        setDatesRecap(json.data.datesRecap);
        setOrders(json.data.orders);
        setTotalOrders(json.data.totalOrders);
        setTotalCakesToMake(json.data.totalCakesToMake);
      }
    } catch (e) {
      console.error("Gagal memuat rekap pesanan:", e);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, selectedStatus]);

  useEffect(() => {
    fetchRecapData();
  }, [fetchRecapData]);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered items recap
  const filteredItems = itemsRecap.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDeficit = itemsRecap.reduce((sum, item) => sum + item.deficit, 0);

  return (
    <div className="space-y-6">
      {/* Printable Header (Visible only when printed) */}
      <div className="hidden print:block border-b-2 border-stone-800 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight font-serif">
              Kue-KU Artisanal Christmas Bakery
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              LEMBAR KERJA PRODUKSI DAPUR &amp; REKAP PEMESANAN NATAL 2026
            </p>
          </div>
          <div className="text-right text-xs text-stone-500">
            <div>Dicetak pada: {new Date().toLocaleString("id-ID")}</div>
            <div className="font-bold text-stone-800">
              Jadwal: {selectedDate === "ALL" ? "Semua Tanggal Pengantaran" : formatDateIndo(selectedDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Screen Header (Hidden on print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight flex items-center gap-2.5">
            <ChefHat className="w-8 h-8 text-red-800" />
            <span>Rekap Pesanan &amp; Jadwal Produksi Dapur</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Akumulasi toples kue yang harus dipanggang, rincian per tanggal kirim, dan lembar kerja dapur.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => fetchRecapData()}
            className="p-2.5 rounded-2xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 shadow-sm transition-colors"
            title="Muat Ulang Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Cetak Lembar Kerja Dapur</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Kue Harus Dibuat
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-red-900">
            {totalCakesToMake}{" "}
            <span className="text-xs font-normal text-stone-500">toples / loyang</span>
          </div>
          <span className="text-[10px] text-stone-400 block">Akumulasi pesanan</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Total Pesanan Masuk
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            {totalOrders}{" "}
            <span className="text-xs font-normal text-stone-500">pemesan</span>
          </div>
          <span className="text-[10px] text-stone-400 block">Sesuai filter status</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Varian Kue Berbeda
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            {itemsRecap.length}{" "}
            <span className="text-xs font-normal text-stone-500">varian</span>
          </div>
          <span className="text-[10px] text-stone-400 block">Perlu disiapkan dapur</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1 bg-amber-50/30">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block flex items-center justify-between">
            <span>Perlu Dipanggang</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          </span>
          <div className="font-serif font-black text-2xl sm:text-3xl text-amber-900">
            {totalDeficit}{" "}
            <span className="text-xs font-normal text-amber-700">unit</span>
          </div>
          <span className="text-[10px] text-amber-700 block">Kekurangan dari stok toko</span>
        </div>
      </div>

      {/* Filter and Control Bar (Hidden on print) */}
      <div className="print:hidden bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Date Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
              Tanggal:
            </span>
            <button
              onClick={() => setSelectedDate("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDate === "ALL"
                  ? "bg-red-800 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Semua Tanggal
            </button>
            {["2026-12-21", "2026-12-22", "2026-12-23", "2026-12-24", "2026-12-25", "2026-12-26"].map(
              (d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedDate === d
                      ? "bg-red-800 text-white shadow-sm"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {formatDateIndo(d).replace(", 2026", "")}
                </button>
              )
            )}
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
              Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-800 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              <option value="TO_MAKE">Perlu Dibuat (Baru, Konfirmasi, Proses)</option>
              <option value="ALL_ACTIVE">Semua Aktif (Kecuali Dibatalkan)</option>
              <option value="ALL">Semua Pesanan (Termasuk Selesai)</option>
            </select>
          </div>
        </div>

        {/* Search Bar & View Tabs */}
        <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("ITEMS")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "ITEMS"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Rekap Kue yang Harus Dibuat</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("DATES")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "DATES"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Jadwal Harian ({datesRecap.length} Hari)</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("PACKING")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "PACKING"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Lembar Packing Pelanggan</span>
              </span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama kue / varian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      {loading ? (
        <div className="p-16 text-center text-xs text-stone-500 bg-white rounded-3xl border border-stone-200 shadow-sm">
          <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
          <span>Menghitung rekap akumulasi pesanan dapur...</span>
        </div>
      ) : itemsRecap.length === 0 ? (
        <div className="p-16 text-center text-xs text-stone-500 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <ChefHat className="w-8 h-8 mx-auto text-stone-400" />
          <p className="font-bold text-stone-700 text-sm">Tidak ada pesanan yang perlu dibuat</p>
          <p>Belum ada pesanan masuk untuk filter tanggal dan status yang dipilih.</p>
        </div>
      ) : (
        <>
          {/* TAB 1: REKAP ITEM KUE YANG HARUS DIBUAT */}
          {activeTab === "ITEMS" && (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
              <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-base text-stone-900">
                    Daftar Akumulasi Kue yang Harus Dipanggang / Disiapkan
                  </h2>
                  <p className="text-xs text-stone-500">
                    Gunakan tabel ini sebagai panduan utama jumlah toples/loyang yang wajib diselesaikan dapur.
                  </p>
                </div>
                <span className="text-xs font-bold text-red-900 bg-red-50 px-3 py-1 rounded-full">
                  Total: {totalCakesToMake} Unit
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 print:w-10 text-center">Cek</th>
                      <th className="py-3 px-4">Nama Kue &amp; Varian</th>
                      <th className="py-3 px-4 text-center">Total Pesanan</th>
                      <th className="py-3 px-4 text-center print:hidden">Stok di Toko</th>
                      <th className="py-3 px-4 text-center print:hidden">Perlu Dipanggang</th>
                      <th className="py-3 px-4">Rincian Tanggal Kirim</th>
                      <th className="py-3 px-4 text-right print:hidden">Rincian Pemesan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredItems.map((item, idx) => {
                      const itemKey = `${item.productId}_${item.variantName}`;
                      const isExpanded = Boolean(expandedItems[itemKey]);

                      return (
                        <React.Fragment key={itemKey}>
                          <tr className="hover:bg-stone-50/80 transition-colors">
                            {/* Checklist box for kitchen print */}
                            <td className="py-3.5 px-4 text-center">
                              <span className="inline-block w-4 h-4 rounded border-2 border-stone-400 print:border-stone-800"></span>
                            </td>

                            {/* Cake name and variant */}
                            <td className="py-3.5 px-4 font-medium">
                              <div className="font-bold text-stone-900 text-sm">
                                {item.productName}
                              </div>
                              <div className="text-stone-500 font-semibold mt-0.5">
                                {item.variantName}
                              </div>
                            </td>

                            {/* Total quantity to make */}
                            <td className="py-3.5 px-4 text-center">
                              <span className="font-serif font-black text-base text-red-900 bg-red-50 px-3 py-1 rounded-xl">
                                {item.totalQuantity} toples
                              </span>
                            </td>

                            {/* Current store stock */}
                            <td className="py-3.5 px-4 text-center print:hidden">
                              <span
                                className={`font-bold px-2 py-0.5 rounded-lg text-xs ${
                                  item.currentStock >= item.totalQuantity
                                    ? "bg-emerald-100 text-emerald-800"
                                    : item.currentStock > 0
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {item.currentStock} unit
                              </span>

                            </td>

                            {/* Deficit to bake */}
                            <td className="py-3.5 px-4 text-center print:hidden">
                              {item.deficit > 0 ? (
                                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg">
                                  Kurang {item.deficit} unit
                                </span>
                              ) : (
                                <span className="text-emerald-700 font-bold text-[11px]">
                                  ✓ Stok Cukup
                                </span>
                              )}
                            </td>

                            {/* Breakdown by delivery dates */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1.5">
                                {Object.entries(item.datesBreakdown).map(([dt, qty]) => (
                                  <span
                                    key={dt}
                                    className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-[11px] font-semibold border border-stone-200"
                                  >
                                    <strong className="text-red-900 font-bold">{qty}x</strong>{" "}
                                    {formatDateIndo(dt).replace(", 2026", "")}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Action to view customers */}
                            <td className="py-3.5 px-4 text-right print:hidden">
                              <button
                                type="button"
                                onClick={() => toggleExpand(itemKey)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-xl transition-colors"
                              >
                                <span>{item.orders.length} Pemesan</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </td>
                          </tr>

                          {/* Expanded row: Customer details */}
                          {isExpanded && (
                            <tr className="bg-stone-50/70 print:hidden">
                              <td colSpan={7} className="p-4 pl-12">
                                <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                                    Daftar Pelanggan Pemesan {item.productName} ({item.variantName}):
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {item.orders.map((ord, oidx) => (
                                      <div
                                        key={oidx}
                                        className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs flex justify-between items-start"
                                      >
                                        <div>
                                          <div className="font-bold text-stone-900">
                                            {ord.customerName}
                                          </div>
                                          <div className="text-[11px] text-stone-500">
                                            {ord.orderCode} • {ord.customerPhone}
                                          </div>
                                          <div className="text-[10px] text-red-800 font-semibold mt-0.5">
                                            Kirim: {formatDateIndo(ord.deliveryDate)}
                                          </div>
                                        </div>
                                        <span className="font-black text-sm text-stone-900 bg-white px-2 py-0.5 rounded-lg border border-stone-200">
                                          {ord.quantity}x
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: REKAP JADWAL HARIAN */}
          {activeTab === "DATES" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {datesRecap.map((dr) => (
                <div
                  key={dr.date}
                  className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <h3 className="font-serif font-black text-base text-stone-900">
                          {formatDateIndo(dr.date)}
                        </h3>
                        <span className="text-xs text-stone-400 font-mono">{dr.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-red-900 bg-red-50 px-2.5 py-1 rounded-xl block">
                          {dr.totalItems} Kue
                        </span>
                        <span className="text-[10px] text-stone-500 mt-0.5 block">
                          {dr.orderCount} pesanan
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        Rincian Item yang Harus Keluar:
                      </span>
                      {dr.items.map((it, iidx) => (
                        <div
                          key={iidx}
                          className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="font-bold text-stone-800 truncate">{it.name}</div>
                            <div className="text-[11px] text-stone-500">{it.variant}</div>
                          </div>
                          <span className="font-black text-sm text-red-900 shrink-0">
                            {it.quantity}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Status Pengiriman:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                      Siap Diproses Dapur
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LEMBAR PACKING PELANGGAN */}
          {activeTab === "PACKING" && (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-stone-100">
                <h2 className="font-serif font-bold text-base text-stone-900">
                  Daftar Pesanan Siap Kemas &amp; Kirim (Packing Checklist)
                </h2>
                <p className="text-xs text-stone-500">
                  Gunakan daftar ini untuk mengecek toples kue pesanan masing-masing pelanggan sebelum diserahkan ke kurir.
                </p>
              </div>

              <div className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 hover:bg-stone-50/50 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md border-2 border-stone-400 print:border-stone-800 shrink-0"></span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-red-900">
                              {ord.orderCode}
                            </span>
                            <OrderStatusBadge status={ord.status as OrderStatus} />

                          </div>
                          <div className="font-bold text-stone-900 text-sm mt-0.5">
                            {ord.customerName} •{" "}
                            <span className="text-stone-500 font-normal">{ord.customerPhone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-bold text-stone-800">
                          Pengantaran: {formatDateIndo(ord.deliveryDate)}
                        </div>
                        <div className="font-black text-red-900 text-sm">
                          Total COD: {formatRupiah(ord.totalAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Order items checklist */}
                    <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {ord.items.map((it, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-stone-800">{it.productName}</div>
                            <div className="text-[11px] text-stone-500">{it.variantName}</div>
                          </div>
                          <span className="font-black text-stone-900 text-sm bg-white px-2 py-0.5 rounded border border-stone-200">
                            {it.quantity}x
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Address & Notes */}
                    <div className="pl-8 text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
                      <div>
                        <strong>Alamat:</strong> {ord.deliveryAddress}
                      </div>
                      {ord.notes && (
                        <div className="text-amber-800 italic bg-amber-50 px-2 py-0.5 rounded">
                          Catatan: {ord.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
