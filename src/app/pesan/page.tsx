"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { DateCapacityPicker } from "@/components/DateCapacityPicker";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Calendar,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, deliveryDate: cartDeliveryDate, setDeliveryDate: setCartDeliveryDate } = useCart();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(cartDeliveryDate || "");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const flatShippingFee = 0;
  const grandTotal = subtotal;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side quick checks
    if (!customerName.trim() || customerName.trim().length < 3) {
      setErrorMessage("Silakan masukkan nama lengkap pemesan (minimal 3 karakter).");
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage("Silakan masukkan nomor WhatsApp aktif yang valid (minimal 9 digit).");
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 10) {
      setErrorMessage("Silakan masukkan alamat pengantaran lengkap beserta patokan rumah.");
      return;
    }

    if (!deliveryDate) {
      setErrorMessage("Silakan pilih tanggal pengantaran kue terlebih dahulu.");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Keranjang pesanan Anda masih kosong.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          deliveryAddress,
          deliveryDate,
          notes,
          items,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMessage(
          json.message || "Gagal mengirim pesanan. Silakan periksa kembali formulir Anda."
        );
        setLoading(false);
        return;
      }

      // Berhasil
      const orderCode = json.data.orderCode;
      clearCart();
      router.push(`/pesanan/${orderCode}`);
    } catch (err) {
      console.error("Error submitting order:", err);
      setErrorMessage("Koneksi bermasalah. Silakan periksa internet Anda dan coba lagi.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-800 text-4xl flex items-center justify-center mx-auto mb-4">
          🛒
        </div>
        <h1 className="font-serif font-black text-2xl text-stone-900">
          Keranjang Belanja Anda Masih Kosong
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Silakan pilih kue Natal favorit Anda dari katalog menu sebelum melanjutkan ke formulir pemesanan.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Buka Katalog Menu Kue</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumb & Title */}
      <div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-800 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Kue</span>
        </Link>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-stone-900 tracking-tight">
          Formulir Pemesanan Kue Natal
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Lengkapi data pemesanan dan jadwal pengantaran. Pembayaran dilakukan saat kue diterima (COD).
        </p>
      </div>

      {/* Main Grid: Form Left, Order Summary Right */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Periksa Kembali:</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Section 1: Customer Details */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <User className="w-5 h-5 text-red-800" />
              <span>1. Informasi Pemesan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Pemesan *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Maria Kristina"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Aktif *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Alamat Lengkap Pengantaran *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <textarea
                  required
                  rows={3}
                  placeholder="Contoh: Jl. Anggrek No. 15 RT 02/05, Kel. Menteng, Kec. Menteng, Jakarta Pusat (Pagar hitam, sebelah warung madura)"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition-all leading-relaxed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Catatan Pengiriman Khusus (Opsional)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  placeholder="Contoh: Harap hubungi sebelum sampai, atau titip di satpam jika tidak ada orang."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition-all leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Date */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <Calendar className="w-5 h-5 text-red-800" />
              <span>2. Tanggal Pesan Diantar ke Konsumen</span>
            </h2>

            <DateCapacityPicker
              selectedDate={deliveryDate}
              onSelectDate={(d) => {
                setDeliveryDate(d);
                setCartDeliveryDate(d);
              }}
            />
          </div>

          {/* Section 3: Payment Notice (COD) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              <span>3. Metode Pembayaran</span>
            </h2>

            <div className="p-4 rounded-2xl bg-stone-50 border-2 border-green-600 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-0.5">
                ✓
              </div>
              <div className="text-xs">
                <strong className="text-stone-900 font-bold text-sm block">
                  Bayar di Tempat (COD / Saat Pesanan Tiba)
                </strong>
                <p className="text-stone-600 mt-1 leading-relaxed">
                  Anda tidak perlu mentransfer uang muka sekarang. Pembayaran dapat diserahkan langsung secara tunai atau scan QRIS kurir ketika pesanan kue Natal sampai di alamat Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm sticky top-28 space-y-5">
          <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShoppingBag className="w-5 h-5 text-red-800" />
            <span>Ringkasan Pesanan ({items.length} Macam Kue)</span>
          </h2>

          {/* Items List */}
          <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1 space-y-2">
            {items.map((item) => (
              <div key={item.variantId} className="pt-2 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="font-bold text-stone-900 truncate">
                    {item.productName}
                  </div>
                  <div className="text-stone-500">
                    {item.variantName} &times; {item.quantity}
                  </div>
                </div>
                <div className="font-bold text-xs text-stone-900">
                  {formatRupiah(item.subtotal)}
                </div>
              </div>
            ))}
          </div>

          {/* Cost Calculation */}
          <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span>Subtotal Produk:</span>
              <span className="font-bold text-stone-900">{formatRupiah(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1">
                <span>Ongkos Kirim:</span>
              </span>
              <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs">
                Gratis (Rp 0)
              </span>
            </div>

            {deliveryDate && (
              <div className="flex items-center justify-between text-stone-600 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70">
                <span className="flex items-center gap-1.5 font-bold text-stone-700">
                  <Calendar className="w-3.5 h-3.5 text-red-800" />
                  <span>Diantar ke Konsumen:</span>
                </span>
                <span className="font-black text-red-950 text-right text-xs">
                  {formatDateIndo(deliveryDate)}
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="block font-serif font-black text-sm text-stone-900">
                  Total Bayar (COD):
                </span>
                <span className="text-[10px] text-stone-500">Sesuai total belanja produk</span>
              </div>
              <span className="font-black text-2xl text-red-900">
                {formatRupiah(grandTotal)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-black text-sm shadow-xl shadow-red-900/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses Pesanan Anda...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>Konfirmasi &amp; Kirim Pesanan Sekarang</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-stone-400 text-center leading-relaxed">
            Dengan mengirimkan pesanan, Anda menyetujui jadwal pengantaran tanggal yang telah dipilih dan bersedia melakukan pembayaran saat barang tiba di lokasi.
          </p>
        </div>
      </form>
    </div>
  );
}
