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

  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  if (products.length === 0) {
    return <p style={{ padding: 24 }}>Loading product…</p>;
  }

  const found = products.find((p) => p.id === id);

  if (!found) {
    return <p style={{ padding: 24 }}>Product not found</p>;
  }

  const product = found; // ✅ TS-safe

function handleAddToCart() {
  if (product.sizes.length > 0 && !selectedSize) {
    alert("Please select a size");
    return;
  }

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    size: selectedSize, // ✅ ALWAYS string
  });

  setAdded(true);
  setTimeout(() => setAdded(false), 1500);
}


  return (
    <main style={page}>
      {/* PRODUCT IMAGE */}
      <div style={imageWrap}>
        <img
          src={optimizeCloudinary(product.images[0], 900)}
          alt={product.name}
          style={image}
        />
      </div>

      {/* PRODUCT INFO */}
      <div style={info}>
        <div style={topRow}>
          <h1 style={title}>{product.name}</h1>

          <button
            onClick={() =>
              toggleWishlist({
                id: product.id,
                name: product.name,
                image: product.images[0],
                price: product.price,
              })
            }
            style={heartBtn}
          >
            <Heart
              size={22}
              fill={isWishlisted(product.id) ? "#000" : "none"}
            />
          </button>
        </div>

        <p style={price}>₹{product.price}</p>

        {/* SIZE SELECT */}
        {product.sizes.length > 0 && (
          <div style={sizeWrap}>
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                style={{
                  ...sizeBtn,
                  border:
                    selectedSize === s
                      ? "1px solid #000"
                      : "1px solid #ddd",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <button style={cartBtn} onClick={handleAddToCart}>
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  paddingBottom: "80px",
};

const imageWrap = {
  width: "100%",
};

const image = {
  width: "100%",
  height: "70vh",
  objectFit: "cover" as const,
};

const info = {
  padding: "16px",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const title = {
  fontSize: "20px",
  fontWeight: 500,
};

const price = {
  fontSize: "18px",
  margin: "12px 0",
};

const sizeWrap = {
  display: "flex",
  gap: "10px",
  marginBottom: "16px",
  flexWrap: "wrap" as const,
};

const sizeBtn = {
  padding: "10px 14px",
  borderRadius: "999px",
  background: "#fff",
  cursor: "pointer",
  fontSize: "13px",
};

const cartBtn = {
  width: "100%",
  padding: "14px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
};

const heartBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
};
