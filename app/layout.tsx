import type { Metadata } from "next";
import { Hanken_Grotesk, Prata } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { siteMeta } from "@/content/site";

import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken"
});

const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-prata"
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: {
    default: "Lençóis Condomínio de Lotes",
    template: "%s | Lençóis"
  },
  description: siteMeta.description,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang={siteMeta.locale}>
      <body className={`${hankenGrotesk.variable} ${prata.variable}`}>
        <SiteHeader nav={siteMeta.nav} lotPlanHref={siteMeta.lotPlanHref} />
        <main id="content">{children}</main>
        <SiteFooter site={siteMeta} />
      </body>
    </html>
  );
}
