"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 🔥 CLOSE SIDEBAR ON ROUTE CHANGE
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header style={header}>
        {/* MENU */}
        <button style={menuBtn} onClick={() => setOpen(true)}>
          ☰
        </button>

        {/* BRAND */}
        <Link href="/" style={brand}>
          CHUMUNG&nbsp;CLOTHING
        </Link>

        {/* RIGHT ICONS */}
        <div style={icons}>
          <button style={iconBtn} aria-label="Search">
            <SearchIcon />
          </button>

          <Link href="/wishlist" style={icon}>
            <HeartIcon />
          </Link>

          <Link href="/cart" style={cartIconWrap}>
            <CartIcon />
            {cartCount > 0 && <span style={badge}>{cartCount}</span>}
          </Link>

          <Link href="/account" style={icon}>
            <UserIcon />
          </Link>
        </div>
      </header>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/* ================= ICONS ================= */

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.8 4.6c-1.8-1.7-4.6-1.7-6.4 0L12 7l-2.4-2.4c-1.8-1.7-4.6-1.7-6.4 0-2 1.9-2 5 0 6.9l8.8 8.6 8.8-8.6c2-1.9 2-5 0-6.9z"/>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    </svg>
  );
}

/* ================= STYLES ================= */

const header = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  height: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 18px",
  background: "#fff",
  borderBottom: "1px solid #eee",
  zIndex: 10000,
};


const brand = {
  textDecoration: "none",
  color: "#000",
  fontWeight: 600,
  letterSpacing: "0.14em",
  fontSize: "14px",
};

const icons = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
};

const icon = {
  color: "#000",
};

const iconBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
};

const cartIconWrap = {
  position: "relative" as const,
  color: "#000",
};

const badge = {
  position: "absolute" as const,
  top: "-6px",
  right: "-8px",
  background: "#000",
  color: "#fff",
  borderRadius: "50%",
  fontSize: "11px",
  padding: "2px 6px",
};

const menuBtn = {
  fontSize: "20px",
  background: "none",
  border: "none",
  cursor: "pointer",
};
