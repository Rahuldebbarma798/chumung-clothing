"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          padding: 24,
          borderRadius: 16,
          border: "1px solid #eee",
        }}
      >
        <h1 style={{ fontSize: 20, marginBottom: 20 }}>Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        {error && (
          <p style={{ color: "red", fontSize: 14, marginBottom: 12 }}>
            {error}
          </p>
        )}

        <button type="submit" style={button} disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </main>
  );
}

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 10,
  border: "1px solid #ddd",
};

const button = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#000",
  color: "#fff",
  fontSize: 15,
};
