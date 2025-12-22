"use client";

import { useState } from "react";
import { useProducts } from "@/app/context/ProductContext";

export default function AdminProductsPage() {
  const { addProduct, products, deleteProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [sizes, setSizes] = useState("");

  function handleAdd() {
    if (!name || !price || !images || !sizes) {
      alert("Fill all fields");
      return;
    }

    addProduct({
      name,
      price: Number(price),
      images: images.split(",").map((i) => i.trim()),
      sizes: sizes.split(",").map((s) => s.trim()),
    });

    setName("");
    setPrice("");
    setImages("");
    setSizes("");
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1>Admin – Products</h1>

      {/* ADD PRODUCT */}
      <div style={form}>
        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <input
          placeholder="Images (comma separated)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          style={input}
        />

        <input
          placeholder="Sizes (comma separated)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          style={input}
        />

        <button onClick={handleAdd} style={btn}>
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div style={{ marginTop: "40px" }}>
        {products.map((p) => (
          <div key={p.id} style={productRow}>
            <img src={p.images[0]} style={thumb} />
            <div>
              <div>{p.name}</div>
              <div>₹{p.price}</div>
            </div>
            <button onClick={() => deleteProduct(p.id)} style={delBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const form = {
  display: "grid",
  gap: "10px",
  maxWidth: "420px",
};

const input = {
  padding: "10px",
  fontSize: "14px",
};

const btn = {
  padding: "10px",
  background: "#000",
  color: "#fff",
  border: "none",
};

const productRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "14px",
};

const thumb = {
  width: "50px",
  height: "50px",
  objectFit: "cover" as const,
  borderRadius: "6px",
};

const delBtn = {
  marginLeft: "auto",
  background: "none",
  border: "none",
  color: "red",
  cursor: "pointer",
};
