"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddressPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (Object.values(form).some((v) => !v.trim())) {
      alert("Please fill all fields");
      return;
    }

    router.push("/checkout");
  }

  return (
    <main style={page}>
      <h1 style={title}>Shipping Address</h1>

      <form onSubmit={handleSubmit} style={formBox}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={input}
        />

        <textarea
          name="address"
          placeholder="Street Address"
          value={form.address}
          onChange={handleChange}
          style={textarea}
        />

        <div style={row}>
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            style={input}
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            style={input}
          />
        </div>

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          style={input}
        />

        <button type="submit" style={btn}>
          Continue →
        </button>
      </form>
    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "24px 16px 100px",
  maxWidth: "680px",
  margin: "0 auto",
};

const title = {
  fontSize: "20px",
  fontWeight: 500,
  marginBottom: "24px",
};

const formBox = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
};

const input = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const textarea = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
  minHeight: "90px",
  resize: "none" as const,
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const btn = {
  marginTop: "20px",
  padding: "16px",
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  border: "none",
  fontSize: "15px",
  cursor: "pointer",
};
