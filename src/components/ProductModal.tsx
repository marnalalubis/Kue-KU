"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatRupiah } from "@/lib/utils";
import { X, Plus, Minus, ShoppingBag, ShieldAlert, Sparkles, Check } from "lucide-react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      // Pilih varian pertama yang tersedia secara default
      const firstAvailable = product.variants.find((v) => v.isAvailable && v.stock > 0);
      setSelectedVariant(firstAvailable || product.variants[0]);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity,
      image: product.image,
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  const isCurrentVariantSoldOut = !selectedVariant?.isAvailable || (selectedVariant?.stock ?? 0) <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors"
          aria-label="Tutup Detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Frame */}
        <div className="relative md:w-5/12 aspect-[4/3] md:aspect-auto bg-stone-100 shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{product.badge}</span>
            </div>
          )}
        </div>

        {/* Detail & Action Form */}
        <div className="p-6 md:p-8 md:w-7/12 flex-1 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2 className="font-serif font-black text-2xl text-stone-900 tracking-tight leading-snug">
              {product.name}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Allergen Callout */}
            {product.allergenInfo && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-amber-800">Catatan Bahan &amp; Alergen:</strong>
                  {product.allergenInfo}
                </div>
              </div>
            )}

            {/* Variant Selector */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                Pilih Ukuran / Varian Kemasan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  const isSold = !v.isAvailable || v.stock <= 0;

                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isSold}
                      onClick={() => {
                        setSelectedVariant(v);
                        setQuantity(1);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                        isSelected
                          ? "border-red-700 bg-red-50 text-red-950 font-medium ring-2 ring-red-700/20"
                          : isSold
                          ? "border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed opacity-60"
                          : "border-stone-200 hover:border-stone-400 bg-white text-stone-800"
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{v.name}</span>
                        {isSold && <span className="text-[10px] text-red-600 font-semibold">(Habis)</span>}
                      </div>
                      <div className="mt-1 font-extrabold text-sm text-red-800">
                        {formatRupiah(v.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Jumlah Pesanan:
              </span>
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                <button
                  type="button"
                  disabled={quantity <= 1 || isCurrentVariantSoldOut}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-1 text-sm font-bold text-stone-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={isCurrentVariantSoldOut || quantity >= (selectedVariant?.stock ?? 10)}
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Button & Subtotal */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[11px] text-stone-600">Total Harga:</span>
              <span className="font-black text-xl text-red-900">
                {selectedVariant ? formatRupiah(selectedVariant.price * quantity) : "-"}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isCurrentVariantSoldOut || !selectedVariant}
              className={`flex-1 max-w-[200px] py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                addedSuccess
                  ? "bg-green-700 text-white"
                  : isCurrentVariantSoldOut
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-red-800 hover:bg-red-900 text-white hover:scale-[1.02]"
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 animate-scale" />
                  <span>Dimasukkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isCurrentVariantSoldOut ? "Stok Habis" : "+ Keranjang"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
