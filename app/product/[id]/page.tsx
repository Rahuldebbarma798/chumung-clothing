"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { loggedIn } = useAuth();

  const product = products.find(p => String(p.id) === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return <p style={{ padding: "20px" }}>Product not found.</p>;

  return (
    <main style={{ padding: "24px 16px" }}>
      {/* IMAGE */}
      <img
        src={product.images[activeImage]}
        style={mainImage}
      />

      {/* THUMBNAILS */}
      <div style={thumbRow}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={{
              ...thumb,
              border: i === activeImage ? "2px solid #000" : "1px solid #ddd",
            }}
            onClick={() => setActiveImage(i)}
          />
        ))}
      </div>

      <h1 style={{ marginTop: "20px" }}>{product.name}</h1>
      <p style={{ fontSize: "18px" }}>₹{product.price}</p>

      {/* SIZE SELECT */}
      <div style={{ marginTop: "20px" }}>
        <strong>Select Size</strong>

        <div style={sizeRow}>
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                ...sizeBtn,
                border: selectedSize === size ? "2px solid #000" : "1px solid #ddd",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        style={{
          ...btn,
          opacity: selectedSize ? 1 : 0.5,
        }}
        onClick={() => {
          if (!loggedIn) {
            alert("Please login to add to cart");
            return;
          }
          if (!selectedSize) {
            alert("Please select a size");
            return;
          }

          addToCart({
            id: product.id,
            name: product.name,
            quantity: 1,
            size: selectedSize,
          });
        }}
      >
        Add to Cart
      </button>

      <p style={note}>No returns. All sales final.</p>
    </main>
  );
}

/* ================= STYLES ================= */

const mainImage = {
  width: "100%",
  maxHeight: "520px",
  objectFit: "contain" as const,
  borderRadius: "16px",
  background: "#f5f5f5",
};



const thumbRow = {
  display: "flex",
  gap: "10px",
  marginTop: "12px",
};

const thumb = {
  width: "64px",
  height: "64px",
  objectFit: "contain" as const,
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f5f5f5",
};


const sizeRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const sizeBtn = {
  padding: "8px 14px",
  background: "#fff",
  borderRadius: "8px",
  cursor: "pointer",
};

const btn = {
  marginTop: "24px",
  padding: "14px",
  width: "100%",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
};

const note = {
  marginTop: "18px",
  fontSize: "13px",
  color: "#777",
};
