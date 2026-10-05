import React from "react";
import Link from "next/link";
import { ShoppingBag, Calendar, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CaraPesanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-red-700 uppercase tracking-widest">
          Panduan Praktis
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Cara Memesan Kue Natal di Kue-KU
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto">
          Pemesanan dirancang cepat, aman, dan tanpa perlu mendaftar akun pelanggan.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-800 font-serif font-black text-xl flex items-center justify-center shrink-0">
            1
          </div>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Telusuri Katalog &amp; Pilih Varian Kue
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Buka menu katalog kue kami. Setiap kue memiliki detail deskripsi rasa, informasi alergen, serta opsi varian ukuran (misal Toples 350g, 500g, atau hampers). Pilih kue yang Anda sukai dan masukkan ke keranjang belanja.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 font-serif font-black text-xl flex items-center justify-center shrink-0">
            2
          </div>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Pilih Tanggal Pengantaran Berkuota
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Di halaman checkout, pilih tanggal pengantaran Natal yang Anda inginkan (21 - 26 Desember 2026). Sistem kami akan secara otomatis memeriksa ketersediaan kuota dapur. Jika kuota hari tersebut penuh, Anda dapat memilih tanggal alternatif yang masih hijau.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 font-serif font-black text-xl flex items-center justify-center shrink-0">
            3
          </div>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Isi Alamat Lengkap &amp; Kirim Pesanan
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Isi nama lengkap, nomor WhatsApp aktif, serta alamat tujuan pengantaran secara detail (sertakan nomor rumah atau patokan). Klik tombol konfirmasi untuk menerbitkan nota digital.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-800 font-serif font-black text-xl flex items-center justify-center shrink-0">
            4
          </div>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Kue Dipanggang Fresh &amp; Bayar Saat Tiba (COD)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Tim dapur kami memanggang kue Anda menjelang hari pengiriman. Kurir mengantarkan kue dalam kemasan aman. Anda dapat menyerahkan pembayaran tunai atau transfer QRIS saat pesanan tiba di tangan Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-xl transition-all hover:scale-105"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Mulai Pesan Kue Sekarang</span>
        </Link>
      </div>
    </div>
  );
}
