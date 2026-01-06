"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 🚨 Prevent Supabase from running during build
    if (typeof window === "undefined") return;

    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
    }

    fetchProducts();
    setReady(true);
  }, []);

  async function addProduct(p: Omit<Product, "id">) {
    await supabase.from("products").insert([p]);
  }

  async function deleteProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {ready && children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
}
