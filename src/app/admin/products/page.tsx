"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Layers, CheckCircle2, XCircle, Clock, AlertTriangle, Sparkles } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
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

  const handleToggleStock = async (productId: string, variantId: string, currentAvailable: boolean) => {
    setUpdatingId(variantId);
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
      }
    } catch (e) {
      console.error("Gagal toggle stok:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Katalog &amp; Manajemen Stok Kue
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Pantau ketersediaan stok kue kering, bolu gulung, dan hampers Natal secara real-time.
        </p>
      </div>

      {loading ? (
        <div className="p-16 text-center text-xs text-stone-500">
          <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
          <span>Memuat katalog kue...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 space-y-4"
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{p.badge}</span>
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-base text-stone-900 truncate">
                    {p.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Variants table */}
              <div className="border-t border-stone-100 pt-3">
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
                  Varian &amp; Status Ketersediaan:
                </span>
                <div className="space-y-2">
                  {p.variants.map((v) => (
                    <div
                      key={v.id}
                      className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-800">{v.name}</div>
                        <div className="text-[11px] font-semibold text-red-900">
                          {formatRupiah(v.price)} • Stok: {v.stock} unit
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleStock(p.id, v.id, v.isAvailable)}
                        disabled={updatingId === v.id}
                        className={`px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-colors ${
                          v.isAvailable
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                        }`}
                      >
                        {v.isAvailable ? (
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
          ))}
        </div>
      )}
    </div>
  );
}
