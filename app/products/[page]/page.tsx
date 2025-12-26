"use client";

import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const { products } = useProducts();
  const params = useParams();
  const searchParams = useSearchParams();

  const page = Number(params.page || 1);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  const ITEMS_PER_PAGE = 12;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  if (products.length === 0) {
    return <p style={{ padding: 24 }}>Loading products…</p>;
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1 style={title}>
        {query ? `Search: "${query}"` : "Products"}
      </h1>

      {paginated.length === 0 ? (
        <p style={{ color: "#777" }}>No products found.</p>
      ) : (
        <div style={grid}>
          {paginated.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              style={card}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={image}
              />
              <div style={name}>{product.name}</div>
              <div style={price}>₹{product.price}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const title = {
  fontSize: "22px",
  marginBottom: "20px",
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

const image = {
  width: "100%",
  height: "220px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};

const name = {
  marginTop: "8px",
  fontSize: "14px",
};

const price = {
  fontSize: "13px",
  color: "#666",
};
