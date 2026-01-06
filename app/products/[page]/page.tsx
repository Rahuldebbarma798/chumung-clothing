"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";

export default function ProductsPage() {
  const { page } = useParams() as { page: string };
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const { products } = useProducts();

  const filteredProducts = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query)
      )
    : products;

  return (
    <main style={wrap}>
      {query && (
        <p style={resultText}>
          Showing results for <b>“{query}”</b>
        </p>
      )}

      {filteredProducts.length === 0 ? (
        <p style={{ color: "#777" }}>No products found.</p>
      ) : (
        <div style={grid}>
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              style={card}
            >
              <img src={p.images?.[0]} style={img} />
              <div style={name}>{p.name}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const wrap = {
  padding: "96px 16px 40px",
};

const resultText = {
  marginBottom: "18px",
  fontSize: "14px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: "18px",
};

const card = {
  textDecoration: "none",
  color: "#000",
};

const img = {
  width: "100%",
  height: "220px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};

const name = {
  marginTop: "10px",
  fontSize: "14px",
};
