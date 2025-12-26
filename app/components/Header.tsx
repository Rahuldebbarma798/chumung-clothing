"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setOpen(false);
    setShowSearch(false);
  }, [pathname]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/products/1?q=${encodeURIComponent(query)}`);
    setQuery("");
    setShowSearch(false);
  }

  return (
    <>
      <header style={header}>
        <button style={menuBtn} onClick={() => setOpen(true)}>
          <Menu size={22} strokeWidth={1.6} />
        </button>

        <Link href="/" style={brand}>
          CHUMUNG&nbsp;CLOTHING
        </Link>

        <div style={icons}>
          <button style={iconBtn} onClick={() => setShowSearch((s) => !s)}>
            <Search size={20} strokeWidth={1.6} />
          </button>

          <Link href="/wishlist" style={icon}>
            <Heart size={20} strokeWidth={1.6} />
          </Link>

          <Link href="/cart" style={cartIconWrap}>
            <ShoppingBag size={20} strokeWidth={1.6} />
            {cartCount > 0 && <span style={badge}>{cartCount}</span>}
          </Link>

          <Link href="/account" style={icon}>
            <User size={20} strokeWidth={1.6} />
          </Link>
        </div>
      </header>

      {showSearch && (
        <form style={searchBar} onSubmit={handleSearch}>
          <input
            autoFocus
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchInput}
          />
        </form>
      )}

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
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
  textDecoration: "none",
};

const iconBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
};

const cartIconWrap = {
  position: "relative" as const,
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

const searchBar = {
  position: "fixed" as const,
  top: "64px",
  left: 0,
  right: 0,
  padding: "12px",
  background: "#fff",
  borderBottom: "1px solid #eee",
  zIndex: 9999,
};

const searchInput = {
  width: "100%",
  padding: "12px",
  borderRadius: "999px",
  border: "1px solid #ddd",
};
