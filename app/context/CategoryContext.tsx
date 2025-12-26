"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Category = {
  id: string;
  name: string;
  image?: string;
};

type CategoryContextType = {
  categories: Category[];
  addCategory: (name: string, image?: string) => void;
  deleteCategory: (id: string) => void;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

/* ===== DEFAULT CATEGORIES ===== */
const DEFAULT_CATEGORIES: Category[] = [
  { id: "men", name: "Men" },
  { id: "women", name: "Women" },
  { id: "jacket", name: "Jacket" },
  { id: "jeans", name: "Jeans" },
  { id: "oversized", name: "Oversized" },
  { id: "hoodie", name: "Hoodie" },
];

export function CategoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  /* Load categories */
  useEffect(() => {
    const stored = localStorage.getItem("categories");

    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem(
        "categories",
        JSON.stringify(DEFAULT_CATEGORIES)
      );
    }
  }, []);

  /* Persist categories */
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  function addCategory(name: string, image?: string) {
    const id = name.toLowerCase().replace(/\s+/g, "-");

    if (categories.some((c) => c.id === id)) return;

    setCategories((prev) => [
      ...prev,
      { id, name, image },
    ]);
  }

  function deleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategories must be used inside CategoryProvider");
  }
  return ctx;
}
