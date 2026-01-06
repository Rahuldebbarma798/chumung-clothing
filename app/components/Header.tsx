"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const { cart } = useCart();
  const { products } = useProducts();

  /* Hydration safe */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
    setShowSearch(false);
  }, [pathname]);

  /* Click outside to close search */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }

    if (showSearch) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSearch]);

  const cartCount = mounted
    ? cart.reduce((sum, i) => sum + (i.quantity || 0), 0)
    : 0;

  const suggestions =
    query.trim().length === 0
      ? []
      : products
          .filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/products/1?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
    setQuery("");
  }

  return (
    <>
      <header style={header}>
        <button style={menuBtn} onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>

        <Link href="/" style={brand}>
          CHUMUNG&nbsp;CLOTHING
        </Link>

        <div style={icons}>
          <button style={iconBtn} onClick={() => setShowSearch(true)}>
            <Search size={20} />
          </button>

          <Link href="/wishlist" style={icon}>
            <Heart size={20} />
          </Link>

          <Link href="/cart" style={cartWrap}>
            <ShoppingBag size={20} />
            {mounted && cartCount > 0 && (
              <span style={badge}>{cartCount}</span>
            )}
          </Link>

          <Link href="/account" style={icon}>
            <User size={20} />
          </Link>
        </div>
      </header>

      {/* SEARCH BAR */}
      {showSearch && (
        <div style={searchWrap} ref={searchRef}>
          <form onSubmit={handleSearchSubmit} style={searchForm}>
            <input
              autoFocus
              placeholder="Search t-shirts, hoodies…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={searchInput}
            />
            <button type="submit" style={searchBtn}>
              <Search size={18} />
            </button>
          </form>

          {suggestions.length > 0 && (
            <div style={suggestBox}>
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  style={suggestItem}
                  onClick={() => {
                    setShowSearch(false);
                    setQuery("");
                  }}
                >
                  <img src={p.images?.[0]} style={suggestImg} />
                  <span style={suggestName}>{p.name}</span>
                </Link>
              ))}
            </div>
          )}
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

const icon = { textDecoration: "none" };
const iconBtn = { background: "none", border: "none", cursor: "pointer" };

const cartWrap = { position: "relative" as const };

const badge = {
  position: "absolute" as const,
  top: "-6px",
  right: "-8px",
  background: "#000",
  color: "#fff",
  fontSize: "11px",
  padding: "2px 6px",
  borderRadius: "999px",
};

const menuBtn = { background: "none", border: "none", cursor: "pointer" };

/* SEARCH */

const searchWrap = {
  position: "fixed" as const,
  top: "64px",
  left: 0,
  right: 0,
  background: "#fff",
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  zIndex: 9999,
};

const searchForm = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: "999px",
  padding: "10px 14px",
};

const searchInput = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "15px",
};

const searchBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
};

const suggestBox = {
  marginTop: "10px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const suggestItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
  color: "#000",
};

const suggestImg = {
  width: "48px",
  height: "48px",
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const suggestName = {
  fontSize: "14px",
};
