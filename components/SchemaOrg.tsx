// 🔍 Schema.org 结构化数据 — 服务端组件，在 SSG 时直接嵌入 HTML
// 无 "use client"，确保 JSON-LD 出现在静态 HTML 中

interface SchemaOrgProps {
  type?: "home" | "product" | "about" | "contact" | "wholesale";
  product?: {
    name: string;
    description: string;
    image: string;
    slug: string;
    moq: number;
    category: string;
    basePriceUSD?: number;
  };
}

const BASE = "https://boaz-clothes.com";

export default function SchemaOrg({ type = "home", product }: SchemaOrgProps) {
  const schemas: Record<string, object> = {
    home: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${BASE}/#organization`,
          name: "BOAZ Apparel",
          url: BASE,
          logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
          description:
            "Premium T-shirt and hoodie manufacturing factory. 50 MOQ. Direct factory ownership.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hangzhou",
            addressCountry: "CN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sale@boaz-clothes.com",
            telephone: "+8618868798631",
            availableLanguage: ["English", "Chinese"],
          },
          sameAs: ["https://instagram.com/boaz.apparel"],
        },
        {
          "@type": "WebSite",
          "@id": `${BASE}/#website`,
          url: BASE,
          name: "BOAZ Apparel",
          publisher: { "@id": `${BASE}/#organization` },
        },
        {
          "@type": "WebPage",
          "@id": `${BASE}/#webpage`,
          url: BASE,
          name: "Premium Apparel Manufacturing | BOAZ",
          isPartOf: { "@id": `${BASE}/#website` },
          about: { "@id": `${BASE}/#organization` },
        },
      ],
    },
    product: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image.startsWith("http")
            ? product.image
            : `${BASE}${product.image}`,
          url: `${BASE}/wholesale/${product.slug}`,
          category: product.category,
          brand: { "@type": "Brand", name: "BOAZ Apparel" },
          sku: product.slug,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            ...(product.basePriceUSD
              ? { price: product.basePriceUSD, priceCurrency: "USD" }
              : {}),
            seller: { "@type": "Organization", "@id": `${BASE}/#organization` },
          },
        }
      : {},
    about: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Why BOAZ — Factory-Direct Manufacturing",
      description:
        "Learn why BOAZ is different from apparel brokers. Direct factory ownership, transparent pricing, and quality control.",
    },
    contact: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact BOAZ Apparel",
      description:
        "Get a quote for premium apparel manufacturing. Free samples available.",
    },
    wholesale: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Wholesale Apparel Catalog",
      description:
        "Browse our catalog of premium blank t-shirts, hoodies, and more. MOQ starts at 50 units.",
    },
  };

  const schema = schemas[type];
  if (!schema || (type === "product" && !product)) return null;

  return (
    <script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
