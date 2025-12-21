import Link from "next/link";

export default function ProductsPage({
  params,
}: {
  params: { page: string };
}) {
  const page = Number(params.page);

  return (
    <main style={{ padding: "16px" }}>
      <h1>Products — Page {page}</h1>

      <section style={grid}>
        {Array.from({ length: 6 }).map((_, i) => {
          const productId = (page - 1) * 6 + i + 1;

          return (
            <div key={productId} style={card}>
              {/* CLICKABLE PRODUCT */}
              <Link
                href={`/product/${productId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={imageBox}>Product Image</div>
                <p>Product {productId}</p>
              </Link>

              {/* ACTION */}
              <button style={btn}>Add to Cart</button>
            </div>
          );
        })}
      </section>

      {/* PAGINATION */}
      <div style={pagination}>
        <a href="/products/1" style={pageBtn}>1</a>
        <a href="/products/2" style={pageBtn}>2</a>
        <a href="/products/3" style={pageBtn}>3</a>
        <a href={`/products/${page + 1}`} style={pageBtn}>Next →</a>
      </div>
    </main>
  );
}

/* styles */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "14px",
};

const card = {
  padding: "14px",
  background: "#fff",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const imageBox = {
  height: "160px",
  background: "#e2ddd6",
  borderRadius: "6px",
  marginBottom: "8px",
};

const btn = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const pagination = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "30px",
};

const pageBtn = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  textDecoration: "none",
  color: "black",
};
