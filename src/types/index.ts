export type OrderStatus =
  | "BARU"
  | "DIKONFIRMASI"
  | "DALAM_PROSES"
  | "DALAM_PENGANTARAN"
  | "SELESAI"
  | "DIBATALKAN";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  weightGram?: number | null;
  price: number;
  stock: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  categoryId: string;
  category?: Category;
  isAvailable: boolean;
  isFeatured: boolean;
  badge?: string | null;
  allergenInfo?: string | null;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
  subtotal: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDate: string; // YYYY-MM-DD
  notes?: string | null;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  items: OrderItem[];
}

export interface DailyCapacity {
  id: string;
  date: string;
  maxOrders: number;
  bookedOrders: number;
  isClosed: boolean;
}

export interface StoreSetting {
  id: string;
  storeName: string;
  phone: string;
  flatShippingFee: number;
  deliveryAreaNotes: string;
  announcement: string;
  isStoreOpen: boolean;
}
