"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCategories } from "@/app/context/CategoryContext";
import { useAuth } from "@/app/context/AuthContext";

const ADMIN_EMAIL = "your-email@gmail.com"; // 🔴 SAME EMAIL HERE

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { categories } = useCategories();
  const { user } = useAuth();

  const activeCategory = searchParams.get("category");
  const isAdmin = user?.email === ADMIN_EMAIL;

  const [mounted, setMounted] = useState(open);
  const [showMore, setShowMore] = useState(false);
  const touchStartX = useRef<number | null>(null);

  /* LOCK BODY SCROLL (MOBILE) */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* KEEP MOUNTED FOR ANIMATION */
  useEffect(() => {
    if (open) setMounted(true);
    else {
      const t = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!mounted) return null;

  function goToCategory(categoryId: string) {
    router.push(`/products/1?category=${categoryId}`);
    onClose();
  }

  /* SWIPE TO CLOSE */
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    if (e.touches[0].clientX - touchStartX.current < -60) {
      onClose();
      touchStartX.current = null;
    }
  }

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <>
      {/* OVERLAY */}
      <div
        style={{ ...overlay, opacity: open ? 1 : 0 }}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        style={{
          ...sidebar,
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <nav style={nav}>
          {/* CATEGORIES */}
          {categories.map((c) => {
            const active = activeCategory === c.id;

            return (
              <button
                key={c.id}
                onClick={() => goToCategory(c.id)}
                style={{
                  ...itemBtn,
                  ...(active ? itemActive : {}),
                }}
              >
                {c.name}
              </button>
            );
          })}

          <div style={divider} />

          <Link
            href="/track-order"
            onClick={onClose}
            style={{
              ...itemSecondary,
              ...(isActive("/track-order") ? itemActive : {}),
            }}
          >
            Track My Order
          </Link>

          <button style={moreBtn} onClick={() => setShowMore(!showMore)}>
            More
          </button>

          <div
            style={{
              ...moreSection,
              maxHeight: showMore ? "260px" : "0",
              opacity: showMore ? 1 : 0,
            }}
          >
            <Link href="/about" style={itemMuted} onClick={onClose}>
              About Us
            </Link>
            <Link href="/contact" style={itemMuted} onClick={onClose}>
              Contact Us
            </Link>
            <Link href="/privacy" style={itemMuted} onClick={onClose}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={itemMuted} onClick={onClose}>
              Terms & Conditions
            </Link>

            {/* 🔒 ADMIN ONLY */}
            {isAdmin && (
              <Link
                href="/admin/categories"
                style={itemMuted}
                onClick={onClose}
              >
                Admin Categories
              </Link>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.25)",
  backdropFilter: "blur(4px)",
  transition: "opacity 0.25s ease",
  zIndex: 9999,
};

const sidebar = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "85vw",
  maxWidth: "320px",
  height: "100vh",
  background: "#fff",
  padding: "max(env(safe-area-inset-top), 48px) 24px 32px",
  transition: "transform 0.25s ease",
  zIndex: 10000,
};

const nav = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
};

const divider = {
  height: "1px",
  background: "#eee",
};

const itemBtn = {
  background: "none",
  border: "none",
  padding: "8px 0",
  textAlign: "left" as const,
  fontSize: "16px",
  fontWeight: 500,
  cursor: "pointer",
};

const itemSecondary = {
  textDecoration: "none",
  fontSize: "15px",
};

const itemActive = {
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: "6px",
};

const moreBtn = {
  background: "none",
  border: "none",
  padding: "6px 0",
  textAlign: "left" as const,
  fontSize: "15px",
  cursor: "pointer",
};

const moreSection = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  marginLeft: "12px",
  overflow: "hidden",
  transition: "all 0.25s ease",
};

const itemMuted = {
  textDecoration: "none",
  color: "#777",
  fontSize: "14px",
};
