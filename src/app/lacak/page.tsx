"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, PackageCheck, AlertCircle, ArrowRight } from "lucide-react";

export default function TrackOrderPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Masukkan nomor pesanan Anda (contoh: KUE-20261224-8821)");
      return;
    }
    router.push(`/pesanan/${code.trim()}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-800 flex items-center justify-center mx-auto text-2xl">
        <PackageCheck className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-stone-900">
          Lacak Status Pesanan Kue Anda
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Ketikkan nomor nota pesanan Anda yang didapatkan saat checkout untuk melihat status pemanggangan dan pengantaran.
        </p>
      </div>

      <form onSubmit={handleTrack} className="max-w-md mx-auto space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Contoh: KUE-20261224-8821"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(null);
            }}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-200 text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 shadow-sm"
          />
        </div>

        {error && (
          <p className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Cari Pesanan Saya</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
