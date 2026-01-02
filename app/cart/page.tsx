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
        <p style={empty}>Your cart is empty.</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div style={list}>
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} style={row}>
                {/* IMAGE */}
                <img src={item.image} alt={item.name} style={image} />

                {/* INFO */}
                <div style={info}>
                  <div style={name}>{item.name}</div>

                  {item.size && (
                    <div style={meta}>Size: {item.size}</div>
                  )}

                  <div style={price}>₹{item.price}</div>

                  {/* QUANTITY */}
                  <div style={qtyRow}>
                    <button
                      style={qtyBtn}
                      onClick={() => decrease(item.id, item.size ?? "")}
                    >
                      −
                    </button>

                    <span style={qty}>{item.quantity}</span>

                    <button
                      style={qtyBtn}
                      onClick={() => increase(item.id, item.size ?? "")}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  style={removeBtn}
                  onClick={() => remove(item.id, item.size ?? "")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div style={summary}>
            <div style={summaryRow}>
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

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
  marginBottom: "24px",
};

const empty = {
  color: "#777",
};

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const row = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
  padding: "16px",
  borderRadius: "18px",
  border: "1px solid #eee",
  background: "#fff",
};

const image = {
  width: "90px",
  height: "110px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};

const info = {
  flex: 1,
};

const name = {
  fontSize: "15px",
  fontWeight: 500,
};

const meta = {
  fontSize: "12px",
  color: "#777",
  marginTop: "4px",
};

const price = {
  marginTop: "6px",
  fontSize: "14px",
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
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
  minWidth: "18px",
  textAlign: "center" as const,
};

const removeBtn = {
  background: "none",
  border: "none",
  color: "#ff3b30",
  fontSize: "13px",
  cursor: "pointer",
};

const summary = {
  marginTop: "32px",
  paddingTop: "20px",
  borderTop: "1px solid #eee",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
  marginBottom: "16px",
};

const checkoutBtn = {
  display: "block",
  width: "100%",
  padding: "14px",
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  textAlign: "center" as const,
  textDecoration: "none",
  fontSize: "14px",
};
