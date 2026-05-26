import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Boaz — Premium T-Shirt & Hoodie Manufacturing",
  description: "Three generations of garment manufacturing. From ¥6 blanks to ¥70 heavyweight hoodies. 50 MOQ. 5-day turnaround. Serving independent brands, Amazon sellers, and stores worldwide.",
  keywords: ["t-shirt manufacturer", "hoodie factory", "custom apparel", "wholesale blanks", "China garment factory", "Amazon FBA supplier", "DTG ready blanks", "vintage washed tees"],
  authors: [{ name: "Boaz Apparel" }],
  creator: "Boaz Apparel",
  publisher: "Boaz Apparel",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boazclothes.com",
    siteName: "Boaz Apparel",
    title: "Boaz — Premium T-Shirt & Hoodie Manufacturing",
    description: "Three generations of garment manufacturing. From ¥6 blanks to ¥70 heavyweight hoodies. 50 MOQ. 5-day turnaround.",
    images: [
      {
        url: "https://boazclothes.com/og-image.jpg",
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
    images: ["https://boazclothes.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://boazclothes.com",
  },
  verification: {
    google: "your-google-verification-code",
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
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
