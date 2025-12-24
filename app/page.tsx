"use client";

import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import { useProducts } from "./context/ProductContext";
import { useWishlist } from "./context/WishlistContext";
import { Heart } from "lucide-react";

export default function HomePage() {
  const { products } = useProducts();
  const { toggleWishlist, isWishlisted } = useWishlist();

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
          <>
            <div style={productGrid}>
              {products.slice(0, 6).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  style={productCard}
                >
                  <div style={cardWrap}>
                    <button
                      style={heartBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist({
                          id: p.id,
                          name: p.name,
                          image: p.images[0],
                          price: p.price,
                        });
                      }}
                    >
                      <Heart
  size={18}
  strokeWidth={1.6}
  fill={isWishlisted(p.id) ? "#000" : "none"}
/>

                    </button>

                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={productImg}
                    />
                  </div>

                  <div style={productName}>{p.name}</div>
                  <div style={productPrice}>₹{p.price}</div>
                </Link>
              ))}
            </div>

            {/* VIEW MORE */}
            <div style={viewMoreWrap}>
              <Link href="/products/1" style={viewMoreBtn}>
                View More →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* BRAND VIDEO */}
      <section style={videoWrap}>
        <video
          src="/brand.mp4"
          muted
          loop
          autoPlay
          playsInline
          style={video}
        />

        <p style={brandDesc}>
          CHUMUNG CLOTHING is a curated thrift fashion brand focused on limited,
          handpicked pieces. No restocks. No returns.
        </p>
      </section>
    </main>
  );
}

/* ================= STYLES (UNCHANGED) ================= */

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

const cardWrap = {
  position: "relative" as const,
};

const heartBtn = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",
  background: "rgba(255,255,255,0.9)",
  border: "none",
  borderRadius: "50%",
  padding: "6px",
  cursor: "pointer",
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

const viewMoreWrap = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const viewMoreBtn = {
  display: "inline-block",
  padding: "12px 22px",
  borderRadius: "999px",
  border: "1px solid #000",
  fontSize: "14px",
  textDecoration: "none",
  color: "#000",
};

const videoWrap = {
  marginTop: "52px",
  padding: "0 16px",
};

const video = {
  width: "100%",
  borderRadius: "16px",
};

const brandDesc = {
  marginTop: "24px",
  maxWidth: "520px",
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#444",
  textAlign: "center" as const,
};
