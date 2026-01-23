"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const ADMIN_EMAIL = "rahuldebbarma798@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 🚨 DO NOTHING while auth is loading
    if (loading) return;

    // ❌ No user after loading → go to login
    if (!user) {
      router.replace("/login");
      return;
    }

    // ❌ User exists but not admin → go home
    if (user.email !== ADMIN_EMAIL) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // 🚫 Prevent flash of wrong page
  if (loading) return null;

  // 🚫 Prevent rendering for non-admins
  if (!user || user.email !== ADMIN_EMAIL) return null;

  return <>{children}</>;
}
