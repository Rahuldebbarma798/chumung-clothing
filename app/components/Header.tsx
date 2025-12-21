"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <header
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: "1px solid #e2ddd6",
          background: "#F6F1EA",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        {/* LEFT: MENU */}
        <button
          onClick={() => setOpen(true)}
          style={{
            fontSize: "22px",
            background: "none",
            border: "none",
            justifySelf: "start",
          }}
        >
          ☰
        </button>

        {/* CENTER: BRAND (TRUE CENTER) */}
        <Link
          href="/"
          style={{
            justifySelf: "center",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textDecoration: "none",
            color: "#1A1A1D",
            fontSize: "14px",
            whiteSpace: "nowrap",
          }}
        >
          CHUMUNG&nbsp;CLOTHING
        </Link>

        {/* RIGHT: ICONS */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            justifySelf: "end",
          }}
        >
          <Link href="/wishlist">❤️</Link>
          <Link href="/cart">🛒</Link>
        </div>
      </header>
    </>
  );
}
