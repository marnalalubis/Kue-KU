"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Sparkles, Eye, CheckCircle2, AlertTriangle } from "lucide-react";

interface Props {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct }: Props) {
  // Hitung harga termurah dari varian yang tersedia
  const availableVariants = product.variants.filter((v) => v.isAvailable && v.stock > 0);
  const minPrice = product.variants.length > 0
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;

  const isSoldOut = availableVariants.length === 0;

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-60" />

        {/* Badge Special (top-left) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Stock Status Badge (top-right) */}
        <div className="absolute top-3 right-3">
          {isSoldOut ? (
            <span className="bg-stone-900/90 text-stone-200 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> Habis
            </span>
          ) : (
            <span className="bg-emerald-800/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Tersedia
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
            {product.variants.length} Pilihan Varian
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-red-800 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="block text-[11px] text-stone-600 font-medium">Mulai dari</span>
            <span className="font-extrabold text-lg text-red-800 tracking-tight">
              {formatRupiah(minPrice)}
            </span>
          </div>

          <button
            onClick={() => onSelectProduct(product)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 group-hover:bg-red-700 text-red-800 group-hover:text-white font-semibold text-xs transition-all duration-200 shadow-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Pilih Varian</span>
          </button>
        </div>
      </div>
    </div>
  );
}
