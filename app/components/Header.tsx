"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);

  /* ✅ FIX HYDRATION */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setOpen(false);
    setShowSearch(false);
  }, [pathname]);

  /* Close search when clicking outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  /* SAFE cart count */
  const cartCount = mounted
    ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

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
          <button
            style={iconBtn}
            onClick={() => setShowSearch(true)}
          >
            <Search size={20} strokeWidth={1.6} />
          </button>

          <Link href="/wishlist" style={icon}>
            <Heart size={20} strokeWidth={1.6} />
          </Link>

          <Link href="/cart" style={cartIconWrap}>
            <ShoppingBag size={20} strokeWidth={1.6} />
            {mounted && cartCount > 0 && (
              <span style={badge}>{cartCount}</span>
            )}
          </Link>

          <Link href="/account" style={icon}>
            <User size={20} strokeWidth={1.6} />
          </Link>
        </div>
      </header>

      {/* 🔍 FULL WIDTH SEARCH OVERLAY */}
      {showSearch && (
        <div style={searchOverlay}>
          <div style={searchBox} ref={searchRef}>
            <form onSubmit={handleSearch}>
              <input
                autoFocus
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={searchInput}
              />
            </form>
          </div>
        </div>
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
  borderRadius: "999px",
  fontSize: "11px",
  padding: "2px 6px",
};

const menuBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
};

/* SEARCH */

const searchOverlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(255,255,255,0.96)",
  zIndex: 9999,
  display: "flex",
  alignItems: "flex-start",
  paddingTop: "90px",
};

const searchBox = {
  width: "100%",
  padding: "0 20px",
};

const searchInput = {
  width: "100%",
  padding: "16px 22px",
  fontSize: "16px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  outline: "none",
};
