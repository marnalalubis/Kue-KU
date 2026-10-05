"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, Menu, X, Sparkles, Phone, ShieldCheck } from "lucide-react";

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Festive Announcement Banner */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-green-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>
          <strong>Spesial Natal 2026:</strong> Pre-Order Kue Natal Dibuka! Bahan Halal &amp; 100% Butter Wisman Asli.
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white font-serif font-black text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
              🎄
            </div>
            <div>
              <span className="font-serif font-black text-2xl tracking-tight text-stone-900 group-hover:text-red-800 transition-colors">
                Kue<span className="text-red-700">-KU</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-amber-800 font-semibold">
                Artisanal Christmas Bakery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-700">
            <Link
              href="/"
              className="hover:text-red-800 transition-colors py-1 hover:border-b-2 hover:border-red-700"
            >
              Beranda
            </Link>
            <Link
              href="/menu"
              className="hover:text-red-800 transition-colors py-1 hover:border-b-2 hover:border-red-700 flex items-center gap-1.5"
            >
              <span>Katalog Menu Kue</span>
              <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Natal
              </span>
            </Link>
            <Link
              href="/cara-pesan"
              className="hover:text-red-800 transition-colors py-1 hover:border-b-2 hover:border-red-700"
            >
              Cara Memesan
            </Link>
            <Link
              href="/informasi-pengantaran"
              className="hover:text-red-800 transition-colors py-1 hover:border-b-2 hover:border-red-700"
            >
              Info Pengantaran
            </Link>
            <Link
              href="/lacak"
              className="hover:text-red-800 transition-colors py-1 hover:border-b-2 hover:border-red-700"
            >
              Lacak Pesanan
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 font-medium text-sm flex items-center gap-2 border border-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm"
              aria-label="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 text-red-700" />
              <span className="hidden sm:inline font-semibold">Keranjang</span>
              {itemCount > 0 && (
                <span className="bg-red-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100"
            >
              Beranda
            </Link>
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-red-700 bg-red-50 hover:bg-red-100 font-semibold"
            >
              Katalog Menu Kue Natal
            </Link>
            <Link
              href="/cara-pesan"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100"
            >
              Cara Memesan
            </Link>
            <Link
              href="/informasi-pengantaran"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100"
            >
              Info Pengantaran
            </Link>
            <Link
              href="/lacak"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100"
            >
              Lacak Status Pesanan
            </Link>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-700" /> Bayar Saat Diterima (COD)
              </span>
              <Link href="/admin/login" className="text-stone-400 hover:text-stone-700 underline">
                Admin
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
