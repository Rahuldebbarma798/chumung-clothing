import Link from "next/link";

const TOTAL_PAGES = 3;

export default function ProductsPage({
  params,
}: {
  params: { page: string };
}) {
  const page = Number(params.page);

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        Products — Page {page}
      </h1>

      {/* PRODUCTS */}
      <section style={grid}>
        {Array.from({ length: 6 }).map((_, i) => {
          const productId = (page - 1) * 6 + i + 1;

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
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <Link
              key={pageNum}
              href={`/products/${pageNum}`}
              style={page === pageNum ? activePage : pageBtn}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "14px",
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
  marginTop: "36px",
  display: "flex",
  justifyContent: "center",
  gap: "14px",
};

const pageBtn = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  textDecoration: "none",
  color: "#000",
};

const activePage = {
  padding: "8px 12px",
  border: "1px solid #000",
  background: "#000",
  color: "#fff",
  textDecoration: "none",
};
