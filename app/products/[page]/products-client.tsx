"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import { optimizeCloudinary } from "@/app/lib/image";

export default function ProductsClient() {
  const { products } = useProducts();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const searchParams = useSearchParams();
  const router = useRouter();

  const audience = searchParams.get("audience");
  const type = searchParams.get("type");
  const sale = searchParams.get("sale") === "true";

  const filtered = products.filter((p) => {
    if (audience && !p.audience?.includes(audience)) return false;
    if (type && p.type !== type) return false;
    if (sale && !p.on_sale) return false;
    return true;
  });

  function setParam(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`/products/1?${params.toString()}`);
  }

  return (
    <main style={{ padding: "24px 16px" }}>
      <div style={filters}>
        <button style={btn} onClick={() => setParam("sale")}>ALL</button>
        <button style={btn} onClick={() => setParam("sale", "true")}>SALE</button>
        {["jeans", "tshirt", "hoodie"].map((t) => (
          <button key={t} style={btn} onClick={() => setParam("type", t)}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={grid}>
        {filtered.map((p) => {
          const finalPrice = p.on_sale
            ? Math.round(p.price * (1 - p.discount_percent / 100))
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
                  <Heart size={18} fill={isWishlisted(p.id) ? "#000" : "none"} />
                </button>

                <img
                  src={optimizeCloudinary(p.images[0], 500)}
                  style={img}
                  alt={p.name}
                />
              </div>

              <div style={name}>{p.name}</div>

              {p.on_sale ? (
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
    </main>
  );
}

/* styles */
const filters = { display: "flex", gap: 10, marginBottom: 20, overflowX: "auto" as const };
const btn = { padding: "8px 14px", borderRadius: 10, border: "1px solid #ddd", background: "#fff" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 18 };
const card = { textDecoration: "none", color: "#000" };
const img = { width: "100%", height: 200, objectFit: "cover" as const, borderRadius: 14 };
const name = { marginTop: 10, fontSize: 14 };
const price = { fontSize: 13 };
const salePrice = { fontSize: 14, fontWeight: 600 };
const oldPrice = { fontSize: 12, color: "#999", textDecoration: "line-through", marginLeft: 6 };
const heartBtn = { position: "absolute" as const, top: 10, right: 10, background: "#fff", borderRadius: "50%", border: "none", padding: 6 };
