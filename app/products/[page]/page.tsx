"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import { optimizeCloudinary } from "@/app/lib/image";

export default function ProductsPage() {
  const { products } = useProducts();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const searchParams = useSearchParams();

  const category = searchParams.get("category")?.toLowerCase();

  const filtered = products.filter((p) => {
    if (!category) return true;
    if (!p.category) return false;
    return p.category.toLowerCase() === category;
  });

  return (
    <main style={{ padding: "24px 16px" }}>
      <div style={grid}>
        {filtered.map((p) => {
          const onSale = Boolean(p.on_sale);
          const discount = Number(p.discount_percent || 0);

          const finalPrice =
            onSale && discount > 0
              ? Math.round(p.price * (1 - discount / 100))
              : p.price;

          return (
            <Link key={p.id} href={`/product/${p.id}`} style={card}>
              <div style={{ position: "relative" }}>
                <button
                  style={heartBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist({
                      id: p.id,
                      name: p.name,
                      image: p.images[0],
                      price: finalPrice,
                    });
                  }}
                >
                  <Heart
                    size={18}
                    fill={isWishlisted(p.id) ? "#000" : "none"}
                  />
                </button>

                <img
                  src={optimizeCloudinary(p.images[0], 500)}
                  alt={p.name}
                  style={img}
                />

                {onSale && discount > 0 && (
                  <span style={saleBadge}>-{discount}%</span>
                )}
              </div>

              <div style={name}>{p.name}</div>

              {onSale && discount > 0 ? (
                <div>
                  <span style={salePrice}>₹{finalPrice}</span>
                  <span style={oldPrice}>₹{p.price}</span>
                </div>
              ) : (
                <div style={price}>₹{p.price}</div>
              )}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: 40, color: "#777" }}>
          No products found in this category.
        </p>
      )}
    </main>
  );
}

/* ================= STYLES ================= */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: 18,
};

const card = {
  textDecoration: "none",
  color: "#000",
};

const img = {
  width: "100%",
  height: 200,
  objectFit: "cover" as const,
  borderRadius: 14,
};

const name = {
  marginTop: 10,
  fontSize: 14,
};

const price = {
  fontSize: 13,
};

const salePrice = {
  fontSize: 14,
  fontWeight: 600,
};

const oldPrice = {
  fontSize: 12,
  color: "#999",
  textDecoration: "line-through",
  marginLeft: 6,
};

const saleBadge = {
  position: "absolute" as const,
  top: 10,
  left: 10,
  background: "#000",
  color: "#fff",
  fontSize: "11px",
  padding: "4px 6px",
  borderRadius: "6px",
};

const heartBtn = {
  position: "absolute" as const,
  top: 10,
  right: 10,
  background: "#fff",
  borderRadius: "50%",
  border: "none",
  padding: 6,
};
