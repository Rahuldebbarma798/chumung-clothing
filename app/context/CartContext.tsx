"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increase: (id: string, size: string) => void;
  decrease: (id: string, size: string) => void;
  remove: (id: string, size: string) => void;
  clearCart: () => void;
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

  function clearCart() {
    setCart([]);
  }

  /* ===== DERIVED VALUES (PERF + CLEAN) ===== */

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        addToCart,
        increase,
        decrease,
        remove,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
