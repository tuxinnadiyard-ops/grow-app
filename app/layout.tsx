import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grow App",
  description: "Indoor horticultural grow journal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body
        className={`${inter.className} min-h-full bg-transparent text-white`}
      >
        {children}
      </body>
    </html>
  );
}