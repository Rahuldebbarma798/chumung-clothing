"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

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
          <div style={items}>
            {cart.map((item) => (
              <div key={item.id} style={card}>
                {/* IMAGE CLICKABLE */}
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={image}
                  />
                </Link>

                {/* INFO */}
                <div style={info}>
                  <div style={name}>{item.name}</div>
                  <div style={price}>₹{item.price}</div>

                  <div style={qtyRow}>
                    <button
                      onClick={() => decrease(item.id)}
                      style={qtyBtn}
                    >
                      −
                    </button>

                    <span style={qty}>{item.quantity}</span>

                    <button
                      onClick={() => increase(item.id)}
                      style={qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div style={right}>
                  <div style={subtotal}>
                    ₹{item.price * item.quantity}
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    style={removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT BAR (SINGLE, FLEXIBLE) */}
          <div style={checkoutWrap}>
            <div style={totalText}>
              Total: <strong>₹{total}</strong>
            </div>

            <Link href="/checkout" style={checkoutBtn}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "24px 16px",
  maxWidth: "900px",
  margin: "0 auto",
};

const title = {
  fontSize: "22px",
  fontWeight: 500,
  marginBottom: "20px",
  textAlign: "left" as const,
};

const empty = {
  color: "#777",
};

const items = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const card = {
  display: "flex",
  gap: "14px",
  padding: "14px",
  borderRadius: "16px",
  border: "1px solid #eee",
  background: "#fff",
};

const image = {
  width: "88px",
  height: "110px",
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

const price = {
  fontSize: "13px",
  color: "#666",
  marginTop: "4px",
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "10px",
};

const qtyBtn = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const qty = {
  fontSize: "14px",
};

const right = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  justifyContent: "space-between",
};

const subtotal = {
  fontSize: "14px",
  fontWeight: 500,
};

const removeBtn = {
  background: "none",
  border: "none",
  color: "#ff3b30",
  fontSize: "12px",
  cursor: "pointer",
};

const checkoutWrap = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginTop: "28px",
  paddingTop: "16px",
  borderTop: "1px solid #eee",
};

const totalText = {
  fontSize: "15px",
};

const checkoutBtn = {
  padding: "12px 20px",
  background: "#000",
  color: "#fff",
  borderRadius: "12px",
  textDecoration: "none",
  fontSize: "14px",
};
