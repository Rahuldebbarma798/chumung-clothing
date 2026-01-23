"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import HeroSlider from "./components/HeroSlider";
import { useProducts } from "./context/ProductContext";
import { useCategories } from "./context/CategoryContext";
import { useWishlist } from "./context/WishlistContext";
import { Heart } from "lucide-react";
import { optimizeCloudinary } from "./lib/image";
import AutoPlayVideo from "./components/AutoPlayVideo";

export default function HomePage() {
  const router = useRouter();
  const { products } = useProducts();
  const { categories } = useCategories();
  const { toggleWishlist, isWishlisted } = useWishlist();

  function goToCategory(categoryId?: string) {
    if (!categoryId) {
      router.push("/products/1");
    } else {
      router.push(`/products/1?category=${categoryId}`);
    }
  }

  return (
    <main>
      {/* CATEGORY STRIP */}
      <section style={categoryStrip}>
        <CategoryTextButton label="ALL" onClick={() => goToCategory()} />

        {categories.map((c) => (
          <CategoryTextButton
            key={c.id}
            label={c.name.toUpperCase()}
            onClick={() => goToCategory(c.id)}
          />
        ))}
      </section>

      {/* HERO */}
      <HeroSlider />

      {/* PRODUCTS PREVIEW */}
      <section style={productSection}>
        <h2 style={sectionTitle}>Featured</h2>

        <div style={productGrid}>
          {products.slice(0, 6).map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} style={productCard}>
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
                  src={optimizeCloudinary(p.images[0], 500)}
                  alt={p.name}
                  style={productImg}
                />
              </div>

              <div style={productName}>{p.name}</div>
              <div style={productPrice}>₹{p.price}</div>
            </Link>
          ))}
        </div>

        <div style={viewMoreWrap}>
          <Link href="/products/1" style={viewMoreBtn}>
            View More →
          </Link>
        </div>
      </section>

      

      {/* BRAND VIDEO — FIXED */}
      <section style={videoWrap}>
        <div style={videoContainer}>
          <video
            src="/brand.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            style={video}
          />
        </div>

        <p style={brandDesc}>
          CHUMUNG CLOTHING is a curated thrift fashion brand focused on limited,
          handpicked pieces. No restocks. No returns.
        </p>
      </section>
    </main>
  );
}

/* ================= COMPONENT ================= */

function CategoryTextButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={categoryBtn}>
      {label}
    </button>
  );
}

/* ================= STYLES ================= */

/* CATEGORY */

const categoryStrip = {
  display: "flex",
  gap: "12px",
  padding: "16px",
  overflowX: "auto" as const,
};

const categoryBtn = {
  height: "44px",
  padding: "0 16px",
  borderRadius: "12px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ddd",
  background: "#fff",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  whiteSpace: "nowrap" as const,
};

/* PRODUCTS */

const productSection = { padding: "32px 16px" };
const sectionTitle = { marginBottom: "18px", fontSize: "18px" };

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "18px",
};

const productCard = { textDecoration: "none", color: "#000" };

const cardWrap = { position: "relative" as const };

const heartBtn = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",
  background: "rgba(255,255,255,0.9)",
  border: "none",
  borderRadius: "50%",
  padding: "6px",
};

const productImg = {
  width: "100%",
  height: "200px",
  objectFit: "cover" as const,
  borderRadius: "14px",
};

const productName = { marginTop: "10px", fontSize: "14px" };
const productPrice = { fontSize: "13px", color: "#666" };

const viewMoreWrap = { marginTop: "32px", textAlign: "center" as const };

const viewMoreBtn = {
  padding: "12px 22px",
  borderRadius: "999px",
  border: "1px solid #000",
  color: "#000",
};

/* VIDEO */

const videoWrap = {
  marginTop: "56px",
  padding: "0 16px 32px",
};

const videoContainer = {
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: "16px",
  overflow: "hidden",
  background: "#000",
};

const video = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const brandDesc = {
  marginTop: "20px",
  maxWidth: "520px",
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#444",
  textAlign: "center" as const,
};



