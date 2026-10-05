import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Heart, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 border-t-4 border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎄</span>
              <span className="font-serif font-black text-2xl text-white tracking-tight">
                Kue<span className="text-red-500">-KU</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Toko kue rumahan artisanal spesialis perayaan Natal. Dibuat fresh setiap hari dengan resep warisan, 100% Mentega Wisman murni, dan bahan-bahan premium halal.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Pembayaran Aman: Bayar di Tempat (COD)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-serif">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/menu" className="hover:text-red-400 transition-colors">
                  Katalog Kue Natal 2026
                </Link>
              </li>
              <li>
                <Link href="/cara-pesan" className="hover:text-red-400 transition-colors">
                  Panduan Cara Memesan
                </Link>
              </li>
              <li>
                <Link href="/informasi-pengantaran" className="hover:text-red-400 transition-colors">
                  Area &amp; Tarif Ongkir Tetap
                </Link>
              </li>
              <li>
                <Link href="/lacak" className="hover:text-red-400 transition-colors">
                  Cek Status Nota Pesanan
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-stone-500 hover:text-stone-300 transition-colors">
                  Area Staf / Admin Toko
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-serif">
              Operasional Dapur
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">Jam Pemanggangan:</strong>
                  07.00 - 17.00 WIB (Setiap Hari)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">Jadwal Pengantaran:</strong>
                  Batch 1: 10.00 - 13.00 WIB<br />
                  Batch 2: 14.00 - 18.00 WIB
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-serif">
              Bantuan &amp; Kontak
            </h3>
            <p className="text-xs text-stone-400 mb-3">
              Ada pertanyaan seputar varian kue, alergen, atau pesanan khusus partai besar?
            </p>
            <a
              href="https://wa.me/6281289001225?text=Halo%20Admin%20Kue-KU,%20saya%20ingin%20bertanya%20tentang%20pemesanan%20kue%20Natal."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Chat WhatsApp Admin</span>
            </a>
            <p className="text-[11px] text-stone-500 mt-2">
              Respon cepat: 08.00 - 21.00 WIB
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; 2026 <strong>Kue-KU</strong>. Hak Cipta Dilindungi Undang-Undang. Dibuat dengan penuh kehangatan Natal.
          </p>
          <p className="flex items-center gap-1">
            <span>Freshly baked with love &amp; Wisman Butter</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
