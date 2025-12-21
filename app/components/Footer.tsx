export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "60px",
        padding: "30px",
        borderTop: "1px solid #e2ddd6",
        background: "#F6F1EA",
        fontSize: "14px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        © CHUMUNG CLOTHING
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
  <a href="/about">About</a>
  <a href="/terms">Terms</a>
  <a href="/privacy">Privacy</a>
  <a href="/contact">Contact</a>
</div>

    </footer>
  );
}
