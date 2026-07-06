// Server component wrapper — generates static params, renders client UI
import { Metadata } from "next";
import { products } from "@/lib/products-catalog";
import ProductDetailClient from "./ProductDetailClient";
import SchemaOrg from "@/components/SchemaOrg";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  const description = `${product.tagline} ${product.weight} ${product.fabric}. ${product.fit}. MOQ ${product.moq}+. Factory-direct from China.`;

  return {
    title: `${product.name} | BOAZ Apparel`,
    description,
    openGraph: {
      title: `${product.name} | BOAZ Apparel`,
      description,
      images: [{ url: product.images.main }],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <SchemaOrg
        type="product"
        product={{
          name: product.name,
          description: product.tagline,
          image: product.images.main,
          slug: product.slug,
          moq: product.moq,
          category: product.category,
          basePriceUSD: product.basePriceUSD,
        }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
