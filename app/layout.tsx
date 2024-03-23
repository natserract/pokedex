import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { env } from "process";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: `Pokémon API`,
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/logo.png" }],
  metadataBase:
    env.NODE_ENV === "production"
      ? new URL("https://pokeapi.co/")
      : new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
