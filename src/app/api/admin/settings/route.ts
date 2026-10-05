import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStoreSettings, updateStoreSettings } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getStoreSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching store settings:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat pengaturan toko" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updated = await updateStoreSettings(body);

    return NextResponse.json({
      success: true,
      message: "Pengaturan toko berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating store settings:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pengaturan toko" },
      { status: 500 }
    );
  }
}
