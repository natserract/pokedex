import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { env } from "process";
import "~/styles/globals.css";
import "~/styles/nprogress.css";

import NProgress from "~/components/base/nprogress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Pokedex",
    default: "Pokedex",
  },
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
    <html lang="en" data-theme="dark">
      <body className={inter.className}>{children}</body>

      <NProgress />
    </html>
  );
}
