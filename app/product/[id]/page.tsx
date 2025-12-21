"use client";

import { useState } from "react";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [loggedIn] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  function requireLogin(action: string) {
    if (!loggedIn) {
      alert("Please login to continue");
    } else {
      alert(action);
    }
  }

  return (
    <main style={{ padding: "30px" }}>
      <h1>Product #{params.id}</h1>

      <p>Product description goes here.</p>

      {/* SIZE SELECT */}
      <div style={{ marginTop: "20px" }}>
        <strong>Select Size:</strong>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button>S</button>
          <button>M</button>
          <button>L</button>
        </div>

        <button
          style={{ marginTop: "10px" }}
          onClick={() => setShowSizeChart(true)}
        >
          View Size Chart
        </button>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #e2ddd6",
            background: "#fff",
          }}
        >
          <h3>Size Chart</h3>
          <p>Chest / Length details here</p>
          <button onClick={() => setShowSizeChart(false)}>Close</button>
        </div>
      )}

      {/* ACTIONS */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={() => requireLogin("Added to Wishlist")}>
          ❤️ Wishlist
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => requireLogin("Added to Cart")}
        >
          🛒 Add to Cart
        </button>
      </div>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#6b6b6b" }}>
        All sales are final. No returns.
      </p>
    </main>
  );
}
