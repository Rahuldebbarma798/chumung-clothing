import Link from "next/link";

export default function Footer() {
  return (
    <footer style={footer}>
      <div style={container}>
        {/* BRAND */}
        <div>
          <h3 style={brandName}>CHUMUNG CLOTHING</h3>
          <p style={tagline}>
            Curated thrift fashion. Limited pieces.
          </p>
        </div>

        {/* LINKS */}
        <div style={links}>
          <Link href="/about">About</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* SOCIAL ICONS */}
        <div style={social}>
          <a
            href="https://instagram.com"
            target="_blank"
            style={socialLink}
          >
            📷 Instagram
          </a>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            style={socialLink}
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div style={bottom}>
        © {new Date().getFullYear()} CHUMUNG CLOTHING
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const footer = {
  marginTop: "60px",
  background: "#F6F1EA",
  borderTop: "1px solid #e2ddd6",
};

const container = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px 20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "30px",
};

const brandName = {
  fontWeight: 600,
  letterSpacing: "0.1em",
  marginBottom: "8px",
};

const tagline = {
  fontSize: "13px",
  color: "#666",
};

const links = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
  fontSize: "14px",
};

const social = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
  fontSize: "14px",
};

const socialLink = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
};

const bottom = {
  textAlign: "center" as const,
  padding: "16px",
  fontSize: "12px",
  color: "#777",
  borderTop: "1px solid #e2ddd6",
};
