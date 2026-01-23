import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p style={{ padding: 16 }}>Loading products…</p>}>
      <ProductsClient />
    </Suspense>
  );
}
