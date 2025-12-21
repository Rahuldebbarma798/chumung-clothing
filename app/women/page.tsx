export default function WomenPage() {
  return (
    <main style={{ padding: "30px" }}>
      <h1>Women</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <a href="/product/3" style={{ border: "1px solid #e2ddd6", padding: "20px" }}>
          Jeans
        </a>

        <a href="/product/4" style={{ border: "1px solid #e2ddd6", padding: "20px" }}>
          Oversized Tshirt
        </a>
      </div>
    </main>
  );
}
