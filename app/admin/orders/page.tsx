"use client";

import { useOrder } from "../../context/OrderContext";
import { useState } from "react";

export default function AdminOrdersPage() {
  const { orders, updateStatus } = useOrder();
  const [tracking, setTracking] = useState("");

  return (
    <main style={{ padding: "16px" }}>
      <h1>Admin — Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} style={box}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <select
            style={input}
            onChange={(e) =>
              updateStatus(order.id, e.target.value, tracking)
            }
            defaultValue={order.status}
          >
            <option>Order Confirmed</option>
            <option>Ready to be Shipped</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>

          <input
            style={input}
            placeholder="Tracking ID (optional)"
            onChange={(e) => setTracking(e.target.value)}
          />
        </div>
      ))}
    </main>
  );
}

/* ================= STYLES ================= */

const box = {
  marginTop: "20px",
  padding: "14px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const input = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};
