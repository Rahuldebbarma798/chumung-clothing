"use client";

import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Admin Panel</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link href="/admin/categories">Manage Categories</Link>
        <Link href="/admin/products">Manage Products</Link>
      </div>
    </main>
  );
}
