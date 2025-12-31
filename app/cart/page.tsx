"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { cart, increase, decrease, remove } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main style={page}>
      <h1 style={title}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ color: "#777" }}>
          Your cart is empty.{" "}
          <Link href="/" style={{ textDecoration: "underline" }}>
            Continue shopping
          </Link>
        </p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div style={list}>
            {cart.map((item) => (
              <div key={item.id} style={row}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={image}
                />

                <div style={info}>
                  <div style={name}>{item.name}</div>
                  <div style={price}>₹{item.price}</div>

                  <div style={qtyRow}>
                    <button
                      style={qtyBtn}
                      onClick={() => decrease(item.id)}
                    >
                      −
                    </button>
                    <span style={qty}>{item.quantity}</span>
                    <button
                      style={qtyBtn}
                      onClick={() => increase(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  style={removeBtn}
                  onClick={() => remove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div style={orderSummary}>
            <h3 style={summaryTitle}>Order Summary</h3>

            {cart.map((item) => (
              <div key={item.id} style={summaryItem}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div style={summaryDivider} />

            <div style={summaryItem}>
              <strong>Subtotal</strong>
              <strong>₹{total}</strong>
            </div>
          </div>

          {/* CHECKOUT */}
          <div style={checkoutWrap}>
            <Link href="/checkout" style={checkoutBtn}>
              Proceed to Checkout →
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "32px 16px",
  maxWidth: "900px",
  margin: "0 auto",
};

const title = {
  fontSize: "22px",
  fontWeight: 600,
  marginBottom: "28px",
  textAlign: "left" as const,
};

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "18px",
};

const row = {
  display: "flex",
  gap: "16px",
  padding: "16px",
  borderRadius: "18px",
  border: "1px solid #eee",
  background: "#fafafa",
  alignItems: "center",
};

const image = {
  width: "90px",
  height: "120px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};

const info = {
  flex: 1,
};

const name = {
  fontSize: "15px",
  fontWeight: 500,
  marginBottom: "4px",
};

const price = {
  fontSize: "13px",
  color: "#666",
  marginBottom: "10px",
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const qtyBtn = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const qty = {
  fontSize: "14px",
};

const removeBtn = {
  background: "none",
  border: "none",
  color: "#ff3b30",
  fontSize: "13px",
  cursor: "pointer",
};

const orderSummary = {
  marginTop: "32px",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #eee",
  background: "#fff",
};

const summaryTitle = {
  fontSize: "15px",
  fontWeight: 500,
  marginBottom: "14px",
};

const summaryItem = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  marginBottom: "8px",
};

const summaryDivider = {
  height: "1px",
  background: "#eee",
  margin: "12px 0",
};

const checkoutWrap = {
  marginTop: "28px",
};

const checkoutBtn = {
  display: "block",
  textAlign: "center" as const,
  padding: "16px",
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
};
