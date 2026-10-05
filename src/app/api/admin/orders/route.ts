import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllOrders, updateOrderStatus } from "@/lib/data-service";
import { OrderStatus } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let orders = await getAllOrders();

    if (status && status !== "ALL") {
      orders = orders.filter((o) => o.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderCode.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil daftar pesanan admin" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { orderId, status } = body;

    const validStatuses: OrderStatus[] = [
      "BARU",
      "DIKONFIRMASI",
      "DALAM_PROSES",
      "DALAM_PENGANTARAN",
      "SELESAI",
      "DIBATALKAN",
    ];

    if (!orderId || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "ID pesanan atau status tidak valid" },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(orderId, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status pesanan berhasil diperbarui menjadi ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui status pesanan" },
      { status: 500 }
    );
  }
}
