"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Truck, Calendar } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    isCartOpen,
    setIsCartOpen,
    deliveryDate,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-800" />
              <h2 className="font-serif font-black text-lg text-stone-900">
                Keranjang Pesanan ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Tutup Keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-800 mb-4 text-3xl">
                  🍪
                </div>
                <h3 className="font-serif font-bold text-base text-stone-800">
                  Keranjang Belanja Masih Kosong
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                  Pilihlah kue Natal favorit keluarga Anda dari katalog kami.
                </p>
                <Link
                  href="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-red-800 text-white font-semibold text-xs shadow-md hover:bg-red-900 transition-colors"
                >
                  Lihat Katalog Kue
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 flex gap-3.5 items-center group"
                >
                  <div className="relative w-16 h-16 rounded-xl bg-stone-200 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      {item.productName}
                    </h4>
                    <span className="inline-block text-[11px] font-semibold text-amber-800">
                      {item.variantName}
                    </span>
                    <div className="font-extrabold text-xs text-red-800 mt-0.5">
                      {formatRupiah(item.price)}
                    </div>

                    {/* Quantity controls */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.variantId, -1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-stone-400 hover:text-red-700 p-1 transition-colors"
                        title="Hapus kue dari keranjang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-100 bg-stone-50 space-y-3">
              {/* Delivery notice */}
              <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2 text-xs text-green-800 font-medium">
                <Truck className="w-4 h-4 text-green-700 shrink-0" />
                <span>Gratis Pengantaran (Tanpa biaya tambahan ongkir)</span>
              </div>

              {/* Delivery Date Notice */}
              {deliveryDate && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-950 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                    <span className="text-[11px] text-stone-600">Diantar ke Konsumen:</span>
                  </div>
                  <strong className="text-red-900 font-bold text-xs">{formatDateIndo(deliveryDate)}</strong>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Subtotal Produk:</span>
                <span className="font-black text-lg text-stone-900">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <Link
                href="/pesan"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/10 transition-all hover:scale-[1.01]"
              >
                <span>Lanjut ke Formulir Pesanan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
