import { prisma } from "./prisma";
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  DEFAULT_STORE_SETTING,
} from "./constants";
import { Category, Product, Order, DailyCapacity, StoreSetting, OrderStatus } from "@/types";

// In-memory memory fallback store
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryProducts: Product[] = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
let memoryOrders: Order[] = [
  {
    id: "ord-demo-1",
    orderCode: "KUE-20261224-8821",
    customerName: "Ibu Michelle Santoso",
    customerPhone: "081234567890",
    deliveryAddress: "Jl. Boulevard Raya Blok PA No. 12, Kelapa Gading, Jakarta Utara",
    deliveryDate: "2026-12-24",
    notes: "Mohon diantar sebelum jam 14.00, ada acara keluarga.",
    subtotal: 385000,
    shippingFee: 20000,
    totalAmount: 405000,
    status: "DIKONFIRMASI",
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "item-1",
        orderId: "ord-demo-1",
        productId: "prod-7",
        productName: "Hampers Bethlehem Joy (3 Toples)",
        variantName: "Paket Box Hardcase + Pita Satin",
        price: 385000,
        quantity: 1,
        subtotal: 385000,
      },
    ],
  },
  {
    id: "ord-demo-2",
    orderCode: "KUE-20261225-1049",
    customerName: "Bpk. David Christian",
    customerPhone: "081987654321",
    deliveryAddress: "Apartemen Senopati Suites Tower 2 Unit 15A, Kebayoran Baru, Jakarta Selatan",
    deliveryDate: "2026-12-25",
    notes: "Titip di resepsionis lobi jika saya belum turun.",
    subtotal: 340000,
    shippingFee: 20000,
    totalAmount: 360000,
    status: "BARU",
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "item-2",
        orderId: "ord-demo-2",
        productId: "prod-1",
        productName: "Nastar Wisman Spesial Natal",
        variantName: "Toples Bulat Besar 500g",
        price: 155000,
        quantity: 1,
        subtotal: 155000,
      },
      {
        id: "item-3",
        orderId: "ord-demo-2",
        productId: "prod-2",
        productName: "Kastengel Keju Edam Tua & Gouda",
        variantName: "Toples Bulat Besar 500g",
        price: 170000,
        quantity: 1,
        subtotal: 170000,
      },
    ],
  },
];

let memoryCapacities: Record<string, DailyCapacity> = {
  "2026-12-24": {
    id: "cap-1",
    date: "2026-12-24",
    maxOrders: 35,
    bookedOrders: 18,
    isClosed: false,
  },
  "2026-12-25": {
    id: "cap-2",
    date: "2026-12-25",
    maxOrders: 35,
    bookedOrders: 29,
    isClosed: false,
  },
};

let memorySettings: StoreSetting = { ...DEFAULT_STORE_SETTING };

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (categories && categories.length > 0) {
      return categories as Category[];
    }
  } catch {
    // Gunakan fallback
  }
  return memoryCategories;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });
    if (products && products.length > 0) {
      return products as unknown as Product[];
    }
  } catch {
    // Gunakan fallback
  }
  return memoryProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
      },
    });
    if (product) return product as unknown as Product;
  } catch {
    // fallback
  }
  const found = memoryProducts.find((p) => p.id === id || p.slug === id);
  return found || null;
}

export async function updateProductStock(
  productId: string,
  variantId: string,
  isAvailable: boolean,
  newStock?: number
): Promise<boolean> {
  try {
    await prisma.productVariant.update({
      where: { id: variantId },
      data: {
        isAvailable,
        ...(newStock !== undefined ? { stock: newStock } : {}),
      },
    });
    return true;
  } catch {
    // fallback
  }
  const product = memoryProducts.find((p) => p.id === productId);
  if (product) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      variant.isAvailable = isAvailable;
      if (newStock !== undefined) variant.stock = newStock;
      return true;
    }
  }
  return false;
}

export interface ProductInputPayload {
  name: string;
  description: string;
  image: string;
  categoryId: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  badge?: string | null;
  allergenInfo?: string | null;
  variants: {
    id?: string;
    name: string;
    price: number;
    stock: number;
    weightGram?: number | null;
    isAvailable?: boolean;
  }[];
}

