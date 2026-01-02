"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";
import { useCategories } from "@/app/context/CategoryContext";
import { uploadToCloudinary } from "@/app/lib/cloudinary";

export default function AdminProductsPage() {
  const { addProduct, deleteProduct, products } = useProducts();
  const { categories } = useCategories();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState(""); // 👈 comma separated
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit() {
    if (!name || !price || !category || !sizes || images.length === 0) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const urls: string[] = [];
      for (const file of images) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }

      await addProduct({
        name,
        price: Number(price),
        category,
        sizes: sizes.split(",").map((s) => s.trim().toUpperCase()), // ✅
        images: urls,
      });

      setName("");
      setPrice("");
      setCategory("");
      setSizes("");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Admin · Products</h1>

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

        <input
          placeholder="Sizes (ex: S, M, L, XL)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          style={input}
        />

        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <button style={btn} onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading…" : "Save Product"}
        </button>
      </section>

      {/* PRODUCT LIST */}
      <section style={{ marginTop: 40 }}>
        <h3>Products</h3>

        {products.map((p) => (
          <div key={p.id} style={row}>
            <Link href={`/product/${p.id}`} style={productLink}>
              <img src={p.images?.[0]} style={thumb} />
              <div>
                <div>{p.name}</div>
                <div style={{ fontSize: 12, color: "#777" }}>
                  ₹{p.price} · {p.sizes.join(", ")}
                </div>
              </div>
            </Link>

            <button
              style={del}
              onClick={() => confirm("Delete product?") && deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

/* ================= STYLES ================= */

const card = { background: "#fff", padding: 20, borderRadius: 14, border: "1px solid #eee" };
const input = { width: "100%", padding: 12, marginBottom: 12, borderRadius: 10, border: "1px solid #ddd" };
const btn = { padding: 12, background: "#000", color: "#fff", border: "none", borderRadius: 10, width: "100%" };
const row = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, border: "1px solid #eee", borderRadius: 14, marginBottom: 12 };
const productLink = { display: "flex", gap: 12, alignItems: "center", textDecoration: "none", color: "#000" };
const thumb = { width: 60, height: 60, objectFit: "cover" as const, borderRadius: 10 };
const del = { background: "none", border: "none", color: "red", cursor: "pointer" };
