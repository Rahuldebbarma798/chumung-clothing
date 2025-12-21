"use client";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ padding: "16px" }}>
      <div
        style={{
          height: "260px",
          background: "#e2ddd6",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />

      <h1>Product #{params.id}</h1>
      <p>Thrift item. Limited stock.</p>

      <div style={{ margin: "20px 0" }}>
        <strong>Select Size</strong>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button>S</button>
          <button>M</button>
          <button>L</button>
        </div>
      </div>

      <button style={{ width: "100%", padding: "14px" }}>
        Add to Cart
      </button>

      <p style={{ marginTop: "20px", fontSize: "13px", color: "#6b6b6b" }}>
        No returns. All sales final.
      </p>
    </main>
  );
}
