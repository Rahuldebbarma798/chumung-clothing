"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main style={page}>
      <h1 style={title}>Order Summary</h1>

      {cart.length === 0 ? (
        <p style={{ color: "#777" }}>Your cart is empty.</p>
      ) : (
        <>
          {/* PRODUCTS */}
          <div style={list}>
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} style={row}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={90}
                  style={img}
                />

                <div style={{ flex: 1 }}>
                  <div style={name}>{item.name}</div>
                  <div style={meta}>
                    Size: {item.size} · Qty: {item.quantity}
                  </div>
                </div>

                <div style={price}>
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div style={summary}>
            <div style={sumRow}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div style={sumRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div style={{ ...sumRow, fontWeight: 600 }}>
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          {/* PLACE ORDER */}
          <button
            style={btn}
            onClick={() => alert("Payment integration next 👀")}
          >
            Place Order →
          </button>
        </>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "24px 16px 120px",
  maxWidth: "820px",
  margin: "0 auto",
};

const title = {
  fontSize: "20px",
  fontWeight: 500,
  marginBottom: "24px",
};

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const row = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
};

const img = {
  borderRadius: "12px",
  objectFit: "cover" as const,
};

const name = {
  fontSize: "14px",
  fontWeight: 500,
};

const meta = {
  fontSize: "12px",
  color: "#777",
  marginTop: "4px",
};

const price = {
  fontSize: "14px",
  fontWeight: 500,
};

const summary = {
  marginTop: "32px",
  borderTop: "1px solid #eee",
  paddingTop: "16px",
};

const sumRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "14px",
};

const btn = {
  marginTop: "28px",
  width: "100%",
  padding: "16px",
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  border: "none",
  fontSize: "15px",
  cursor: "pointer",
};
