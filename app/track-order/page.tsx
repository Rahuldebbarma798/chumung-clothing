"use client";

import { useState } from "react";
import { useOrder } from "../context/OrderContext";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const { getOrder } = useOrder();

  const order = getOrder(orderId);

  return (
    <main style={container}>
      <h1 style={title}>Track My Order</h1>

      <input
        style={input}
        placeholder="Enter Order ID (e.g. ORD-123456)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      {order && (
        <div style={box}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>

          {order.trackingId && (
            <p><strong>Tracking ID:</strong> {order.trackingId}</p>
          )}
        </div>
      )}

      {orderId && !order && (
        <p style={{ marginTop: "12px", color: "#777" }}>
          Order not found.
        </p>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const container = {
  maxWidth: "420px",
  margin: "80px auto",   // 🔥 THIS PREVENTS OVERLAY
  padding: "0 16px",
};

const title = {
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const box = {
  marginTop: "20px",
  padding: "16px",
  border: "1px solid #eee",
  borderRadius: "10px",
};
