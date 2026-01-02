"use client";

import { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;        // ✅ ADD SIZE
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increase: (id: string, size: string) => void;
  decrease: (id: string, size: string) => void;
  remove: (id: string, size: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: Omit<CartItem, "quantity">) {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id && p.size === item.size
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function increase(id: string, size: string) {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  }

  function decrease(id: string, size: string) {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id && p.size === size
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  }

  function remove(id: string, size: string) {
    setCart((prev) =>
      prev.filter((p) => !(p.id === id && p.size === size))
    );
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
