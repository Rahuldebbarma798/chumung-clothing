"use client";

import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import { useProducts } from "./context/ProductContext";

export default function HomePage() {
  const { products } = useProducts();

  return (
    <main>
      {/* CATEGORY STRIP */}
      <section style={categoryWrap}>
        <Link href="/men" style={categoryCard}>
          <img src="/men.jpg" alt="Men" style={categoryImg} />
          <span>MEN</span>
        </Link>

        <Link href="/women" style={categoryCard}>
          <img src="/women.jpg" alt="Women" style={categoryImg} />
          <span>WOMEN</span>
        </Link>
      </section>

      {/* HERO */}
      <HeroSlider />

      {/* PRODUCTS */}
      <section style={productSection}>
        <h2 style={sectionTitle}>Featured Products</h2>

        {products.length === 0 ? (
          <p style={{ color: "#777" }}>No products yet.</p>
        ) : (
          <div style={productGrid}>
            {products.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                style={productCard}
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  style={productImg}
                />
                <div style={productName}>{p.name}</div>
                <div style={productPrice}>₹{p.price}</div>
              </Link>
            ))}
          </div>
        )}

        {products.length > 4 && (
          <Link href="/products/1" style={viewMore}>
            View More →
          </Link>
        )}
      </section>

      {/* BRAND VIDEO */}
      <section style={videoWrap}>
        <video
          src="/brand.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          style={video}
        />
      </section>
    </main>
  );
}

/* ================= STYLES ================= */

const categoryWrap = {
  display: "flex",
  gap: "12px",
  padding: "16px",
};

const categoryCard = {
  flex: 1,
  textDecoration: "none",
  color: "#000",
  textAlign: "center" as const,
  fontSize: "13px",
  letterSpacing: "0.2em",
};

const categoryImg = {
  width: "100%",
  height: "120px",
  objectFit: "cover" as const,
  borderRadius: "10px",
  marginBottom: "8px",
};

const productSection = {
  padding: "40px 16px",
};

const sectionTitle = {
  marginBottom: "18px",
  fontSize: "18px",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "18px",
};

const productCard = {
  textDecoration: "none",
  color: "#000",
};

const productImg = {
  width: "100%",
  height: "200px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};

const productName = {
  marginTop: "10px",
  fontSize: "14px",
};

const productPrice = {
  fontSize: "13px",
  color: "#666",
};

const viewMore = {
  display: "inline-block",
  marginTop: "28px",
  textDecoration: "none",
  color: "#000",
  fontSize: "14px",
};

const videoWrap = {
  marginTop: "52px",
  padding: "0 16px",
};

const video = {
  width: "100%",
  borderRadius: "16px",
};
