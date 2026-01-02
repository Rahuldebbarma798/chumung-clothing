"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";
import { useCategories } from "@/app/context/CategoryContext";

export default function AdminProductsPage() {
  const { addProduct, deleteProduct, products } = useProducts();
  const { categories } = useCategories();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit() {
    if (!name || !price || !category || images.length === 0) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 UPLOAD IMAGES VIA API ROUTE (SERVER SIDE)
      const formData = new FormData();
      images.forEach((img) => formData.append("files", img));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.urls) throw new Error("Upload failed");

      // ✅ SAVE PRODUCT WITH REAL IMAGE URLS
      await addProduct({
        name,
        price: Number(price),
        images: data.urls,
        sizes: [],
        category,
      });

      // RESET
      setName("");
      setPrice("");
      setCategory("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 32, maxWidth: 1000 }}>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Admin · Products</h1>

      {/* ADD PRODUCT */}
      <section style={card}>
        <h3>Add Product</h3>

        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        {images.length > 0 && (
          <div style={previewGrid}>
            {images.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} style={previewImg} />
            ))}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={btn}>
          {loading ? "Uploading..." : "Save Product"}
        </button>
      </section>

      {/* PRODUCT LIST */}
      <section style={{ marginTop: 40 }}>
        <h3>Products</h3>

        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          <div style={list}>
            {products.map((p) => (
              <div key={p.id} style={row}>
                <Link href={`/product/${p.id}`} style={productLink}>
                  <img src={p.images?.[0]} style={thumb} />
                  <div>
                    <div>{p.name}</div>
                    <div style={{ fontSize: 12 }}>₹{p.price}</div>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    if (confirm("Delete product?")) deleteProduct(p.id);
                  }}
                  style={del}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ================= STYLES ================= */

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  border: "1px solid #eee",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
};

const btn = {
  padding: 12,
  width: "100%",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};

const previewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
  gap: 10,
  marginBottom: 16,
};

const previewImg = {
  width: "100%",
  height: 70,
  objectFit: "cover" as const,
  borderRadius: 8,
};

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 12,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 14,
  border: "1px solid #eee",
  borderRadius: 14,
};

const productLink = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  textDecoration: "none",
  color: "#000",
};

const thumb = {
  width: 60,
  height: 60,
  objectFit: "cover" as const,
  borderRadius: 10,
};

const del = {
  background: "none",
  border: "none",
  color: "red",
  cursor: "pointer",
};
