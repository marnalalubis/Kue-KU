"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Order, OrderStatus } from "@/types";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import {
  ShoppingBag,
  DollarSign,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
  Package,
  Boxes,
  ChefHat,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const res = await fetch("/api/admin/orders");
        const json = await res.json();
        if (json.success) {
          setOrders(json.data);
        }
      } catch (e) {
        console.error("Gagal memuat pesanan admin:", e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.status === "BARU").length;
  const confirmedRevenue = orders
    .filter((o) => o.status !== "DIBATALKAN")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Dashboard Operasional Dapur
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Pantau arus pesanan kue Natal, kapasitas pemanggangan, dan status pengiriman.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/recap"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <ChefHat className="w-4 h-4" />
            <span>Rekap Pesanan Dapur</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>Kelola Pesanan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>


      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Total Pesanan
            </span>
            <span className="font-serif font-black text-2xl sm:text-3xl text-stone-900 mt-1 block">
              {totalOrders}
            </span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">
              Semua status tercatat
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-800 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Pesanan Baru (Perlu Dikonfirmasi) */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              Pesanan Baru
            </span>
            <span className="font-serif font-black text-2xl sm:text-3xl text-amber-600 mt-1 block">
              {newOrders}
            </span>
            <span className="text-[11px] text-amber-600/80 mt-0.5 block">
              Menunggu tinjauan admin
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Estimasi Total Omset */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Estimasi Omset
            </span>
            <span className="font-serif font-black text-xl sm:text-2xl text-emerald-700 mt-1 block">
              {formatRupiah(confirmedRevenue)}
            </span>
            <span className="text-[11px] text-emerald-600/80 mt-0.5 block">
              (Eksklusif pesanan dibatalkan)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Persediaan Stok Toko */}
        <Link
          href="/admin/stock"
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between hover:border-red-300 transition-colors group"
        >
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Entry Stok Kue
            </span>
            <span className="font-serif font-black text-xl sm:text-2xl text-stone-900 mt-1 block group-hover:text-red-800">
              Kelola Stok &rarr;
            </span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">
              Catat panggangan baru
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Boxes className="w-6 h-6" />
          </div>
        </Link>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Pesanan Masuk Terbaru
            </h2>
            <p className="text-xs text-stone-500">
              Daftar 5 pesanan terkini yang masuk ke sistem toko.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-bold text-red-800 hover:text-red-950 flex items-center gap-1"
          >
            <span>Semua Pesanan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-stone-500">
            <Clock className="w-6 h-6 animate-spin mx-auto mb-2 text-stone-400" />
            <span>Memuat pesanan...</span>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-500">
            Belum ada pesanan yang masuk.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider text-[10px] border-y border-stone-100">
                <tr>
                  <th className="py-3 px-4">No. Nota</th>
                  <th className="py-3 px-4">Pemesan</th>
                  <th className="py-3 px-4">Tgl Kirim</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-red-900">
                      {ord.orderCode}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{ord.customerName}</div>
                      <div className="text-[11px] text-stone-500">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-700">
                      {formatDateIndo(ord.deliveryDate)}
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {formatRupiah(ord.totalAmount)}
                    </td>
                    <td className="py-3 px-4">
                      <OrderStatusBadge status={ord.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/orders?search=${ord.orderCode}`}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px]"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
