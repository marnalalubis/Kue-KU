import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDailyCapacity, updateDailyCapacity } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (date) {
      const cap = await getDailyCapacity(date);
      return NextResponse.json({ success: true, data: cap });
    }

    // Default list dates around Christmas 2026
    const sampleDates = [
      "2026-12-20",
      "2026-12-21",
      "2026-12-22",
      "2026-12-23",
      "2026-12-24",
      "2026-12-25",
      "2026-12-26",
    ];

    const capacities = await Promise.all(
      sampleDates.map((d) => getDailyCapacity(d))
    );

    return NextResponse.json({
      success: true,
      data: capacities,
    });
  } catch (error) {
    console.error("Error fetching admin capacity:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil kapasitas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { date, maxOrders, isClosed } = body;

    if (!date || !maxOrders || typeof maxOrders !== "number" || maxOrders < 0) {
      return NextResponse.json(
        { success: false, message: "Format tanggal atau jumlah batas pesanan tidak valid" },
        { status: 400 }
      );
    }

    const updated = await updateDailyCapacity(date, maxOrders, isClosed);
    return NextResponse.json({
      success: true,
      message: `Kapasitas untuk tanggal ${date} berhasil diatur ke ${maxOrders} pesanan`,
      data: updated,
    });
  } catch (error) {
    console.error("Error setting capacity:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui kapasitas" },
      { status: 500 }
    );
  }
}
