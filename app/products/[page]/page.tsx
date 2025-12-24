"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";

const CATEGORIES = [
  { key: "all", label: "All", image: "/cat-all.jpg" },
  { key: "men", label: "Men", image: "/cat-men.jpg" },
  { key: "women", label: "Women", image: "/cat-women.jpg" },
  { key: "oversize", label: "Oversize", image: "/cat-oversize.jpg" },
  { key: "jeans", label: "Jeans", image: "/cat-jeans.jpg" },
  { key: "jacket", label: "Jacket", image: "/cat-jacket.jpg" },
];

const LOAD_COUNT = 6;

export default function ProductsPage() {
  const { products } = useProducts();
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(LOAD_COUNT);

  const filtered =
    category === "all"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === category
        );

  const shown = filtered.slice(0, visible);

  return (
    <main style={{ padding: "16px" }}>
      {/* CATEGORY STRIP */}
      <section style={catStrip}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => {
              setCategory(c.key);
              setVisible(LOAD_COUNT);
            }}
            style={{
              ...catCard,
              opacity: category === c.key ? 1 : 0.6,
            }}
          >
            <img src={c.image} style={catImg} />
            <span>{c.label}</span>
          </button>
        ))}
      </section>

      {/* PRODUCTS GRID */}
      {shown.length === 0 ? (
        <p style={{ marginTop: "40px", color: "#777" }}>
          No products found.
        </p>
      ) : (
        <section style={grid}>
          {shown.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} style={card}>
              <img src={p.images[0]} style={image} />
              <div style={name}>{p.name}</div>
              <div style={price}>₹{p.price}</div>
            </Link>
          ))}
        </section>
      )}

      {/* LOAD MORE */}
      {visible < filtered.length && (
        <button
          onClick={() => setVisible((v) => v + LOAD_COUNT)}
          style={loadMore}
        >
          View More
        </button>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const catStrip = {
  display: "flex",
  gap: "12px",
  overflowX: "auto" as const,
  paddingBottom: "16px",
};

const catCard = {
  minWidth: "110px",
  background: "none",
  border: "none",
  textAlign: "center" as const,
  cursor: "pointer",
};

const catImg = {
  width: "100%",
  height: "80px",
  objectFit: "cover" as const,
  borderRadius: "12px",
  marginBottom: "6px",
};

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

const name = {
  marginTop: "10px",
  fontSize: "14px",
};

const price = {
  fontSize: "13px",
  color: "#666",
};

const loadMore = {
  margin: "40px auto",
  display: "block",
  padding: "12px 20px",
  borderRadius: "999px",
  border: "1px solid #000",
  background: "#fff",
  cursor: "pointer",
};
