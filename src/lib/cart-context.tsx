"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "subtotal">) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  deliveryDate: string;
  setDeliveryDate: (date: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getDefaultDeliveryDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [deliveryDate, setDeliveryDateState] = useState<string>(getDefaultDeliveryDate);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("kueku_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedDate = localStorage.getItem("kueku_delivery_date");
      if (savedDate && /^\d{4}-\d{2}-\d{2}$/.test(savedDate)) {
        setDeliveryDateState(savedDate);
      }
    } catch (e) {
      console.error("Gagal memuat keranjang belanja dari penyimpanan lokal:", e);
    }
  }, []);

  const setDeliveryDate = (date: string) => {
    setDeliveryDateState(date);
    try {
      localStorage.setItem("kueku_delivery_date", date);
    } catch (e) {
      console.error("Gagal menyimpan tanggal pengantaran:", e);
    }
  };

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("kueku_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Gagal menyimpan keranjang:", e);
      }
    }
  }, [items, isMounted]);

  const addItem = (newItem: Omit<CartItem, "subtotal">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variantId === newItem.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + newItem.quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          subtotal: newQty * current.price,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...newItem,
          subtotal: newItem.quantity * newItem.price,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.variantId === variantId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              subtotal: nextQty * item.price,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        deliveryDate,
        setDeliveryDate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}
