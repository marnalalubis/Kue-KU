import { NextResponse } from "next/server";
import { getProducts, getCategories } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        categories,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat katalog produk" },
      { status: 500 }
    );
  }
}
