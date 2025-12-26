"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import { useRef } from "react";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const sliderRef = useRef<HTMLDivElement>(null);

  // ⏳ Loading state
  if (products.length === 0) {
    return <p style={{ padding: 24 }}>Loading product…</p>;
  }

  // 🔍 Find product
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p style={{ padding: 24 }}>Product not found</p>;
  }

  function scrollTo(index: number) {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  }

  return (
    <main style={page}>
      {/* IMAGE SLIDER */}
      <div ref={sliderRef} style={slider}>
        {product.images.map((img, i) => (
          <div key={i} style={slide}>
            <img src={img} style={image} />
          </div>
        ))}
      </div>

      {/* THUMBNAILS */}
      <div style={thumbRow}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={thumb}
            onClick={() => scrollTo(i)}
          />
        ))}
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
              fill={isWishlisted(product.id) ? "black" : "none"}
            />
          </button>
        </div>

        <p style={price}>₹{product.price}</p>

        {/* ✅ FIXED ADD TO CART BUTTON */}
        <button
          style={cartBtn}
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              image: product.images[0],
              price: product.price,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  paddingBottom: "80px",
};

const slider = {
  display: "flex",
  overflowX: "auto" as const,
  scrollSnapType: "x mandatory" as const,
  scrollbarWidth: "none" as const,
};

const slide = {
  minWidth: "100%",
  scrollSnapAlign: "center" as const,
};

const image = {
  width: "100%",
  height: "70vh",
  objectFit: "cover" as const,
};

const thumbRow = {
  display: "flex",
  gap: "10px",
  padding: "12px",
  overflowX: "auto" as const,
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
