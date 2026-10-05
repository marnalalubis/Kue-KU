import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateProductStock, getProducts } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat produk" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { productId, variantId, isAvailable, stock } = body;

    if (!productId || !variantId || typeof isAvailable !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Parameter tidak lengkap" },
        { status: 400 }
      );
    }

    const ok = await updateProductStock(productId, variantId, isAvailable, stock);
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Gagal memperbarui status produk" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status stok varian berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating product stock:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui produk" },
      { status: 500 }
    );
  }
}
