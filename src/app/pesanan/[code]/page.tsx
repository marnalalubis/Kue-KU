"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Order } from "@/types";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Phone,
  FileText,
  Printer,
  Share2,
  ArrowRight,
  AlertCircle,
  Truck,
  Sparkles,
} from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderCode = params.code as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderCode}`);
        const json = await res.json();
        if (json.success && json.data) {
          setOrder(json.data);
        } else {
          setError(json.message || "Pesanan tidak ditemukan");
        }
      } catch (e) {
        console.error("Gagal memuat pesanan:", e);
        setError("Gagal memuat rincian pesanan");
      } finally {
        setLoading(false);
      }
    }

    if (orderCode) {
      fetchOrder();
    }
  }, [orderCode]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <Clock className="w-10 h-10 text-red-800 animate-spin mx-auto" />
        <p className="text-sm font-semibold text-stone-600">
          Memuat rincian nota pesanan Anda...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
        <h1 className="font-serif font-black text-2xl text-stone-900">
          Pesanan Tidak Ditemukan
        </h1>
        <p className="text-xs text-stone-600">
          Nomor pesanan <strong>{orderCode}</strong> tidak terdaftar di sistem kami.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-red-800 text-white font-bold text-xs"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Halo Admin Kue-KU, saya ingin konfirmasi pesanan dengan nomor: ${order.orderCode} atas nama ${order.customerName}. Tanggal Pesan Diantar ke Konsumen: ${formatDateIndo(order.deliveryDate)}. Mohon info proses selanjutnya ya.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Success Notification Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-green-900 text-white shadow-xl text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-emerald-300">
          <CheckCircle className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold">
          Pesanan Berhasil Dicatat!
        </span>
        <h1 className="font-serif font-black text-2xl sm:text-3xl tracking-tight">
          Terima Kasih, {order.customerName}!
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto leading-relaxed">
          Pesanan Anda telah masuk ke sistem dapur kami. Anda dapat menyimpan atau mencetak nota digital ini sebagai tanda bukti pemesanan.
        </p>
      </div>

      {/* Digital Receipt Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6 print:border-none print:shadow-none">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="text-xs text-stone-500 font-medium">Nomor Nota Pesanan:</div>
            <div className="font-mono font-black text-xl sm:text-2xl text-red-900 tracking-wide">
              {order.orderCode}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {/* Customer & Delivery Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
            <div className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>Detail Kontak Pemesan</span>
            </div>
            <div>
              <span className="text-stone-500 block">Nama:</span>
              <strong className="text-stone-800 text-sm">{order.customerName}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Nomor WhatsApp:</span>
              <strong className="text-stone-800">{order.customerPhone}</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
            <div className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>Tanggal Pesan Diantar ke Konsumen</span>
            </div>
            <div>
              <span className="text-stone-500 block">Jadwal Pengantaran:</span>
              <strong className="text-red-900 text-sm font-extrabold">
                {formatDateIndo(order.deliveryDate)}
              </strong>
            </div>
            <div>
              <span className="text-stone-500 block">Metode Pembayaran:</span>
              <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded text-[11px]">
                Bayar Saat Diterima (COD)
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 text-xs space-y-1">
          <div className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            <span>Alamat Pengantaran</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-medium">
            {order.deliveryAddress}
          </p>
          {order.notes && (
            <p className="text-stone-500 italic pt-1 border-t border-stone-200 mt-2">
              <strong>Catatan:</strong> &quot;{order.notes}&quot;
            </p>
          )}
        </div>

        {/* Items Table */}
        <div>
          <h3 className="font-serif font-bold text-sm text-stone-900 mb-3 uppercase tracking-wider">
            Rincian Item Kue Natal:
          </h3>
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Nama Kue</th>
                  <th className="py-3 px-4">Varian Kemasan</th>
                  <th className="py-3 px-4 text-center">Jumlah</th>
                  <th className="py-3 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {item.productName}
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium">
                      {item.variantName}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-stone-800">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-stone-900">
                      {formatRupiah(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-stone-50 border-t border-stone-200 text-stone-700">
                <tr>
                  <td colSpan={3} className="py-2.5 px-4 text-right font-medium">
                    Subtotal Produk:
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-stone-900">
                    {formatRupiah(order.subtotal)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2.5 px-4 text-right font-medium">
                    Ongkos Pengantaran:
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-stone-900">
                    {order.shippingFee > 0 ? (
                      formatRupiah(order.shippingFee)
                    ) : (
                      <span className="text-green-700 font-bold">Gratis (Rp 0)</span>
                    )}
                  </td>
                </tr>
                <tr className="bg-red-50 text-red-950 font-black text-sm">
                  <td colSpan={3} className="py-3.5 px-4 text-right">
                    Total Pembayaran (COD):
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-base text-red-900">
                    {formatRupiah(order.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Nota</span>
            </button>

            <a
              href={`https://wa.me/6281289001225?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Kirim ke WhatsApp Toko</span>
            </a>
          </div>

          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-950"
          >
            <span>Pesan Kue Lainnya</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
