"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return <p style={{ padding: 16 }}>Loading account…</p>;
  }

  if (!user) {
    return (
      <main style={{ padding: "16px" }}>
        <h1 style={{ fontSize: 18, marginBottom: 12 }}>Account</h1>
        <p style={{ marginBottom: 16 }}>You are not logged in.</p>

        <button
          onClick={() => router.push("/login")}
          style={btn}
        >
          Login
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: 18, marginBottom: 12 }}>My Account</h1>

      <p style={{ marginBottom: 8 }}>
        <strong>Email:</strong> {user.email}
      </p>

      <button
        onClick={async () => {
          await logout();
          router.push("/");
        }}
        style={btn}
      >
        Logout
      </button>
    </main>
  );
}

const btn = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#000",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};
