"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header style={header}>
        {/* MENU */}
        <button style={menuBtn} onClick={() => setOpen(true)}>☰</button>

        {/* BRAND */}
        <Link href="/" style={brand}>
          CHUMUNG CLOTHING
        </Link>

        {/* ICONS */}
        <div style={icons}>
          <Link href="/wishlist" style={icon}>
            <HeartIcon />
          </Link>
          <Link href="/cart" style={icon}>
            <CartIcon />
          </Link>
          <Link href="/account" style={icon}>
            <UserIcon />
          </Link>
        </div>
      </header>

      {/* SIDEBAR */}
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/* ================= ICONS ================= */

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
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  borderBottom: "1px solid #e2ddd6",
  background: "#fff",
};

const brand = {
  textDecoration: "none",
  color: "#000",
  fontWeight: 600,
  letterSpacing: "0.12em",
  fontSize: "14px",
};

const icons = {
  display: "flex",
  gap: "18px",
};

const icon = {
  color: "#000",
};

const menuBtn = {
  fontSize: "20px",
  background: "none",
  border: "none",
  cursor: "pointer",
};
