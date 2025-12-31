"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "../context/ProductContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { products } = useProducts();

  const results =
    query.length > 0
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  function goToProduct(id: string) {
    setQuery("");
    router.push(`/product/${id}`);
  }

  return (
    <div style={wrap}>
      <input
        autoFocus
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={input}
      />

      {results.length > 0 && (
        <div style={dropdown}>
          {results.slice(0, 5).map((p) => (
            <div
              key={p.id}
              style={item}
              onClick={() => goToProduct(p.id)}
            >
              <img
                src={p.images?.[0]}
                alt={p.name}
                style={thumb}
              />
              <div>
                <div style={name}>{p.name}</div>
                <div style={price}>₹{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const wrap = {
  position: "relative" as const,
  maxWidth: "520px",
  margin: "0 auto",
};

const input = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "999px",
  border: "1px solid #e5e5e5",
  fontSize: "15px",
  outline: "none",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const dropdown = {
  position: "absolute" as const,
  top: "56px",
  left: 0,
  right: 0,
  background: "#fff",
  borderRadius: "18px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
  overflow: "hidden",
  zIndex: 9999,
};

const item = {
  display: "flex",
  gap: "14px",
  padding: "12px 16px",
  cursor: "pointer",
  alignItems: "center",
};

const thumb = {
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  objectFit: "cover" as const,
};

const name = {
  fontSize: "14px",
  fontWeight: 500,
};

const price = {
  fontSize: "13px",
  color: "#777",
};
