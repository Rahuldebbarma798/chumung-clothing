"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "../context/ProductContext";

export default function SearchPage() {
  const { products } = useProducts();
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={page}>
      <h1 style={title}>Search</h1>

      {/* SEARCH BAR */}
      <div style={searchWrap}>
        <span style={searchIcon}>⌕</span>

        <input
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={searchInput}
        />
      </div>

      {/* RESULTS */}
      {query && (
        <section style={grid}>
          {filtered.length === 0 && (
            <p style={empty}>No products found.</p>
          )}

          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              style={card}
            >
              <img
                src={p.images[0]}
                alt={p.name}
                style={image}
              />
              <div style={name}>{p.name}</div>
              <div style={price}>₹{p.price}</div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "24px 16px",
};

const title = {
  textAlign: "center" as const,
  fontSize: "18px",
  marginBottom: "16px",
};

/* SEARCH */

const searchWrap = {
  position: "relative" as const,
  maxWidth: "420px",
  margin: "0 auto 36px",
};

const searchIcon = {
  position: "absolute" as const,
  top: "50%",
  left: "16px",
  transform: "translateY(-50%)",
  fontSize: "14px",
  color: "#888",
  pointerEvents: "none" as const,
};

const searchInput = {
  width: "100%",
  padding: "14px 16px 14px 44px",
  fontSize: "14px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  outline: "none",
};

/* RESULTS */

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

const empty = {
  gridColumn: "1 / -1",
  textAlign: "center" as const,
  color: "#777",
  fontSize: "14px",
};
