"use client";

import Script from "next/script";

// ============================================================
// 🔍 Schema.org 结构化数据
// 
// 这是 SEO 的隐藏王牌。Google 用这些数据生成富媒体摘要。
// B2B 网站尤其需要 Organization 和 Product 的 Schema。
// ============================================================

interface SchemaOrgProps {
  type?: "home" | "product" | "about" | "contact" | "wholesale";
}

export default function SchemaOrg({ type = "home" }: SchemaOrgProps) {
  const schemas: Record<string, object> = {
    home: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://boaz.apparel/#organization",
          name: "BOAZ Apparel",
          url: "https://boaz.apparel",
          logo: {
            "@type": "ImageObject",
            url: "https://boaz.apparel/logo.png",
          },
          description:
            "Premium T-shirt and hoodie manufacturing factory in Guangzhou. 50 MOQ. Direct production line ownership.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Guangzhou",
            addressCountry: "CN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "hello@boaz.apparel",
            telephone: "+8618868798631",
            availableLanguage: ["English", "Chinese"],
          },
          sameAs: [
            "https://instagram.com/boaz.apparel",
            "https://linkedin.com/company/boaz-apparel",
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://boaz.apparel/#website",
          url: "https://boaz.apparel",
          name: "BOAZ Apparel",
          publisher: {
            "@id": "https://boaz.apparel/#organization",
          },
        },
        {
          "@type": "WebPage",
          "@id": "https://boaz.apparel/#webpage",
          url: "https://boaz.apparel",
          name: "Premium Apparel Manufacturing | BOAZ",
          isPartOf: {
            "@id": "https://boaz.apparel/#website",
          },
          about: {
            "@id": "https://boaz.apparel/#organization",
          },
        },
      ],
    },
    product: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Product",
          name: "Classic Heavyweight Tee",
          description: "240gsm 100% combed cotton t-shirt",
          image: "https://boaz.apparel/products/heavyweight-tee.jpg",
          brand: {
            "@type": "Brand",
            name: "BOAZ",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "BOAZ Apparel",
            },
          },
        },
      ],
    },
    about: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Why BOAZ — Factory-Direct Manufacturing",
      description:
        "Learn why BOAZ is different from apparel brokers. Direct factory ownership, transparent pricing, and certified quality control.",
    },
    contact: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact BOAZ Apparel",
      description: "Get a quote for premium apparel manufacturing. Free samples available.",
    },
    wholesale: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Wholesale Apparel Catalog",
      description: "Browse our catalog of premium blank t-shirts, hoodies, and crewnecks. MOQ starts at 50 units.",
    },
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas[type]),
      }}
    />
  );
}
