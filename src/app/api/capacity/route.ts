import { NextRequest, NextResponse } from "next/server";
import { getDailyCapacity } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { success: false, message: "Parameter tanggal (date) wajib diisi" },
        { status: 400 }
      );
    }

    const capacity = await getDailyCapacity(date);
    const remaining = Math.max(0, capacity.maxOrders - capacity.bookedOrders);
    const isAvailable = !capacity.isClosed && remaining > 0;

    return NextResponse.json({
      success: true,
      data: {
        date: capacity.date,
        maxOrders: capacity.maxOrders,
        bookedOrders: capacity.bookedOrders,
        remaining,
        isClosed: capacity.isClosed,
        isAvailable,
      },
    });
  } catch (error) {
    console.error("Error checking capacity:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memeriksa kapasitas harian" },
      { status: 500 }
    );
  }
}
