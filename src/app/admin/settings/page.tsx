"use client";

import React, { useEffect, useState } from "react";
import { StoreSetting } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Settings, Save, CheckCircle2, Clock, Store, Truck, Phone, MessageSquare } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSetting | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (json.success) {
          setSettings(json.data);
        }
      } catch (e) {
        console.error("Gagal memuat pengaturan toko:", e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback("Pengaturan toko berhasil diperbarui!");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error("Gagal menyimpan:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-16 text-center text-xs text-stone-500">
        <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
        <span>Memuat pengaturan toko...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Pengaturan Toko &amp; Ongkir Flat
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Sesuaikan tarif pengantaran, pengumuman beranda, dan kontak WhatsApp toko.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6 text-xs">
        {/* Store Info */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
            <Store className="w-4 h-4 text-red-800" />
            <span>Identitas Toko &amp; Kontak</span>
          </h2>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Nama Toko Kue:
            </label>
            <input
              type="text"
              required
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Nomor WhatsApp Admin (Untuk Tombol Konfirmasi):
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Area */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
            <Truck className="w-4 h-4 text-red-800" />
            <span>Tarif Ongkos Kirim (Rp 0 = Bebas Ongkir)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Tarif Ongkir (Rupiah):
              </label>
              <input
                type="number"
                min={0}
                step={5000}
                required
                value={settings.flatShippingFee}
                onChange={(e) =>
                  setSettings({ ...settings, flatShippingFee: Number(e.target.value) || 0 })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Saat ini: {settings.flatShippingFee > 0 ? formatRupiah(settings.flatShippingFee) : "Rp 0 (Gratis Ongkir / Bebas Biaya)"}
              </span>
            </div>

            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Status Operasional Toko:
              </label>
              <select
                value={settings.isStoreOpen ? "true" : "false"}
                onChange={(e) =>
                  setSettings({ ...settings, isStoreOpen: e.target.value === "true" })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-700 bg-white"
              >
                <option value="true">Buka (Menerima Pesanan)</option>
                <option value="false">Tutup Sementara</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Catatan Wilayah Jangkauan Pengantaran:
            </label>
            <textarea
              rows={2}
              value={settings.deliveryAreaNotes}
              onChange={(e) =>
                setSettings({ ...settings, deliveryAreaNotes: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
        </div>

        {/* Announcement */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
            <MessageSquare className="w-4 h-4 text-red-800" />
            <span>Pengumuman Banner Festive</span>
          </h2>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Teks Pengumuman Natal:
            </label>
            <input
              type="text"
              value={settings.announcement}
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Menyimpan..." : "Simpan Pengaturan Toko"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
