"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "20px 30px",
        borderBottom: "1px solid #e2ddd6",
        background: "#F6F1EA",
      }}
    >
      {/* LEFT NAV */}
      <nav style={{ display: "flex", gap: "20px" }}>
  <a href="/men">Men</a>
  <a href="/women">Women</a>
  <a href="#">Flash Sale</a>
  <a href="/account">Account</a>
</nav>



      {/* CENTER BRAND */}
      <Link
        href="/"
        style={{
          fontWeight: 700,
          textDecoration: "none",
          color: "#1A1A1D",
          fontSize: "18px",
          
        }}
      >
        CHUMUNG CLOTHING
      </Link>

      {/* RIGHT ACTIONS */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}>
  <a href="/wishlist">Wishlist</a>
  <a href="/cart">Cart</a>
</div>

    </header>
  );
}
