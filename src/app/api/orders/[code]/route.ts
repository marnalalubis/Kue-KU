import { NextRequest, NextResponse } from "next/server";
import { getOrderByCode } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    if (!code) {
      return NextResponse.json(
        { success: false, message: "Nomor pesanan wajib disertakan" },
        { status: 400 }
      );
    }

    const order = await getOrderByCode(code);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan dengan nomor tersebut tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order by code:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data pesanan" },
      { status: 500 }
    );
  }
}
