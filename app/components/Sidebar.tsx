"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [showMore, setShowMore] = useState(false);

  if (!open) return null;

  return (
    <>
      <div style={overlay} onClick={onClose} />

      <aside style={sidebar}>
        <nav style={nav}>
          <Link href="/sale" style={item} onClick={onClose}>
            Flash Sale
          </Link>

          <Link href="/men" style={item} onClick={onClose}>
            Men
          </Link>

          <Link href="/women" style={item} onClick={onClose}>
            Women
          </Link>

          <Link href="/track-order" style={itemSecondary} onClick={onClose}>
            Track My Order
          </Link>

          {/* MORE BUTTON */}
          <button
            style={moreBtn}
            onClick={() => setShowMore(!showMore)}
          >
            More
          </button>

          {showMore && (
            <div style={moreSection}>
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
            </div>
          )}
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
  zIndex: 9999,
};


const sidebar = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "300px",
  height: "100vh",
  background: "#fff",
  padding: "48px 24px",
  zIndex: 10001,
};


const nav = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "22px",
};

const item = {
  textDecoration: "none",
  color: "#000",
  fontSize: "16px",
  fontWeight: 500,
};

const itemSecondary = {
  textDecoration: "none",
  color: "#000",
  fontSize: "15px",
};

const moreBtn = {
  background: "none",
  border: "none",
  padding: 0,
  textAlign: "left" as const,
  fontSize: "15px",
  cursor: "pointer",
  color: "#000",
};

const moreSection = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
  marginLeft: "12px",
};

const itemMuted = {
  textDecoration: "none",
  color: "#777",
  fontSize: "14px",
};
