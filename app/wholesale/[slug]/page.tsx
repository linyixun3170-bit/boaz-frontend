// Server component wrapper — generates static params, renders client UI
import { products } from "@/lib/products-catalog";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient product={product} />;
}
