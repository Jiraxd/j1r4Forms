import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J1R4 Forms",
  description: "Create forms and get answers to them!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={"dark"}>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
