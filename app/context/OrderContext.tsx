"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Order = {
  id: string;
  items: any[];
  status: string;
  trackingId?: string;
};

type OrderContextType = {
  orders: Order[];
  createOrder: (items: any[]) => string;
  getOrder: (id: string) => Order | undefined;
  updateStatus: (id: string, status: string, trackingId?: string) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function createOrder(items: any[]) {
    const id = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id,
      items,
      status: "Order Confirmed",
    };
    setOrders((prev) => [...prev, newOrder]);
    return id;
  }

  function getOrder(id: string) {
    return orders.find((o) => o.id === id);
  }

  function updateStatus(id: string, status: string, trackingId?: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status, trackingId }
          : o
      )
    );
  }

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, getOrder, updateStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}
