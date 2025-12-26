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

  async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("SUPABASE FETCH:", { data, error });

  if (error) {
    console.error("Supabase error:", error.message);
    return;
  }

  if (data) {
    setProducts(data);
  }
}


  async function addProduct(p: Omit<Product, "id">) {
    const { error } = await supabase.from("products").insert([p]);

    if (error) {
      console.error("Add product failed:", error.message);
    } else {
      fetchProducts();
    }
  }

  async function deleteProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
}
