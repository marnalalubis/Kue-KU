import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllOrders, getProducts } from "@/lib/data-service";
import { Order, OrderStatus } from "@/types";

export const dynamic = "force-dynamic";

export interface ItemRecap {
  productId: string;
  variantId?: string | null;
  productName: string;
  variantName: string;
  totalQuantity: number;
  currentStock: number;
  deficit: number; // Berapa yang harus dipanggang jika stok tidak cukup
  datesBreakdown: Record<string, number>; // e.g. { "2026-12-24": 15, "2026-12-25": 10 }
  orders: {
    orderCode: string;
    customerName: string;
    customerPhone: string;
    quantity: number;
    deliveryDate: string;
    status: OrderStatus;
  }[];
}

export interface DateRecap {
  date: string;
  orderCount: number;
  totalItems: number;
  items: {
    name: string;
    variant: string;
    quantity: number;
  }[];
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get("date"); // e.g. "2026-12-24" or "ALL"
    const statusFilter = searchParams.get("status"); // "TO_MAKE", "ALL_ACTIVE", "ALL"

    const [allOrders, allProducts] = await Promise.all([
      getAllOrders(),
      getProducts(),
    ]);

    // Map stocks
    const stockMap: Record<string, number> = {};
    for (const p of allProducts) {
      for (const v of p.variants) {
        stockMap[v.id] = Number(v.stock) || 0;
      }
    }


    // Filter orders
    let filteredOrders = allOrders;

    if (dateFilter && dateFilter !== "ALL") {
      filteredOrders = filteredOrders.filter((o) => o.deliveryDate === dateFilter);
    }

    if (statusFilter === "TO_MAKE") {
      // Hanya pesanan yang perlu diproduksi/disiapkan
      filteredOrders = filteredOrders.filter(
        (o) => o.status === "BARU" || o.status === "DIKONFIRMASI" || o.status === "DALAM_PROSES"
      );
    } else if (statusFilter === "ALL_ACTIVE") {
      // Semua kecuali yang dibatalkan
      filteredOrders = filteredOrders.filter((o) => o.status !== "DIBATALKAN");
    }

    // Aggregate by item
    const itemMap: Record<string, ItemRecap> = {};
    const dateMap: Record<string, DateRecap> = {};

    let totalCakesToMake = 0;

    for (const order of filteredOrders) {
      // Date breakdown
      if (!dateMap[order.deliveryDate]) {
        dateMap[order.deliveryDate] = {
          date: order.deliveryDate,
          orderCount: 0,
          totalItems: 0,
          items: [],
        };
      }
      dateMap[order.deliveryDate].orderCount += 1;

      for (const item of order.items) {
        totalCakesToMake += item.quantity;
        dateMap[order.deliveryDate].totalItems += item.quantity;

        // Add to date item list
        const existingDateItem = dateMap[order.deliveryDate].items.find(
          (di) => di.name === item.productName && di.variant === item.variantName
        );
        if (existingDateItem) {
          existingDateItem.quantity += item.quantity;
        } else {
          dateMap[order.deliveryDate].items.push({
            name: item.productName,
            variant: item.variantName,
            quantity: item.quantity,
          });
        }

        // Aggregate by Product + Variant
        const key = `${item.productId}_${item.variantName}`;
        const currentStock = Number(item.variantId ? stockMap[item.variantId] : 0) || 0;


        if (!itemMap[key]) {
          itemMap[key] = {
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            totalQuantity: 0,
            currentStock,
            deficit: 0,
            datesBreakdown: {},
            orders: [],
          };
        }

        itemMap[key].totalQuantity += item.quantity;
        itemMap[key].datesBreakdown[order.deliveryDate] =
          (itemMap[key].datesBreakdown[order.deliveryDate] || 0) + item.quantity;

        itemMap[key].orders.push({
          orderCode: order.orderCode,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          quantity: item.quantity,
          deliveryDate: order.deliveryDate,
          status: order.status,
        });
      }
    }

    // Calculate deficits (if orders exceed available ready stock)
    const itemsRecapList = Object.values(itemMap).map((it) => ({
      ...it,
      deficit: Math.max(0, it.totalQuantity - it.currentStock),
    }));

    // Sort items by highest quantity needed
    itemsRecapList.sort((a, b) => b.totalQuantity - a.totalQuantity);

    // Sort dates
    const dateRecapList = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      success: true,
      data: {
        totalOrders: filteredOrders.length,
        totalCakesToMake,
        itemsRecap: itemsRecapList,
        datesRecap: dateRecapList,
        orders: filteredOrders,
      },
    });
  } catch (error) {
    console.error("Error generating recap:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat rekap pesanan dapur" },
      { status: 500 }
    );
  }
}
