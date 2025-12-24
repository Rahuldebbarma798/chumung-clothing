"use client";

import { useState } from "react";
import { useCategories } from "@/app/context/CategoryContext";

export default function AdminCategoriesPage() {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  return (
    <main style={{ padding: "24px" }}>
      <h1>Admin – Categories</h1>

      <div style={{ maxWidth: 400, marginTop: 20 }}>
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={input}
        />

        <button
          style={btn}
          onClick={() => {
            if (!name) return;
            addCategory(name, image);
            setName("");
            setImage("");
          }}
        >
          Add Category
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        {categories.map((c) => (
          <div key={c.id} style={row}>
            <span>{c.name}</span>
            <button onClick={() => deleteCategory(c.id)} style={del}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  padding: "10px",
  background: "#000",
  color: "#fff",
  border: "none",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const del = {
  background: "none",
  border: "none",
  color: "red",
};
