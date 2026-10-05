"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Calendar,
  Clock,
  Heart,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data.products) {
          const featured = json.data.products.filter((p: Product) => p.isFeatured);
          setFeaturedProducts(featured.length > 0 ? featured : json.data.products.slice(0, 4));
        }
      } catch (e) {
        console.error("Gagal memuat produk unggulan:", e);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-stone-900 text-white pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Decorative background lights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-800/80 border border-red-700/60 text-xs font-semibold text-amber-300 shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>Koleksi Eksklusif Natal &amp; Tahun Baru 2026</span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-6xl tracking-tight leading-[1.15]">
              Kehangatan Natal dalam Setiap Gigitan{" "}
              <span className="text-amber-300 italic font-serif">Kue Segar</span> &amp; Otentik
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Dipanggang secara artisanal setiap pagi menggunakan <strong>100% Mentega Wisman murni</strong> dan keju Edam tua pilihan. Tanpa bahan pengawet, siap menghangatkan kumpul keluarga Anda.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2.5"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Pesan Kue Sekarang</span>
              </Link>
              <Link
                href="/cara-pesan"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>Pelajari Cara Pesan</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-red-800/50 text-center lg:text-left">
              <div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-amber-300">100%</div>
                <div className="text-[11px] sm:text-xs text-stone-300">Mentega Wisman Asli</div>
              </div>
              <div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-amber-300">0%</div>
                <div className="text-[11px] sm:text-xs text-stone-300">Bahan Pengawet</div>
              </div>
              <div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-amber-300">COD</div>
                <div className="text-[11px] sm:text-xs text-stone-300">Bayar Saat Diterima</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80"
                alt="Koleksi Hampers Kue Natal Kue-KU"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

              {/* Floating badge on hero photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-stone-900 shadow-xl border border-stone-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-700">
                      Best Seller Hampers
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      Bethlehem Joy Gift Box
                    </h3>
                  </div>
                  <span className="font-extrabold text-base text-red-800">
                    Rp 385.000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Favorit Keluarga</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-stone-900 tracking-tight">
              Pilihan Kue Natal Terlaris
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-800 hover:text-red-950 group"
          >
            <span>Lihat Semua Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-stone-200 animate-pulse border border-stone-300"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3 Step Ordering Process */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">
              Mudah &amp; Tanpa Ribet
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1">
              Cara Memesan Kue di Kue-KU
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Tidak wajib membuat akun atau mendaftar terlebih dahulu. Cukup 3 langkah sederhana:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 font-serif font-black text-xl flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-stone-900 mb-2">
                Pilih Kue &amp; Varian
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Jelajahi menu toples, bolu gulung, atau hampers. Pilih ukuran gramatur yang sesuai dan masukkan ke keranjang belanja.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-serif font-black text-xl flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-stone-900 mb-2">
                Tentukan Tanggal &amp; Alamat
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pilih tanggal pengantaran yang masih memiliki kuota kosong. Masukkan nama, nomor WhatsApp, serta alamat lengkap Anda.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 font-serif font-black text-xl flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-stone-900 mb-2">
                Kue Tiba &amp; Bayar di Tempat
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pesanan dikonfirmasi oleh admin toko. Kue diantar fresh di hari pengantaran dan Anda membayar saat kue telah sampai di tangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Capacity Guarantee Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-red-900 to-stone-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800 text-amber-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Batas Kuota Pemanggangan Harian</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-white">
              Mengapa Kuota Pengantaran Kami Dibatasi?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Kami membatasi maksimal 35 pesanan per hari agar setiap toples nastar dan loyang cake dipanggang segar secara higienis dengan ketelitian penuh. Pastikan Anda mengamankan tanggal pengantaran pilihan keluarga sebelum slot terisi penuh!
            </p>
          </div>

          <Link
            href="/pesan"
            className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/20 whitespace-nowrap hover:scale-105 transition-transform"
          >
            Cek Kuota &amp; Pesan Sekarang
          </Link>
        </div>
      </section>

      {/* Modal Detail & Variant Selector */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
