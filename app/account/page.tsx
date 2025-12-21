"use client";

import { useState } from "react";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main style={{ padding: "30px" }}>
      <h1>My Account</h1>

      {!loggedIn ? (
        <>
          <p>Please login to access your account.</p>
          <button onClick={() => setLoggedIn(true)}>Login (test)</button>
        </>
      ) : (
        <>
          <p>Welcome back 👋</p>
          <ul>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/track-order">Track My Order</a></li>
          </ul>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </>
      )}
    </main>
  );
}
