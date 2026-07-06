import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Analytics from "@/components/Analytics";
import { LanguageProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "Boaz — Premium T-Shirt & Hoodie Manufacturing",
  description: "Three generations of garment manufacturing. Direct factory pricing. 50 MOQ. 5-day turnaround. FOB. Serving independent brands, Amazon sellers, and stores worldwide.",
  keywords: ["t-shirt manufacturer", "hoodie factory", "custom apparel", "wholesale blanks", "China garment factory", "Amazon FBA supplier", "DTG ready blanks", "vintage washed tees"],
  authors: [{ name: "Boaz Apparel" }],
  creator: "Boaz Apparel",
  publisher: "Boaz Apparel",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boaz-clothes.com",
    siteName: "Boaz Apparel",
    title: "Boaz — Premium T-Shirt & Hoodie Manufacturing",
    description: "Three generations of garment manufacturing. From $0.85 blanks to $9.90 heavyweight hoodies. 50 MOQ. 5-day turnaround. FOB.",
    images: [
      {
        url: "https://boaz-clothes.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Boaz Apparel — Premium T-Shirt & Hoodie Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boaz — Premium T-Shirt & Hoodie Manufacturing",
    description: "Three generations of garment manufacturing. 50 MOQ. 5-day turnaround.",
    images: ["https://boaz-clothes.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://boaz-clothes.com",
  },
  verification: {
    google: "v9OAS8SJyq5uWjs74yg7ZM4s4O6yV9nE1lckO0uTtgo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <LanguageProvider>
            <CustomCursor />
            <Navbar />
            {children}
          </LanguageProvider>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
