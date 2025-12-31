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

      const urls: string[] = [];
      for (const file of images) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }

      await addProduct({
        name,
        price: Number(price),
        images: urls,
        sizes: [],
        category,
      });

      setName("");
      setPrice("");
      setCategory("");
      setImages([]);
    } catch {
      alert("Failed to upload");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={page}>
      <h1 style={title}>Admin · Products</h1>

      {/* ADD PRODUCT */}
      <section style={card}>
        <h3 style={cardTitle}>Add New Product</h3>

        <div style={formGrid}>
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
          />
        </div>

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <div style={previewGrid}>
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                style={previewImg}
              />
            ))}
          </div>
        )}

        <button style={primaryBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading…" : "Save Product"}
        </button>
      </section>

      {/* PRODUCT LIST */}
      <section style={{ marginTop: 48 }}>
        <h3 style={cardTitle}>All Products</h3>

        {products.length === 0 ? (
          <p style={{ color: "#777" }}>No products yet</p>
        ) : (
          <div style={list}>
            {products.map((p) => (
              <div key={p.id} style={row}>
                <Link href={`/product/${p.id}`} style={productLink}>
                  <img src={p.images?.[0]} style={thumb} />
                  <div>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    <div style={meta}>₹{p.price}</div>
                  </div>
                </Link>

                <button
                  style={deleteBtn}
                  onClick={() => {
                    if (confirm("Delete this product?")) {
                      deleteProduct(p.id);
                    }
                  }}
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

const page = {
  padding: "32px",
  maxWidth: "980px",
  margin: "0 auto",
};

const title = {
  fontSize: "22px",
  fontWeight: 600,
  marginBottom: "28px",
};

const card = {
  background: "#fff",
  borderRadius: "18px",
  padding: "24px",
  border: "1px solid #eee",
};

const cardTitle = {
  fontSize: "16px",
  fontWeight: 500,
  marginBottom: "18px",
};

const formGrid = {
  display: "grid",
  gap: "12px",
  marginBottom: "16px",
};

const input = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const primaryBtn = {
  width: "100%",
  marginTop: "16px",
  padding: "14px",
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  border: "none",
  fontSize: "14px",
  cursor: "pointer",
};

const previewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "10px",
  marginTop: "10px",
};

const previewImg = {
  width: "100%",
  height: "80px",
  objectFit: "cover" as const,
  borderRadius: "10px",
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
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid #eee",
  background: "#fafafa",
};

const productLink = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
  textDecoration: "none",
  color: "#000",
};

const thumb = {
  width: "64px",
  height: "64px",
  objectFit: "cover" as const,
  borderRadius: "12px",
};

const meta = {
  fontSize: "12px",
  color: "#777",
};

const deleteBtn = {
  background: "none",
  border: "none",
  color: "#ff3b30",
  fontSize: "13px",
  cursor: "pointer",
};
