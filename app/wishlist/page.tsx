"use client";

import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <main style={{ padding: "24px 16px" }}>
      <h1>Wishlist</h1>

      {wishlist.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#777" }}>
          No items in wishlist.
        </p>
      ) : (
        <div style={grid}>
          {wishlist.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              style={card}
            >
              <img src={item.image} style={image} />
              <div>{item.name}</div>
              <div style={{ color: "#666" }}>₹{item.price}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

/* ===== STYLES ===== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "18px",
};

const card = {
  textDecoration: "none",
  color: "#000",
};

const image = {
  width: "100%",
  height: "200px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};
