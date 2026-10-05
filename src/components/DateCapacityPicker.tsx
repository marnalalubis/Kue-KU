"use client";

import React, { useEffect, useState } from "react";
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { formatDateIndo } from "@/lib/utils";

interface DateOption {
  date: string;
  maxOrders: number;
  bookedOrders: number;
  remaining: number;
  isClosed: boolean;
  isAvailable: boolean;
}

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DateCapacityPicker({ selectedDate, onSelectDate }: Props) {
  const [dateOptions, setDateOptions] = useState<DateOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate target dates for Christmas baking season (20 - 27 Desember)
  // dan beberapa hari terdekat jika di luar Desember
  useEffect(() => {
    async function loadCapacities() {
      setLoading(true);
      const datesToInspect = [
        "2026-12-21",
        "2026-12-22",
        "2026-12-23",
        "2026-12-24",
        "2026-12-25",
        "2026-12-26",
      ];

      const results: DateOption[] = [];

      for (const d of datesToInspect) {
        try {
          const res = await fetch(`/api/capacity?date=${d}`);
          const json = await res.json();
          if (json.success) {
            results.push(json.data);
          } else {
            results.push({
              date: d,
              maxOrders: 30,
              bookedOrders: 0,
              remaining: 30,
              isClosed: false,
              isAvailable: true,
            });
          }
        } catch {
          results.push({
            date: d,
            maxOrders: 30,
            bookedOrders: 0,
            remaining: 30,
            isClosed: false,
            isAvailable: true,
          });
        }
      }

      setDateOptions(results);
      setLoading(false);

      // Auto select first available date if nothing is selected
      if (!selectedDate && results.length > 0) {
        const firstAvail = results.find((r) => r.isAvailable);
        if (firstAvail) onSelectDate(firstAvail.date);
      }
    }

    loadCapacities();
  }, [selectedDate, onSelectDate]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-red-700" />
          <span>Tanggal Pesan Diantar ke Konsumen:</span>
        </label>
        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
          ✓ Pengantaran Segar Tepat Waktu
        </span>
      </div>

      {/* Input Kalender Bebas */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Pilih Kalender Tanggal Pengantaran:
            </label>
            <span className="text-[11px] text-stone-600">
              Pilih tanggal kapan pesanan kue ingin diantar langsung ke konsumen
            </span>
          </div>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => {
              if (e.target.value) onSelectDate(e.target.value);
            }}
            className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-red-700 bg-white shadow-xs"
          />
        </div>

        {selectedDate && (
          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
            <span className="text-stone-600 font-medium">Tanggal Diantar Terpilih:</span>
            <span className="font-extrabold text-xs text-red-950 bg-white px-3 py-1 rounded-lg border border-amber-300 shadow-xs">
              {formatDateIndo(selectedDate)}
            </span>
          </div>
        )}
      </div>

      <div className="pt-1">
        <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
          Atau Pilih Cepat Jadwal Spesial Natal:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            "2026-12-21",
            "2026-12-22",
            "2026-12-23",
            "2026-12-24",
            "2026-12-25",
            "2026-12-26",
          ].map((dateStr) => {
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr)}
                className={`p-3.5 rounded-2xl border text-left transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? "border-red-700 bg-red-50 text-red-950 font-bold ring-2 ring-red-700/20 shadow-sm"
                    : "border-stone-200 hover:border-red-300 bg-white text-stone-800 hover:shadow-xs"
                }`}
              >
                <div>
                  <div className="font-extrabold text-sm text-stone-900">
                    {formatDateIndo(dateStr)}
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                    {dateStr}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5" /> Siap Diantar
                  </span>

                  {isSelected && (
                    <span className="text-[10px] uppercase tracking-wider bg-red-700 text-white font-extrabold px-2 py-0.5 rounded-md">
                      Terpilih
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-stone-500 italic">
        * Jadwal pengantaran dilakukan via kurir khusus kue untuk memastikan kemasan dan toples kue Natal tiba dalam kondisi utuh dan higienis.
      </p>
    </div>
  );
}

