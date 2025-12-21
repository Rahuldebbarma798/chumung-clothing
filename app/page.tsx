import Link from "next/link";
import HeroSlider from "./components/HeroSlider";

export default function Home() {
  return (
    <main style={{ padding: "16px" }}>
      {/* MEN / WOMEN CATEGORY */}
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
        {Array.from({ length: 6 }).map((_, i) => {
          const productId = i + 1;

          return (
            <Link
              key={productId}
              href={`/product/${productId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={card}>
                <div style={imageBox}>Product Image</div>
                <p>Product {productId}</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* PAGINATION */}
      <div style={pagination}>
        <Link href="/" style={pageBtn}>1</Link>
        <Link href="/products/2" style={pageBtn}>2</Link>
        <Link href="/products/3" style={pageBtn}>3</Link>
        <Link href="/products/2" style={pageBtn}>Next →</Link>
      </div>
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

const pagination = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
};

const pageBtn = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  textDecoration: "none",
  color: "black",
};
