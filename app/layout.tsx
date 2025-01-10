import { Urbanist } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";

const urbanist = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New app",
  description: "bla bla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={`${urbanist.className}  antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
