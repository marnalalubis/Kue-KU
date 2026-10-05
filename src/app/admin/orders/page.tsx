"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Order, OrderStatus } from "@/types";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Eye,
  X,
  AlertCircle,
  Truck,
  Printer,
} from "lucide-react";

const STATUSES: { label: string; value: string }[] = [
  { label: "Semua", value: "ALL" },
  { label: "Baru Masuk", value: "BARU" },
  { label: "Dikonfirmasi", value: "DIKONFIRMASI" },
  { label: "Dalam Proses", value: "DALAM_PROSES" },
  { label: "Dalam Pengantaran", value: "DALAM_PENGANTARAN" },
  { label: "Selesai", value: "SELESAI" },
  { label: "Dibatalkan", value: "DIBATALKAN" },
];

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      let url = "/api/admin/orders";
      const params = new URLSearchParams();
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      if (res.status === 401) {
        window.location.href = `/admin/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
        return;
      }
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }

    } catch (e) {
      console.error("Error fetching orders:", e);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, searchQuery]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (activeOrder && activeOrder.id === orderId) {
          setActiveOrder({ ...activeOrder, status: newStatus });
        }
      }
    } catch (e) {
      console.error("Error updating status:", e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Manajemen Pesanan Masuk
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Tinjau detail pelanggan, periksa item kue yang dipesan, dan perbarui status pengerjaan pesanan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STATUSES.map((st) => (
            <button
              key={st.value}
              onClick={() => setSelectedStatus(st.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatus === st.value
                  ? "bg-red-800 text-white shadow-xs"
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berdasarkan nomor nota (KUE-...), nama pelanggan, atau no. telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-xs text-stone-500 space-y-2">
            <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400" />
            <span>Memuat data pesanan...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-16 text-center text-xs text-stone-500 space-y-2">
            <AlertCircle className="w-8 h-8 text-stone-300 mx-auto" />
            <div className="font-bold text-stone-800">Tidak ada pesanan ditemukan</div>
            <p>Cobalah mengganti filter status atau kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider text-[10px] border-b border-stone-100">
                <tr>
                  <th className="py-3.5 px-4">No. Nota</th>
                  <th className="py-3.5 px-4">Pemesan</th>
                  <th className="py-3.5 px-4">Tgl Diantar ke Konsumen</th>
                  <th className="py-3.5 px-4">Item Kue</th>
                  <th className="py-3.5 px-4">Total Bayar</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-red-900">
                      {ord.orderCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{ord.customerName}</div>
                      <div className="text-[11px] text-stone-500">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">
                      {formatDateIndo(ord.deliveryDate)}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {ord.items.length} macam kue
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-stone-900">
                      {formatRupiah(ord.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <OrderStatusBadge status={ord.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveOrder(ord)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Kelola</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail & Status Management Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                  Detail Nota Pesanan
                </span>
                <h3 className="font-mono font-black text-xl text-red-900">
                  {activeOrder.orderCode}
                </h3>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Status Update Control */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px]">
                  Ubah Status Pesanan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "BARU",
                      "DIKONFIRMASI",
                      "DALAM_PROSES",
                      "DALAM_PENGANTARAN",
                      "SELESAI",
                      "DIBATALKAN",
                    ] as OrderStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      disabled={updating || activeOrder.status === st}
                      onClick={() => handleUpdateStatus(activeOrder.id, st)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        activeOrder.status === st
                          ? "bg-amber-800 text-white shadow-xs cursor-default"
                          : "bg-white text-stone-700 border border-amber-300 hover:bg-amber-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer and Delivery info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-500" />
                    <span>Pemesan</span>
                  </div>
                  <div className="font-bold text-stone-800">{activeOrder.customerName}</div>
                  <div className="text-stone-500">{activeOrder.customerPhone}</div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-500" />
                    <span>Tanggal Diantar ke Konsumen</span>
                  </div>
                  <div className="font-bold text-red-900">
                    {formatDateIndo(activeOrder.deliveryDate)}
                  </div>
                  <div className="text-stone-500">COD (Bayar Saat Diterima)</div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>Alamat Lengkap</span>
                </div>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {activeOrder.deliveryAddress}
                </p>
                {activeOrder.notes && (
                  <p className="text-stone-500 italic mt-1 pt-1 border-t border-stone-200">
                    Catatan: &quot;{activeOrder.notes}&quot;
                  </p>
                )}
              </div>

              {/* Items Table */}
              <div>
                <span className="font-serif font-bold text-xs text-stone-800 block uppercase tracking-wider mb-2">
                  Daftar Kue yang Dipesan:
                </span>
                <div className="border border-stone-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Kue</th>
                        <th className="py-2.5 px-3">Varian</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {activeOrder.items.map((it) => (
                        <tr key={it.id}>
                          <td className="py-2.5 px-3 font-bold text-stone-900">
                            {it.productName}
                          </td>
                          <td className="py-2.5 px-3 text-stone-600">{it.variantName}</td>
                          <td className="py-2.5 px-3 text-center font-bold">{it.quantity}</td>
                          <td className="py-2.5 px-3 text-right font-extrabold text-stone-900">
                            {formatRupiah(it.subtotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-stone-50 border-t border-stone-200 font-bold">
                      <tr>
                        <td colSpan={3} className="py-2 px-3 text-right">
                          Ongkos Kirim:
                        </td>
                        <td className="py-2 px-3 text-right">
                          {activeOrder.shippingFee > 0
                            ? formatRupiah(activeOrder.shippingFee)
                            : "Gratis (Rp 0)"}
                        </td>
                      </tr>
                      <tr className="text-red-900 font-black text-sm">
                        <td colSpan={3} className="py-2.5 px-3 text-right">
                          Total Pesanan:
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {formatRupiah(activeOrder.totalAmount)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-end">
              <button
                onClick={() => setActiveOrder(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-xs text-stone-500">
          <Clock className="w-6 h-6 animate-spin mx-auto text-stone-400 mb-2" />
          <span>Memuat data pesanan admin...</span>
        </div>
      }
    >
      <AdminOrdersContent />
    </Suspense>
  );
}