export async function createProduct(input: ProductInputPayload): Promise<Product> {
  const baseSlug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const slug = `${baseSlug || "kue-natal"}-${Date.now().toString().slice(-4)}`;

  try {
    const created = await prisma.product.create({
      data: {
        name: input.name,
        slug,
        description: input.description,
        image: input.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
        categoryId: input.categoryId,
        badge: input.badge || null,
        allergenInfo: input.allergenInfo || null,
        isFeatured: input.isFeatured ?? false,
        isAvailable: input.isAvailable ?? true,
        variants: {
          create: input.variants.map((v) => ({
            name: v.name,
            price: Number(v.price) || 0,
            stock: Number(v.stock) || 50,
            weightGram: v.weightGram ? Number(v.weightGram) : null,
            isAvailable: v.isAvailable ?? true,
          })),
        },
      },
      include: {
        category: true,
        variants: true,
      },
    });
    return created as unknown as Product;
  } catch (err) {
    console.error("Prisma createProduct error, using fallback:", err);
  }

  // Fallback
  const newId = `prod-${Date.now()}`;
  const fallbackProduct: Product = {
    id: newId,
    name: input.name,
    slug,
    description: input.description,
    image: input.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    categoryId: input.categoryId,
    isAvailable: input.isAvailable ?? true,
    isFeatured: input.isFeatured ?? false,
    badge: input.badge || null,
    allergenInfo: input.allergenInfo || null,
    variants: input.variants.map((v, idx) => ({
      id: `var-${newId}-${idx + 1}`,
      productId: newId,
      name: v.name,
      price: Number(v.price) || 0,
      stock: Number(v.stock) || 50,
      weightGram: v.weightGram ? Number(v.weightGram) : null,
      isAvailable: v.isAvailable ?? true,
    })),
  };
  memoryProducts.unshift(fallbackProduct);
  return fallbackProduct;
}

export async function updateProduct(id: string, input: ProductInputPayload): Promise<Product | null> {
  try {
    // 1. Update master product info
    await prisma.product.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description,
        image: input.image,
        categoryId: input.categoryId,
        badge: input.badge || null,
        allergenInfo: input.allergenInfo || null,
        isFeatured: input.isFeatured ?? false,
        isAvailable: input.isAvailable ?? true,
      },
    });

    // 2. Upsert each variant
    for (const v of input.variants) {
      if (v.id && !v.id.startsWith("new-")) {
        await prisma.productVariant.upsert({
          where: { id: v.id },
          update: {
            name: v.name,
            price: Number(v.price) || 0,
            stock: Number(v.stock) || 0,
            weightGram: v.weightGram ? Number(v.weightGram) : null,
            isAvailable: v.isAvailable ?? true,
          },
          create: {
            id: v.id,
            productId: id,
            name: v.name,
            price: Number(v.price) || 0,
            stock: Number(v.stock) || 0,
            weightGram: v.weightGram ? Number(v.weightGram) : null,
            isAvailable: v.isAvailable ?? true,
          },
        });
      } else {
        await prisma.productVariant.create({
          data: {
            productId: id,
            name: v.name,
            price: Number(v.price) || 0,
            stock: Number(v.stock) || 0,
            weightGram: v.weightGram ? Number(v.weightGram) : null,
            isAvailable: v.isAvailable ?? true,
          },
        });
      }
    }

    const updated = await prisma.product.findUnique({
      where: { id },
      include: { category: true, variants: true },
    });
    if (updated) return updated as unknown as Product;
  } catch (err) {
    console.error("Prisma updateProduct error:", err);
  }

  // Fallback
  const idx = memoryProducts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryProducts[idx] = {
      ...memoryProducts[idx],
      name: input.name,
      description: input.description,
      image: input.image,
      categoryId: input.categoryId,
      badge: input.badge || null,
      allergenInfo: input.allergenInfo || null,
      isFeatured: input.isFeatured ?? false,
      isAvailable: input.isAvailable ?? true,
      variants: input.variants.map((v, i) => ({
        id: v.id && !v.id.startsWith("new-") ? v.id : `var-${id}-${i + 1}`,
        productId: id,
        name: v.name,
        price: Number(v.price) || 0,
        stock: Number(v.stock) || 0,
        weightGram: v.weightGram ? Number(v.weightGram) : null,
        isAvailable: v.isAvailable ?? true,
      })),
    };
    return memoryProducts[idx];
  }
  return null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    return true;
  } catch (err) {
    console.error("Prisma deleteProduct error:", err);
  }

  const idx = memoryProducts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryProducts.splice(idx, 1);
    return true;
  }
  return false;
}


export async function getDailyCapacity(date: string): Promise<DailyCapacity> {
  try {
    const cap = await prisma.dailyCapacity.findUnique({
      where: { date },
    });
    if (cap) return cap as DailyCapacity;
  } catch {
    // fallback
  }
  if (!memoryCapacities[date]) {
    memoryCapacities[date] = {
      id: `cap-${date}`,
      date,
      maxOrders: 30,
      bookedOrders: 0,
      isClosed: false,
    };
  }
  return memoryCapacities[date];
}

