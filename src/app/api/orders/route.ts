import { NextRequest, NextResponse } from "next/server";
import { createOrder, getDailyCapacity, getStoreSettings } from "@/lib/data-service";
import { generateOrderCode } from "@/lib/utils";
import { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryDate,
      notes,
      items,
    } = body;

    // 1. Validasi Input Server-Side
    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap pemesan minimal 3 karakter" },
        { status: 400 }
      );
    }

    if (!customerPhone || typeof customerPhone !== "string" || customerPhone.replace(/\D/g, "").length < 9) {
      return NextResponse.json(
        { success: false, message: "Nomor WhatsApp aktif minimal 9 digit angka" },
        { status: 400 }
      );
    }

    if (!deliveryAddress || typeof deliveryAddress !== "string" || deliveryAddress.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: "Alamat pengantaran minimal 10 karakter" },
        { status: 400 }
      );
    }

    if (!deliveryDate || typeof deliveryDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(deliveryDate)) {
      return NextResponse.json(
        { success: false, message: "Format tanggal pengantaran tidak valid (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Keranjang pesanan tidak boleh kosong" },
        { status: 400 }
      );
    }

    // 2. Validasi Kapasitas Harian Toko
    const capacity = await getDailyCapacity(deliveryDate);
    if (capacity.isClosed || capacity.bookedOrders >= capacity.maxOrders) {
      return NextResponse.json(
        {
          success: false,
          message: `Mohon maaf, kuota pesanan untuk tanggal ${deliveryDate} sudah penuh (${capacity.bookedOrders}/${capacity.maxOrders} slot). Silakan pilih tanggal pengantaran lainnya.`,
        },
        { status: 400 }
      );
    }

    // 3. Perhitungan Subtotal & Ongkir
    const subtotal = items.reduce((sum: number, item: CartItem) => {
      const itemPrice = Number(item.price) || 0;
      const itemQty = Number(item.quantity) || 1;
      return sum + itemPrice * itemQty;
    }, 0);

    const settings = await getStoreSettings();
    const shippingFee = settings.flatShippingFee ?? 20000;
    const totalAmount = subtotal + shippingFee;

    // 4. Generate Order Code
    const orderCode = generateOrderCode();

    // 5. Simpan Pesanan ke Database
    const newOrder = await createOrder({
      orderCode,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      deliveryDate,
      notes: notes ? String(notes).trim() : null,
      subtotal,
      shippingFee,
      totalAmount,
      status: "BARU",
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      items: items.map((item: CartItem) => ({
        id: `item-${Date.now()}-${Math.random()}`,
        orderId: "",
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
    });

    return NextResponse.json({
      success: true,
      message: "Pesanan berhasil dibuat!",
      data: {
        orderCode: newOrder.orderCode,
        totalAmount: newOrder.totalAmount,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan sistem saat memproses pesanan" },
      { status: 500 }
    );
  }
}
