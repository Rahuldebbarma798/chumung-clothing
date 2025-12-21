"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/hero1.jpg",
    link: "/products/1",
  },
  {
    id: 2,
    image: "/hero2.jpg",
    link: "/products/2",
  },
  {
    id: 3,
    image: "/hero3.jpg",
    link: "/men",
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
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // 16:9 ratio
        overflow: "hidden",
        borderRadius: "10px",
        marginBottom: "32px",
        background: "#e2ddd6",
      }}
    >
      <a
        href={slides[index].link}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <img
          src={slides[index].image}
          alt="Hero"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </a>

      {/* DOTS */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
