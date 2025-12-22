import Link from "next/link";
import HeroSlider from "./components/HeroSlider";

export default function Home() {
  return (
    <main style={{ padding: "16px" }}>
      {/* MEN / WOMEN */}
      <section style={categorySection}>
        <Link href="/men" style={categoryCard}>
          <img src="/men.jpg" alt="Men" style={categoryImage} />
          <span style={categoryText}>MEN</span>
        </Link>

        <Link href="/women" style={categoryCard}>
          <img src="/women.jpg" alt="Women" style={categoryImage} />
          <span style={categoryText}>WOMEN</span>
        </Link>
      </section>

      {/* HERO */}
      <HeroSlider />

      {/* PRODUCTS */}
      <section style={grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Link
            key={i}
            href={`/product/${i + 1}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={card}>
              <div style={imageBox}>Product Image</div>
              <p>Product {i + 1}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* VIEW MORE */}
      <div style={viewMoreWrap}>
        <Link href="/products/1" style={viewMoreBtn}>
          View More →
        </Link>
      </div>

      {/* BRAND VIDEO ONLY */}
      <section style={videoSection}>
        <video
          src="/brand.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={brandVideo}
        />
      </section>
    </main>
  );
}

/* ================= STYLES ================= */

const categorySection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "20px",
};

const categoryCard = {
  position: "relative" as const,
  borderRadius: "10px",
  overflow: "hidden",
  textDecoration: "none",
};

const categoryImage = {
  width: "100%",
  height: "120px",
  objectFit: "cover" as const,
};

const categoryText = {
  position: "absolute" as const,
  bottom: "10px",
  left: "10px",
  color: "white",
  fontWeight: 600,
  letterSpacing: "0.1em",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "14px",
  marginTop: "24px",
};

const card = {
  background: "#fff",
  padding: "12px",
  borderRadius: "8px",
};

const imageBox = {
  height: "160px",
  background: "#ddd",
  borderRadius: "6px",
  marginBottom: "8px",
};

const viewMoreWrap = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const viewMoreBtn = {
  display: "inline-block",
  padding: "12px 28px",
  border: "1px solid #000",
  textDecoration: "none",
  fontWeight: 500,
  letterSpacing: "0.08em",
};

/* VIDEO SECTION */

const videoSection = {
  marginTop: "60px",
};

const brandVideo = {
  width: "100%",
  borderRadius: "10px",
};