export async function updateDailyCapacity(
  date: string,
  maxOrders: number,
  isClosed?: boolean
): Promise<DailyCapacity> {
  try {
    const cap = await prisma.dailyCapacity.upsert({
      where: { date },
      update: {
        maxOrders,
        ...(isClosed !== undefined ? { isClosed } : {}),
      },
      create: {
        date,
        maxOrders,
        bookedOrders: 0,
        isClosed: isClosed ?? false,
      },
    });
    return cap as DailyCapacity;
  } catch {
    // fallback
  }
  if (!memoryCapacities[date]) {
    memoryCapacities[date] = {
      id: `cap-${date}`,
      date,
      maxOrders,
      bookedOrders: 0,
      isClosed: isClosed ?? false,
    };
  } else {
    memoryCapacities[date].maxOrders = maxOrders;
    if (isClosed !== undefined) memoryCapacities[date].isClosed = isClosed;
  }
  return memoryCapacities[date];
}

export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
  try {
    const newOrder = await prisma.order.create({
      data: {
        orderCode: orderData.orderCode,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        deliveryAddress: orderData.deliveryAddress,
        deliveryDate: orderData.deliveryDate,
        notes: orderData.notes,
        subtotal: orderData.subtotal,
        shippingFee: orderData.shippingFee,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
        items: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: true },
    });

    // Update kapasitas
    await prisma.dailyCapacity.upsert({
      where: { date: orderData.deliveryDate },
      update: { bookedOrders: { increment: 1 } },
      create: {
        date: orderData.deliveryDate,
        maxOrders: 30,
        bookedOrders: 1,
        isClosed: false,
      },
    });

    return newOrder as unknown as Order;
  } catch (err) {
    console.error("Prisma createOrder failed, fallback used:", err);
    // Fallback store
    const fullOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryOrders.unshift(fullOrder);

    if (!memoryCapacities[orderData.deliveryDate]) {
      memoryCapacities[orderData.deliveryDate] = {
        id: `cap-${orderData.deliveryDate}`,
        date: orderData.deliveryDate,
        maxOrders: 30,
        bookedOrders: 1,
        isClosed: false,
      };
    } else {
      memoryCapacities[orderData.deliveryDate].bookedOrders += 1;
    }

    return fullOrder;
  }
}

export async function getOrderByCode(code: string): Promise<Order | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { orderCode: code },
      include: { items: true },
    });
    if (order) return order as unknown as Order;
  } catch (err) {
    console.error("Prisma getOrderByCode failed:", err);
  }
  const found = memoryOrders.find(
    (o) => o.orderCode.toLowerCase() === code.toLowerCase()
  );
  return found || null;
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return (orders || []) as unknown as Order[];
  } catch (err) {
    console.error("Prisma getAllOrders failed, fallback used:", err);
    return memoryOrders;
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    });
    return updated as unknown as Order;
  } catch {
    // fallback
  }
  const order = memoryOrders.find((o) => o.id === orderId || o.orderCode === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }
  return null;
}

export async function getStoreSettings(): Promise<StoreSetting> {
  try {
    const setting = await prisma.storeSetting.findUnique({
      where: { id: "default-setting" },
    });
    if (setting) return setting as StoreSetting;
  } catch {
    // fallback
  }
  return memorySettings;
}

export async function updateStoreSettings(data: Partial<StoreSetting>): Promise<StoreSetting> {
  try {
    const updated = await prisma.storeSetting.upsert({
      where: { id: "default-setting" },
      update: data,
      create: {
        id: "default-setting",
        storeName: data.storeName ?? DEFAULT_STORE_SETTING.storeName,
        phone: data.phone ?? DEFAULT_STORE_SETTING.phone,
        flatShippingFee: data.flatShippingFee ?? DEFAULT_STORE_SETTING.flatShippingFee,
        deliveryAreaNotes: data.deliveryAreaNotes ?? DEFAULT_STORE_SETTING.deliveryAreaNotes,
        announcement: data.announcement ?? DEFAULT_STORE_SETTING.announcement,
        isStoreOpen: data.isStoreOpen ?? true,
      },
    });
    return updated as StoreSetting;
  } catch {
    // fallback
  }
  memorySettings = {
    ...memorySettings,
    ...data,
  };
  return memorySettings;
}
