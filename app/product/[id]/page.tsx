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
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (products.length === 0) {
    return <p style={{ padding: 24 }}>Loading product…</p>;
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p style={{ padding: 24 }}>Product not found</p>;
  }

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
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main style={page}>
      {/* MAIN IMAGE */}
      <div style={imageWrap}>
        <img
          src={optimizeCloudinary(product.images[activeImage], 900)}
          style={mainImage}
        />
      </div>

      {/* THUMBNAILS */}
      {product.images.length > 1 && (
        <div style={thumbRow}>
          {product.images.map((img, i) => (
            <img
              key={i}
              src={optimizeCloudinary(img, 150)}
              style={{
                ...thumb,
                border:
                  activeImage === i
                    ? "2px solid #000"
                    : "1px solid #ddd",
              }}
              onClick={() => setActiveImage(i)}
            />
          ))}
        </div>
      )}

      {/* PRODUCT INFO */}
      <div style={info}>
        <div style={topRow}>
          <h1 style={title}>{product.name}</h1>
          <button
            style={heartBtn}
            onClick={() =>
              toggleWishlist({
                id: product.id,
                name: product.name,
                image: product.images[0],
                price: product.price,
              })
            }
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

        {/* ADD TO CART */}
        <button
          style={{
            ...cartBtn,
            background: added ? "#2ecc71" : "#000",
          }}
          onClick={handleAddToCart}
        >
          {added ? "Added ✓" : "Add to Cart"}
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

const mainImage = {
  width: "100%",
  height: "70vh",
  objectFit: "cover" as const,
};

const thumbRow = {
  display: "flex",
  gap: "10px",
  padding: "12px",
};

const thumb = {
  width: "70px",
  height: "70px",
  objectFit: "cover" as const,
  borderRadius: "10px",
  cursor: "pointer",
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
