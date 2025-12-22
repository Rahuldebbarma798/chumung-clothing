"use client";

import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { loggedIn, login, logout } = useAuth();

  return (
    <main style={{ padding: "16px" }}>
      <h1>Account</h1>

      {!loggedIn ? (
        <>
          <p>Please login to continue</p>
          <button onClick={login} style={btn}>
            Login
          </button>
        </>
      ) : (
        <>
          <p>You are logged in</p>
          <button onClick={logout} style={btn}>
            Logout
          </button>
        </>
      )}
    </main>
  );
}

const btn = {
  marginTop: "12px",
  padding: "8px 14px",
  border: "1px solid #000",
  background: "#fff",
};
