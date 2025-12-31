"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import { useRef } from "react";

export default function ProductPage() {
  const params = useParams();
  const id = String(params.id);

  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const sliderRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) {
    return <p style={{ padding: 24 }}>Loading product…</p>;
  }

  const product = products.find((p) => String(p.id) === id);

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

  const price = Number(product.price) || 0;
  const image = product.images?.[0] || "";

  return (
    <main style={page}>
      {/* IMAGE SLIDER */}
      <div ref={sliderRef} style={slider}>
        {product.images.map((img, i) => (
          <div key={i} style={slide}>
            <img src={img} alt={product.name} style={imageStyle} />
          </div>
        ))}
      </div>

      {/* THUMBNAILS */}
      <div style={thumbRow}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
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
                id: String(product.id),
                name: product.name,
                image,
                price,
              })
            }
            style={heartBtn}
          >
            <Heart
              size={22}
              fill={isWishlisted(String(product.id)) ? "#000" : "none"}
            />
          </button>
        </div>

        <p style={priceStyle}>₹{price}</p>

        <button
  style={cartBtn}
  onClick={() =>
    addToCart({
      id: product.id,                 // string UUID
      name: product.name,
      image: product.images[0],        // ✅ REQUIRED
      price: product.price,            // ✅ REQUIRED
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
};

const slide = {
  minWidth: "100%",
  scrollSnapAlign: "center" as const,
};

const imageStyle = {
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

const priceStyle = {
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
