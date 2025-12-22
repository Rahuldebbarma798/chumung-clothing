import Link from "next/link";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}
      <div style={overlay} onClick={onClose}></div>

      {/* SIDEBAR */}
      <aside style={sidebar}>
        <button onClick={onClose} style={closeBtn}>✕</button>

        <nav style={nav}>
          <Link href="/sale" style={item}>Flash Sale</Link>
          <Link href="/men" style={item}>Men</Link>
          <Link href="/women" style={item}>Women</Link>
          <Link href="/track-order" style={item}>Track My Order</Link>

          <details style={details}>
            <summary style={summary}>More</summary>
            <Link href="/about" style={subItem}>About Us</Link>
            <Link href="/contact" style={subItem}>Contact Us</Link>
            <Link href="/privacy" style={subItem}>Privacy Policy</Link>
            <Link href="/terms" style={subItem}>Terms & Conditions</Link>
          </details>
        </nav>
      </aside>
    </>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  zIndex: 40,
};

const sidebar = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "260px",
  height: "100vh",
  background: "#fff",
  padding: "28px 24px",
  zIndex: 50,
  boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
};

const closeBtn = {
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  marginBottom: "20px",
};

const nav = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "18px",
};

const item = {
  textDecoration: "none",
  color: "#000",
  fontSize: "15px",
  fontWeight: 500,
};

const details = {
  marginTop: "10px",
};

const summary = {
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 500,
};

const subItem = {
  display: "block",
  marginTop: "10px",
  marginLeft: "12px",
  textDecoration: "none",
  fontSize: "14px",
  color: "#333",
};
