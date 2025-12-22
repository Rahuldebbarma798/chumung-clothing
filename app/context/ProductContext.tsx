"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
sizes: string[];

};


type ProductContextType = {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function addProduct(p: Omit<Product, "id">) {
    setProducts((prev) => [
      ...prev,
      { ...p, id: Date.now() },
    ]);
  }

  function deleteProduct(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
}
