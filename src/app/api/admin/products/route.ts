import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  updateProductStock,
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
    return NextResponse.json({
      success: true,
      data: products,
      categories,
    });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat produk" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, image, categoryId, variants, badge, allergenInfo, isFeatured } = body;

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Nama kue minimal 3 karakter" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Kategori kue wajib dipilih" },
        { status: 400 }
      );
    }

    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return NextResponse.json(
        { success: false, message: "Minimal harus memiliki 1 varian kue" },
        { status: 400 }
      );
    }

    const newProduct = await createProduct({
      name: name.trim(),
      description: (description || "").trim(),
      image: (image || "").trim(),
      categoryId,
      badge: badge || null,
      allergenInfo: allergenInfo || null,
      isFeatured: Boolean(isFeatured),
      variants,
    });

    return NextResponse.json({
      success: true,
      message: "Katalog kue berhasil ditambahkan!",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan kue ke katalog" },
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
    const { id, name, description, image, categoryId, variants, badge, allergenInfo, isFeatured } = body;

    if (!id || !name || !categoryId || !variants || variants.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data produk tidak lengkap" },
        { status: 400 }
      );
    }

    const updated = await updateProduct(id, {
      name: name.trim(),
      description: (description || "").trim(),
      image: (image || "").trim(),
      categoryId,
      badge: badge || null,
      allergenInfo: allergenInfo || null,
      isFeatured: Boolean(isFeatured),
      variants,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan untuk diperbarui" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Katalog kue berhasil diperbarui!",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui katalog kue" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID produk wajib disertakan" },
        { status: 400 }
      );
    }

    const ok = await deleteProduct(id);
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Gagal menghapus produk" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kue berhasil dihapus dari katalog",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat menghapus produk" },
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

