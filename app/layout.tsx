import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "CHUMUNG CLOTHING",
  description: "Thrift fashion store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#F6F1EA", color: "#1A1A1D" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
