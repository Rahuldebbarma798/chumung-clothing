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
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit() {
    setError("");

    if (!name || !price || !category || images.length === 0) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 UPLOAD TO CLOUDINARY (AUTOMATIC)
      const uploadedImages: string[] = [];

      for (const file of images) {
        const url = await uploadToCloudinary(file);
        uploadedImages.push(url);
      }

      await addProduct({
        name,
        price: Number(price),
        images: uploadedImages, // ✅ FULL CLOUDINARY URLS
        sizes: [],
        category,
      });

      setName("");
      setPrice("");
      setCategory("");
      setImages([]);
    } catch (err) {
      console.error(err);
      setError("Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    deleteProduct(id);
  }

  return (
    <main style={{ padding: "32px", maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Admin · Products</h1>

      {/* ADD PRODUCT */}
      <section style={card}>
        <h3 style={{ marginBottom: 12 }}>Add Product</h3>

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
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 12 }}
        />

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <div style={previewGrid}>
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                style={previewImg}
              />
            ))}
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleSubmit} style={btn} disabled={loading}>
          {loading ? "Uploading..." : "Save Product"}
        </button>
      </section>

      {/* PRODUCT LIST */}
      <section style={{ marginTop: 40 }}>
        <h3>Products</h3>

        {products.length === 0 ? (
          <p style={{ color: "#777" }}>No products yet</p>
        ) : (
          <div style={list}>
            {products.map((p) => (
              <div key={p.id} style={row}>
                <Link
                  href={`/product/${p.id}`}
                  style={productLink}
                >
                  <img
                    src={p.images?.[0] || "/placeholder.jpg"}
                    alt={p.name}
                    style={thumb}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#777" }}>
                      ₹{p.price}
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => handleDelete(p.id)}
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
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #eee",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const btn = {
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  width: "100%",
};

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #eee",
  background: "#fafafa",
};

const productLink = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
  textDecoration: "none",
  color: "#000",
  flex: 1,
};

const thumb = {
  width: "60px",
  height: "60px",
  objectFit: "cover" as const,
  borderRadius: "10px",
};

const del = {
  background: "none",
  border: "none",
  color: "#ff3b30",
  cursor: "pointer",
};

const previewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
  gap: "10px",
  marginBottom: "16px",
};

const previewImg = {
  width: "100%",
  height: "70px",
  objectFit: "cover" as const,
  borderRadius: "8px",
};
