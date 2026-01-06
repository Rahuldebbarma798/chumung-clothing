"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

/* ================= TYPES ================= */

export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  category: string | null;
};

type ProductContextType = {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

/* ================= CONTEXT ================= */

const ProductContext = createContext<ProductContextType | null>(null);

/* ================= PROVIDER ================= */

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  /* -------- FETCH PRODUCTS (FAST & SAFE) -------- */
  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return;
    }

    if (data) {
      setProducts(data);
    }
  }, []);

  /* -------- ADD PRODUCT -------- */
  async function addProduct(p: Omit<Product, "id">) {
    const { error } = await supabase.from("products").insert([p]);

    if (error) {
      console.error("Add product failed:", error.message);
      return;
    }

    // re-fetch once after insert
    fetchProducts();
  }

  /* -------- DELETE PRODUCT -------- */
  async function deleteProduct(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Delete product failed:", error.message);
      return;
    }

    // re-fetch once after delete
    fetchProducts();
  }

  /* -------- FETCH ONCE ON APP LOAD -------- */
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return ctx;
}
