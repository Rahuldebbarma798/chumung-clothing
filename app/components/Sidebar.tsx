"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40,
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-280px",
          width: "260px",
          height: "100vh",
          background: "#F6F1EA",
          padding: "20px",
          transition: "left 0.3s ease",
          zIndex: 50,
        }}
      >
        <button onClick={onClose}>✕</button>

       <nav style={{ marginTop: "20px" }}>
  <div style={{ marginBottom: "12px" }}>
    <Link href="/" onClick={onClose}>Home</Link>
  </div>

  <div style={{ marginBottom: "12px" }}>
    <Link href="#">Flash Sale</Link>
  </div>

  <div style={{ marginBottom: "12px" }}>
    <Link href="/men" onClick={onClose}>Men</Link>
  </div>

  <div style={{ marginBottom: "20px" }}>
    <Link href="/women" onClick={onClose}>Women</Link>
  </div>

  {/* ACCOUNT */}
  <div style={{ marginBottom: "12px" }}>
    <Link href="/account" onClick={onClose}>Account</Link>
  </div>

  {/* TRACK ORDER */}
  <div style={{ marginBottom: "20px" }}>
    <Link href="/track-order" onClick={onClose}>
      Track My Order
    </Link>
  </div>

  {/* MORE */}
  <button
    onClick={() => setShowMore(!showMore)}
    style={{
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      marginBottom: "10px",
    }}
  >
    More ▾
  </button>

  {showMore && (
    <div style={{ marginLeft: "15px" }}>
      <div style={{ marginBottom: "8px" }}>
        <Link href="/contact" onClick={onClose}>Contact Us</Link>
      </div>
      <div style={{ marginBottom: "8px" }}>
        <Link href="/about" onClick={onClose}>About Us</Link>
      </div>
      <div style={{ marginBottom: "8px" }}>
        <Link href="/privacy" onClick={onClose}>Privacy Policy</Link>
      </div>
      <div>
        <Link href="/terms" onClick={onClose}>Terms & Conditions</Link>
      </div>
    </div>
  )}
</nav>

      </aside>
    </>
  );
}
