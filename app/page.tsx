"use client";

import { useState } from "react";

export default function Home() {
  const [loggedIn] = useState(false);

  function requireLogin(action: string) {
    if (!loggedIn) {
      alert("Please login to continue");
    } else {
      alert(action);
    }
  }

  return (
    <main style={{ padding: "30px" }}>
      {/* CATEGORY STRIP */}
      <section
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={{ flex: 1, padding: "40px", border: "1px solid #e2ddd6" }}>
          Men
        </div>
        <div style={{ flex: 1, padding: "40px", border: "1px solid #e2ddd6" }}>
          Women
        </div>
      </section>

      {/* HERO PLACEHOLDER */}
      <section
  style={{
    height: "360px",
    marginBottom: "40px",
    border: "1px solid #e2ddd6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
    fontSize: "18px",
  }}
>
  Hero Slider (Add your images here)
</section>


      {/* PRODUCT GRID PLACEHOLDER */}
      <section>
        <h2>Sale</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ padding: "20px", border: "1px solid #e2ddd6" }}>
            Product 1
            <br />
            <button onClick={() => requireLogin("Added to wishlist")}>
              ❤️ Wishlist
            </button>
            <button onClick={() => requireLogin("Added to cart")}>
              🛒 Cart
            </button>
          </div>

          <div style={{ padding: "20px", border: "1px solid #e2ddd6" }}>
            Product 2
            <br />
            <button onClick={() => requireLogin("Added to wishlist")}>
              ❤️ Wishlist
            </button>
            <button onClick={() => requireLogin("Added to cart")}>
              🛒 Cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
