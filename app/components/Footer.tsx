"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={footer}>
      {/* BRAND */}
      <div style={brand}>CHUMUNG&nbsp;CLOTHING</div>

      {/* CONTENT */}
      <div style={content}>
        {/* LEFT LINKS */}
        <div style={left}>
          <Link href="/about" style={link}>About</Link>
          <Link href="/contact" style={link}>Contact</Link>
          <Link href="/privacy" style={link}>Privacy Policy</Link>
          <Link href="/terms" style={link}>Terms & Conditions</Link>
        </div>

        {/* RIGHT CONTACT */}
        <div style={right}>
          <Link href="/contact" style={contactTitle}>
            Contact Us
          </Link>

          <div style={socialRow}>
            <InstagramIcon />
            <a
              href="https://instagram.com/chumungclothing"
              target="_blank"
              rel="noopener noreferrer"
              style={socialText}
            >
              @chumungclothing
            </a>
          </div>

          <div style={socialRow}>
            <WhatsAppIcon />
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              style={socialText}
            >
              +91 XXXXXXXXXX
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div style={copy}>
        © {new Date().getFullYear()} Chumung Clothing. All rights reserved.
      </div>
    </footer>
  );
}

/* ================= ICONS ================= */

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M21 11.5a8.5 8.5 0 1 1-3.3-6.7" />
      <path d="M3 21l1.5-4" />
      <path d="M8.5 9.5c1.5 3 3 4.5 6 6" />
    </svg>
  );
}

/* ================= STYLES ================= */

const footer = {
  marginTop: "100px",
  padding: "48px 20px 32px",
  borderTop: "1px solid #eee",
  background: "#fff",
};

const brand = {
  textAlign: "center" as const,
  fontSize: "13px",
  letterSpacing: "0.28em",
  fontWeight: 600,
  marginBottom: "36px",
};

const content = {
  display: "flex",
  justifyContent: "space-between",
  gap: "40px",
  maxWidth: "900px",
  margin: "0 auto 40px",
  flexWrap: "wrap" as const,
};

const left = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const link = {
  textDecoration: "none",
  color: "#555",
  fontSize: "13px",
};

const right = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

const contactTitle = {
  textDecoration: "none",
  color: "#000",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
};

const socialRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const socialText = {
  fontSize: "13px",
  color: "#555",
  textDecoration: "none",
};

const copy = {
  textAlign: "center" as const,
  fontSize: "12px",
  color: "#888",
};
