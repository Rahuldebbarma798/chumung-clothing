"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

export default function CartPage() {
  const { cart, increase, decrease, remove } = useCart();
  const { products } = useProducts();

  // 🔒 SAFE MERGE CART + PRODUCT DATA
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);

    const price = Number(product?.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return {
      id: item.id,
      name: item.name,
      quantity,
      price,
      image: product?.images?.[0] || "",
      subtotal: price * quantity,
    };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <main style={wrap}>
      <h1 style={title}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p style={empty}>Your cart is empty.</p>
      ) : (
        <>
          <div style={list}>
            {cartItems.map((item) => (
              <div key={item.id} style={row}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={image}
                  />
                )}

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

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increase(item.id)}
                      style={qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={right}>
                  <div style={subtotal}>₹{item.subtotal}</div>
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

          <div style={summary}>
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <Link href="/checkout" style={checkoutBtn}>
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const wrap = {
  padding: "24px 16px",
  maxWidth: "900px",
  margin: "0 auto",
};

const title = {
  fontSize: "22px",
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
  gap: "14px",
  borderBottom: "1px solid #eee",
  paddingBottom: "16px",
  alignItems: "flex-start",
};

const image = {
  width: "90px",
  height: "120px",
  objectFit: "cover" as const,
  borderRadius: "10px",
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

const right = {
  textAlign: "right" as const,
};

const subtotal = {
  fontSize: "14px",
  fontWeight: 500,
};

const removeBtn = {
  marginTop: "8px",
  fontSize: "12px",
  background: "none",
  border: "none",
  color: "#999",
  cursor: "pointer",
};

const summary = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
  fontSize: "16px",
};

const checkoutBtn = {
  display: "block",
  marginTop: "24px",
  padding: "14px",
  textAlign: "center" as const,
  background: "#000",
  color: "#fff",
  borderRadius: "12px",
  textDecoration: "none",
};
