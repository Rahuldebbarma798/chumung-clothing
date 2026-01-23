"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";
import { uploadToCloudinary } from "@/app/lib/cloudinary";

const AUDIENCE_OPTIONS = ["men", "women"];
const TYPE_OPTIONS = ["jeans", "tshirt", "hoodie", "jacket", "shirt"];

export default function AdminProductsPage() {
  const { addProduct, deleteProduct, products } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [audience, setAudience] = useState<string[]>([]);
  const [sizes, setSizes] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [onSale, setOnSale] = useState(false);
  const [discount, setDiscount] = useState("0");
  const [loading, setLoading] = useState(false);

  function toggleAudience(value: string) {
    setAudience((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit() {
    if (
      !name ||
      !price ||
      !type ||
      audience.length === 0 ||
      !sizes ||
      images.length === 0
    ) {
      alert("Please fill all required fields");
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
        category: null,
        type,
        audience,
        sizes: sizes.split(",").map((s) => s.trim().toUpperCase()),
        images: urls,
        on_sale: onSale,
        discount_percent: onSale ? Number(discount) : 0,
      });

      setName("");
      setPrice("");
      setType("");
      setAudience([]);
      setSizes("");
      setImages([]);
      setOnSale(false);
      setDiscount("0");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Admin · Products</h1>

      <section style={card}>
        <h3>Add Product</h3>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
        <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={input} />

        <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
          <option value="">Select type</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>{t.toUpperCase()}</option>
          ))}
        </select>

        <div style={{ marginBottom: 12 }}>
          <p>Audience</p>
          <div style={{ display: "flex", gap: 10 }}>
            {AUDIENCE_OPTIONS.map((a) => (
              <button
                key={a}
                onClick={() => toggleAudience(a)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: audience.includes(a) ? "1px solid #000" : "1px solid #ddd",
                  background: "#fff",
                }}
              >
                {a.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* SALE */}
        <label style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <input type="checkbox" checked={onSale} onChange={() => setOnSale(!onSale)} />
          On Sale
        </label>

        {onSale && (
          <input
            placeholder="Discount %"
            type="number"
            min={1}
            max={90}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            style={input}
          />
        )}

        <input placeholder="Sizes (S, M, L)" value={sizes} onChange={(e) => setSizes(e.target.value)} style={input} />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <button style={btn} onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving…" : "Save Product"}
        </button>
      </section>

      <section style={{ marginTop: 40 }}>
        <h3>Products</h3>

        {products.map((p) => (
          <div key={p.id} style={row}>
            <Link href={`/product/${p.id}`} style={productLink}>
              <img src={p.images?.[0]} style={thumb} />
              <div>
                <div>{p.name}</div>
                <div style={{ fontSize: 12, color: "#777" }}>
                  ₹{p.price} · {p.type} · {p.on_sale ? `SALE ${p.discount_percent}%` : "—"}
                </div>
              </div>
            </Link>

            <button style={del} onClick={() => confirm("Delete?") && deleteProduct(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

/* styles unchanged */
const card = { background: "#fff", padding: 20, borderRadius: 14, border: "1px solid #eee" };
const input = { width: "100%", padding: 12, marginBottom: 12, borderRadius: 10, border: "1px solid #ddd" };
const btn = { padding: 12, background: "#000", color: "#fff", border: "none", borderRadius: 10, width: "100%" };
const row = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, border: "1px solid #eee", borderRadius: 14, marginBottom: 12 };
const productLink = { display: "flex", gap: 12, alignItems: "center", textDecoration: "none", color: "#000" };
const thumb = { width: 60, height: 60, objectFit: "cover" as const, borderRadius: 10 };
const del = { background: "none", border: "none", color: "red", cursor: "pointer" };
