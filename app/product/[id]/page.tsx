"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import { useState } from "react";
import { optimizeCloudinary } from "@/app/lib/image";

export default function ProductPage() {
  const { id } = useParams() as { id: string };

  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  if (products.length === 0) {
    return <p style={{ padding: 24 }}>Loading product…</p>;
  }

  const found = products.find((p) => p.id === id);

  if (!found) {
    return <p style={{ padding: 24 }}>Product not found</p>;
  }

  // ✅ NON-NULL PRODUCT (TypeScript-safe)
  const product = found;

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main style={{ paddingBottom: "80px" }}>
      {/* PRODUCT IMAGE */}
      <img
        src={optimizeCloudinary(product.images[0], 900)}
        style={{
          width: "100%",
          height: "70vh",
          objectFit: "cover",
        }}
      />

      {/* PRODUCT INFO */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: 500 }}>
            {product.name}
          </h1>

          <button
            onClick={() =>
              toggleWishlist({
                id: product.id,
                name: product.name,
                image: product.images[0],
                price: product.price,
              })
            }
            style={{ background: "none", border: "none" }}
          >
            <Heart
              size={22}
              fill={isWishlisted(product.id) ? "black" : "none"}
            />
          </button>
        </div>

        <p style={{ fontSize: "18px", margin: "12px 0" }}>
          ₹{product.price}
        </p>

        {/* SIZE SELECT */}
        {product.sizes.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "999px",
                  border:
                    selectedSize === s
                      ? "1px solid #000"
                      : "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            padding: "14px",
            background: added ? "#2ecc71" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
          }}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </main>
  );
}
