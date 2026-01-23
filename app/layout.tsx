import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { CategoryProvider } from "./context/CategoryContext";
import { WishlistProvider } from "./context/WishlistContext";

/* 🔥 THIS LINE FIXES THE BUILD */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "CHUMUNG CLOTHING",
  description: "Premium thrift fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={body}>
        <AuthProvider>
          <WishlistProvider>
            <CategoryProvider>
              <ProductProvider>
                <CartProvider>
                  <OrderProvider>
                    <Header />
                    <main style={main}>{children}</main>
                    <Footer />
                  </OrderProvider>
                </CartProvider>
              </ProductProvider>
            </CategoryProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

/* ================= STYLES ================= */

const body = {
  margin: 0,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
};

const main = {
  flex: 1,
  paddingTop: "64px",
};
