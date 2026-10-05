import React from "react";
import Link from "next/link";
import { Truck, MapPin, Clock, ShieldCheck, HelpCircle } from "lucide-react";

export function generateMetadata() {
  return {
    title: "Informasi Pengantaran & Tarif Ongkir — Kue-KU",
  };
}

export default function InfoPengantaranPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-red-700 uppercase tracking-widest">
          Pengiriman Aman &amp; Terjadwal
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Informasi Pengantaran &amp; Tarif Flat
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto">
          Setiap toples kue dikemas dengan bubble wrap tebal dan box kokoh untuk menjaga keutuhan bentuk kue selama perjalanan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-base text-stone-900">
            Tarif Ongkos Kirim Tetap (Flat Rate)
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Untuk mempermudah perhitungan, kami memberlakukan tarif flat <strong>Rp 20.000 per pesanan</strong> untuk seluruh area jangkauan pengantaran toko tanpa biaya tersembunyi.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-base text-stone-900">
            Cakupan Wilayah Layanan
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Pengantaran langsung dilayani untuk wilayah <strong>Jakarta, Bogor, Depok, Tangerang, dan Bekasi</strong> dalam radius maksimal 25 km dari dapur pusat kami.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-base text-stone-900">
            Jadwal Batch Pengantaran
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Pengantaran terbagi menjadi 2 batch harian:
            <br />
            <strong>Batch 1 (Siang):</strong> 10.00 - 13.00 WIB
            <br />
            <strong>Batch 2 (Sore):</strong> 14.00 - 18.00 WIB
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-base text-stone-900">
            Garansi Keutuhan Kue
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Jika toples kue Anda retak atau kue hancur parah akibat kelalaian kurir saat tiba, laporkan kepada kurir saat serah terima untuk penggantian toples baru secara langsung.
          </p>
        </div>
      </div>
    </div>
  );
}
