import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Menu from "@/components/Menu/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies.com",
  description: "Demo app for Oracle Mongo API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Link href={"/"}>
            <h1 className="main-title">Movies.com</h1>
          </Link>
          <Menu/>
          <Breadcrumb/>
        </header>
        {children}
      </body>
    </html>
  );
}
