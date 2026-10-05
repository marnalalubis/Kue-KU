import React from "react";
import { OrderStatus } from "@/types";

interface Props {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className = "" }: Props) {
  switch (status) {
    case "BARU":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 ${className}`}
        >
          ● Baru Masuk
        </span>
      );
    case "DIKONFIRMASI":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 ${className}`}
        >
          ✓ Dikonfirmasi Toko
        </span>
      );
    case "DALAM_PROSES":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 ${className}`}
        >
          🔥 Sedang Dipanggang/Siap
        </span>
      );
    case "DALAM_PENGANTARAN":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 ${className}`}
        >
          🛵 Dalam Pengantaran
        </span>
      );
    case "SELESAI":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 ${className}`}
        >
          ✨ Selesai Diterima
        </span>
      );
    case "DIBATALKAN":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 ${className}`}
        >
          ✕ Dibatalkan
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 ${className}`}
        >
          {status}
        </span>
      );
  }
}
