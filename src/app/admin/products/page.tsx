"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product, Category, ProductVariant } from "@/types";
import { formatRupiah } from "@/lib/utils";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  X,
  AlertCircle,
  Loader2,
  Layers,
  Image as ImageIcon,
  Check,
} from "lucide-react";

interface VariantFormState {
  id?: string;
  name: string;
  price: number;
  stock: number;
  weightGram: number | "";
  isAvailable: boolean;
}

interface ProductFormState {
  id?: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  badge: string;
  allergenInfo: string;
  isFeatured: boolean;
  variants: VariantFormState[];
}

const BADGE_PRESETS = [
  "⭐ Best Seller",
  "🎄 Ikon Natal",
  "🧀 Favorit Keju",
  "❄️ Edisi Salju",
  "✨ Resep Warisan",
  "🎁 Pilihan Hampers",
  "👑 Edisi Terbatas",
];

const INITIAL_VARIANT: VariantFormState = {
  name: "Toples Segi 350g",
  price: 125000,
  stock: 40,
  weightGram: 350,
  isAvailable: true,
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingVariantId, setUpdatingVariantId] = useState<string | null>(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Delete Confirmation
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    description: "",
    image: DEFAULT_IMAGE,
    categoryId: "cat-kering",
    badge: "",
    allergenInfo: "",
    isFeatured: false,
    variants: [{ ...INITIAL_VARIANT }],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
        if (json.categories) {
          setCategories(json.categories);
        }
      }
    } catch (e) {
      console.error("Gagal memuat produk:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Quick Toggle Availability
  const handleToggleStock = async (
    productId: string,
    variantId: string,
    currentAvailable: boolean
  ) => {
    setUpdatingVariantId(variantId);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          variantId,
          isAvailable: !currentAvailable,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) =>
          prev.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                variants: p.variants.map((v) =>
                  v.id === variantId ? { ...v, isAvailable: !currentAvailable } : v
                ),
              };
            }
            return p;
          })
        );
        showToast("Status ketersediaan varian berhasil diperbarui.");
      }
    } catch (e) {
      console.error("Gagal toggle stok:", e);
    } finally {
      setUpdatingVariantId(null);
    }
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setFormData({
      name: "",
      description: "",
      image: DEFAULT_IMAGE,
      categoryId: categories[0]?.id || "cat-kering",
      badge: "",
      allergenInfo: "",
      isFeatured: false,
      variants: [{ ...INITIAL_VARIANT }],
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (p: Product) => {
    setFormData({
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.image,
      categoryId: p.categoryId,
      badge: p.badge || "",
      allergenInfo: p.allergenInfo || "",
      isFeatured: Boolean(p.isFeatured),
      variants: p.variants.map((v) => ({
        id: v.id,
        name: v.name,
        price: v.price,
        stock: v.stock,
        weightGram: v.weightGram ?? "",
        isAvailable: v.isAvailable,
      })),
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  // Variant Repeater Helpers
  const handleAddVariantRow = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          name: "Varian Baru",
          price: 150000,
          stock: 30,
          weightGram: 500,
          isAvailable: true,
        },
      ],
    }));
  };

  const handleRemoveVariantRow = (index: number) => {
    if (formData.variants.length <= 1) {
      alert("Setiap kue wajib memiliki minimal 1 varian.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (
    index: number,
    field: keyof VariantFormState,
    value: unknown
  ) => {
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      nextVariants[index] = { ...nextVariants[index], [field]: value };
      return { ...prev, variants: nextVariants };
    });
  };

  // Submit Add or Edit
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage("Nama kue wajib diisi.");
      return;
    }

    if (formData.variants.length === 0) {
      setErrorMessage("Minimal tambahkan 1 varian kue.");
      return;
    }

    setSubmitting(true);

    try {
      const isEditing = Boolean(formData.id);
      const url = "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          variants: formData.variants.map((v) => ({
            ...v,
            price: Number(v.price) || 0,
            stock: Number(v.stock) || 0,
            weightGram: v.weightGram ? Number(v.weightGram) : null,
          })),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMessage(json.message || "Gagal menyimpan data kue.");
        setSubmitting(false);
        return;
      }

      showToast(isEditing ? "Katalog kue berhasil diperbarui!" : "Kue baru berhasil ditambahkan!");
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Error submitting product form:", err);
      setErrorMessage("Terjadi masalah koneksi. Silakan coba kembali.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/products?id=${productToDelete.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        showToast(`Kue "${productToDelete.name}" berhasil dihapus.`);
        setProductToDelete(null);
      } else {
        alert(json.message || "Gagal menghapus kue.");
      }
    } catch (err) {
      console.error("Gagal menghapus:", err);
      alert("Terjadi kendala saat menghapus produk.");
    } finally {
      setDeleting(false);
    }
  };

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "ALL" || p.categoryId === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Katalog &amp; Manajemen Stok Kue
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Tambah kue baru, ubah rincian varian &amp; harga, atau atur ketersediaan stok secara real-time.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Kue Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "ALL"
                ? "bg-red-800 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Semua ({products.length})
          </button>
          {categories.map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? "bg-red-800 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama kue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs text-stone-500 bg-white rounded-3xl border border-stone-200 shadow-sm">
          <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
          <span>Memuat katalog kue...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-16 text-center text-xs text-stone-500 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <Layers className="w-8 h-8 mx-auto text-stone-400" />
          <p className="font-bold text-stone-700 text-sm">Tidak ada kue yang cocok</p>
          <p>Cobalah mengganti kata kunci pencarian atau kategori filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 space-y-4 hover:border-red-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-2xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      {p.badge ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>{p.badge}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400 font-semibold">
                          {p.category?.name || "Kategori"}
                        </span>
                      )}

                      {/* Action Buttons: Edit & Delete */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
                          title="Edit Katalog Kue"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                          title="Hapus Kue dari Katalog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-base text-stone-900 truncate mt-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {p.description}
                    </p>
                    {p.allergenInfo && (
                      <p className="text-[10px] text-stone-400 truncate mt-1 italic">
                        Info: {p.allergenInfo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Variants table */}
                <div className="border-t border-stone-100 pt-3 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                      Varian ({p.variants.length}) &amp; Stok:
                    </span>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="text-[11px] font-bold text-red-800 hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Kelola Varian</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {p.variants.map((v) => (
                      <div
                        key={v.id}
                        className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-stone-800 truncate">
                            {v.name}
                          </div>
                          <div className="text-[11px] font-semibold text-red-900">
                            {formatRupiah(v.price)} • Stok: {v.stock} unit
                            {v.weightGram && ` • ${v.weightGram}g`}
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleStock(p.id, v.id, v.isAvailable)}
                          disabled={updatingVariantId === v.id}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-colors shrink-0 ${
                            v.isAvailable
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                          }`}
                        >
                          {updatingVariantId === v.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : v.isAvailable ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Tersedia</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-700" />
                              <span>Habis</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM: TAMBAH / EDIT KUE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif font-black text-xl text-stone-900">
                  {formData.id ? "Edit Katalog Kue" : "Tambah Kue Natal Baru"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Lengkapi data produk, kategori, foto, dan rincian harga varian.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Nama Kue Natal *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Nastar Wisman Spesial Natal"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Kategori Kue *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-700"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Deskripsi Kue *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan aroma, tekstur, dan keistimewaan bahan kue Natal ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 leading-relaxed"
                />
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  URL Foto Produk
                </label>
                <div className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-xl bg-stone-100 overflow-hidden border border-stone-200 shrink-0">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-stone-400 absolute inset-0 m-auto" />
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Badge & Allergen Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Badge Spesial (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: ⭐ Best Seller / 🎄 Ikon Natal"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {BADGE_PRESETS.slice(0, 4).map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, badge: b })}
                        className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Informasi Alergen
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Mengandung mentega, susu, telur, gluten"
                    value={formData.allergenInfo}
                    onChange={(e) => setFormData({ ...formData, allergenInfo: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
                  />
                  <label className="inline-flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded border-stone-300 text-red-800 focus:ring-red-700"
                    />
                    <span className="text-[11px] text-stone-600 font-semibold">
                      Tampilkan sebagai Pilihan Unggulan di Beranda
                    </span>
                  </label>
                </div>
              </div>

              {/* VARIANTS REPEATER */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="block font-bold text-stone-900 text-xs">
                      Daftar Varian Ukuran &amp; Harga *
                    </strong>
                    <span className="text-[11px] text-stone-500">
                      Tentukan harga, kapasitas gram, dan persediaan stok untuk setiap varian.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddVariantRow}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Varian</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {formData.variants.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                    >
                      <div className="sm:col-span-4">
                        <label className="block text-[10px] text-stone-500 mb-0.5">
                          Nama Varian
                        </label>
                        <input
                          type="text"
                          required
                          value={v.name}
                          onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
                          placeholder="Toples Segi 350g"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-700"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] text-stone-500 mb-0.5">
                          Harga (Rp)
                        </label>
                        <input
                          type="number"
                          required
                          min={1000}
                          step={1000}
                          value={v.price}
                          onChange={(e) => handleVariantChange(idx, "price", Number(e.target.value))}
                          placeholder="125000"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-700 font-semibold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-stone-500 mb-0.5">
                          Stok (Unit)
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={v.stock}
                          onChange={(e) => handleVariantChange(idx, "stock", Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-700"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-stone-500 mb-0.5">
                          Berat (Gram)
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={v.weightGram}
                          onChange={(e) =>
                            handleVariantChange(
                              idx,
                              "weightGram",
                              e.target.value === "" ? "" : Number(e.target.value)
                            )
                          }
                          placeholder="350"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-700"
                        />
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveVariantRow(idx)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Hapus Varian"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="border-t border-stone-100 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>Simpan Katalog Kue</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif font-black text-lg text-stone-900">
                Hapus Kue dari Katalog?
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Anda akan menghapus <strong className="text-stone-800 font-bold">{productToDelete.name}</strong> beserta seluruh variannya dari katalog toko. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-xs font-bold text-white shadow-md transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Ya, Hapus</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
