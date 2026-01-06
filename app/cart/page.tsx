"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { optimizeCloudinary } from "@/app/lib/image";

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
          <div style={list}>
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} style={row}>
                {/* IMAGE */}
                <img
                  src={optimizeCloudinary(item.image, 200)}
                  alt={item.name}
                  style={image}
                />

                {/* INFO */}
                <div style={info}>
                  <div style={name}>{item.name}</div>
                  <div style={meta}>Size: {item.size}</div>
                  <div style={price}>₹{item.price}</div>

                  {/* QTY */}
                  <div style={qtyRow}>
                    <button
                      style={qtyBtn}
                      onClick={() => decrease(item.id, item.size)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      style={qtyBtn}
                      onClick={() => increase(item.id, item.size)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  style={removeBtn}
                  onClick={() => remove(item.id, item.size)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div style={summary}>
            <div style={totalRow}>
              <span>Total</span>
              <span>₹{total}</span>
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
  padding: "24px 16px 100px",
  maxWidth: "720px",
  margin: "0 auto",
};

const title = {
  fontSize: "20px",
  fontWeight: 500,
  marginBottom: "24px",
  textAlign: "left" as const,
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
  gap: "14px",
  padding: "14px",
  borderRadius: "16px",
  border: "1px solid #eee",
  background: "#fafafa",
  alignItems: "center",
};

const image = {
  width: "80px",
  height: "100px",
  objectFit: "cover" as const,
  borderRadius: "12px",
};

const info = {
  flex: 1,
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
  fontSize: "13px",
  marginTop: "6px",
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
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};

const removeBtn = {
  background: "none",
  border: "none",
  color: "#ff3b30",
  fontSize: "12px",
  cursor: "pointer",
};

const summary = {
  marginTop: "32px",
  paddingTop: "20px",
  borderTop: "1px solid #eee",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
  fontWeight: 500,
  marginBottom: "20px",
};

const checkoutBtn = {
  display: "block",
  textAlign: "center" as const,
  padding: "14px",
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
};
