"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import { optimizeCloudinary } from "@/app/lib/image";

export default function ProductsClient() {
  const { products } = useProducts();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const searchParams = useSearchParams();
  const router = useRouter();

  const audience = searchParams.get("audience");
  const type = searchParams.get("type");
  const sale = searchParams.get("sale") === "true";

  const filtered = products.filter((p) => {
    if (audience && !p.audience?.includes(audience)) return false;
    if (type && p.type !== type) return false;
    if (sale && !p.on_sale) return false;
    return true;
  });

  return (
    <main style={{ padding: 24 }}>
      {filtered.map((p) => (
        <Link key={p.id} href={`/product/${p.id}`}>
          <img src={optimizeCloudinary(p.images[0], 400)} />
          <div>{p.name}</div>
        </Link>
      ))}
    </main>
  );
}
