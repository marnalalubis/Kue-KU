"use client";

import React, { useEffect, useState } from "react";
import { DailyCapacity } from "@/types";
import { formatDateIndo } from "@/lib/utils";
import { Calendar, Save, CheckCircle2, AlertCircle, Clock, Lock, Unlock } from "lucide-react";

export default function AdminCapacityPage() {
  const [capacities, setCapacities] = useState<DailyCapacity[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingDate, setSavingDate] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchCapacities = async () => {
    try {
      const res = await fetch("/api/admin/capacity");
      const json = await res.json();
      if (json.success) {
        setCapacities(json.data);
      }
    } catch (e) {
      console.error("Gagal memuat kapasitas:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  const handleCapacityChange = (date: string, value: number) => {
    setCapacities((prev) =>
      prev.map((c) => (c.date === date ? { ...c, maxOrders: value } : c))
    );
  };

  const handleToggleClose = (date: string) => {
    setCapacities((prev) =>
      prev.map((c) => (c.date === date ? { ...c, isClosed: !c.isClosed } : c))
    );
  };

  const handleSave = async (item: DailyCapacity) => {
    setSavingDate(item.date);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/capacity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: item.date,
          maxOrders: item.maxOrders,
          isClosed: item.isClosed,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Kapasitas tanggal ${item.date} berhasil disimpan!`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error("Gagal menyimpan kapasitas:", e);
    } finally {
      setSavingDate(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Pengaturan Kuota Pesanan Harian
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Tetapkan batas kemampuan memanggang harian dapur untuk menjaga kualitas kue Natal tetap prima.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {loading ? (
        <div className="p-16 text-center text-xs text-stone-500">
          <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
          <span>Memuat data kuota harian...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capacities.map((item) => {
            const remaining = Math.max(0, item.maxOrders - item.bookedOrders);
            const percentage = Math.min(100, Math.round((item.bookedOrders / (item.maxOrders || 1)) * 100));

            return (
              <div
                key={item.date}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <div className="font-serif font-bold text-base text-stone-900">
                      {formatDateIndo(item.date)}
                    </div>
                    <div className="font-mono text-xs text-stone-400">{item.date}</div>
                  </div>
                  <button
                    onClick={() => handleToggleClose(item.date)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                      item.isClosed
                        ? "bg-rose-100 text-rose-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                    title={item.isClosed ? "Buka Kembali Tanggal Ini" : "Tutup Pemesanan Tanggal Ini"}
                  >
                    {item.isClosed ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Ditutup</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Dibuka</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-stone-500">Kapasitas Terpakai:</span>
                    <span className="text-stone-900">
                      {item.bookedOrders} / {item.maxOrders} Pesanan ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentage >= 100
                          ? "bg-rose-600"
                          : percentage >= 75
                          ? "bg-amber-500"
                          : "bg-emerald-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-stone-500 flex justify-between">
                    <span>Sisa Slot: {remaining} pesanan</span>
                    {item.isClosed && <span className="text-rose-600 font-bold">Slot Manual Tutup</span>}
                  </div>
                </div>

                {/* Control Max Limit */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-500">
                      Batas Maksimal:
                    </label>
                    <input
                      type="number"
                      min={item.bookedOrders}
                      max={100}
                      value={item.maxOrders}
                      onChange={(e) => handleCapacityChange(item.date, Number(e.target.value) || 0)}
                      className="w-20 px-2.5 py-1.5 rounded-xl border border-stone-200 font-bold text-stone-900 mt-1"
                    />
                  </div>

                  <button
                    onClick={() => handleSave(item)}
                    disabled={savingDate === item.date}
                    className="mt-4 px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingDate === item.date ? "Menyimpan..." : "Simpan"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
