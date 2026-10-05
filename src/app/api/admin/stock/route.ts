import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateProductStock, getProducts } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat data stok" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { updates } = body; // Array of { productId, variantId, newStock, isAvailable }

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { success: false, message: "Daftar pembaruan stok tidak valid" },
        { status: 400 }
      );
    }

    for (const item of updates) {
      const { productId, variantId, newStock, isAvailable } = item;
      const available = typeof isAvailable === "boolean" ? isAvailable : Number(newStock) > 0;
      await updateProductStock(productId, variantId, available, Number(newStock));
    }

    return NextResponse.json({
      success: true,
      message: "Seluruh stok berhasil diperbarui!",
    });
  } catch (error) {
    console.error("Error batch updating stock:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat menyimpan stok" },
      { status: 500 }
    );
  }
}
