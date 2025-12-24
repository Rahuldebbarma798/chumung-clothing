"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/hero1.jpg",
    link: "/product/12e5566d-d670-4da2-aa90-f42c0a8acb05",
  },
  {
    id: 2,
    image: "/hero2.jpg",
    link: "/men",
  },
  {
    id: 3,
    image: "/hero3.jpg",
    link: "/product/1694593998765",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section style={wrap}>
      <Link href={slides[index].link}>
        <img src={slides[index].image} style={image} />
      </Link>

      {/* DOTS */}
      <div style={dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...dot,
              opacity: i === index ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ===== STYLES ===== */

const wrap = {
  position: "relative" as const,
  width: "100%",
  marginBottom: "40px",
  borderRadius: "18px",
  overflow: "hidden",
};

const image = {
  width: "100%",
  height: "420px",
  objectFit: "cover" as const,
};

const dots = {
  position: "absolute" as const,
  bottom: "14px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "10px",
};

const dot = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#fff",
  cursor: "pointer",
};
