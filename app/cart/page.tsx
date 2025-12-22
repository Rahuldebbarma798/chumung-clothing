"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

/* ================= STYLES ================= */

const itemBox = {
  marginTop: "16px",
  padding: "14px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const controls = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const btn = {
  padding: "6px 10px",
  border: "1px solid #000",
  background: "#fff",
  cursor: "pointer",
};

const removeBtn = {
  border: "none",
  background: "none",
  color: "#999",
  cursor: "pointer",
};

const checkoutBtn = {
  display: "block",
  marginTop: "24px",
  padding: "14px",
  textAlign: "center" as const,
  background: "#000",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
};

/* ================= PAGE ================= */

export default function CartPage() {
  const { cart, increase, decrease, remove } = useCart();

  return (
    <main style={{ padding: "16px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && (
        <p style={{ marginTop: "20px" }}>Your cart is empty.</p>
      )}

      {cart.map((item) => (
        <div key={item.id} style={itemBox}>
          <div>
            <strong>{item.name}</strong>
          </div>

          <div style={controls}>
            <button onClick={() => decrease(item.id)} style={btn}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => increase(item.id)} style={btn}>+</button>
          </div>

          <button onClick={() => remove(item.id)} style={removeBtn}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <Link href="/checkout" style={checkoutBtn}>
          Proceed to Checkout
        </Link>
      )}
    </main>
  );
}
