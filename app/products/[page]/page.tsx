"use client";

import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";


const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage({
  params,
}: {
  params: { page: string };
}) {
  const { products } = useProducts();
  const currentPage = Number(params.page) || 1;

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;

  const visible = products.slice(start, end);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <main style={{ padding: "24px 16px" }}>
      <h1 style={{ marginBottom: "24px" }}>
        Products — Page {currentPage}
      </h1>

      <section style={grid}>
        {visible.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} style={card}>
            <img src={p.image} style={image} />
            <p style={name}>{p.name}</p>
            <p style={price}>₹{p.price}</p>
          </Link>
        ))}
      </section>

      <div style={pagination}>
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <Link
              key={page}
              href={`/products/${page}`}
              style={{
                ...pageBtn,
                background: page === currentPage ? "#000" : "#fff",
                color: page === currentPage ? "#fff" : "#000",
              }}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

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

const pagination = {
  marginTop: "36px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const pageBtn = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  textDecoration: "none",
  borderRadius: "6px",
  fontSize: "14px",
};
