import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Apparel Manufacturing Insights | BOAZ",
  description:
    "Expert guides on t-shirt manufacturing, screen printing, DTG, embroidery, fabric quality, MOQs, and building your clothing brand. Direct from a third-generation garment factory.",
  openGraph: {
    title: "BOAZ Blog — Apparel Manufacturing Insights",
    description:
      "Expert guides on t-shirt manufacturing, screen printing, DTG, embroidery, fabric quality, MOQs, and building your clothing brand.",
    url: "https://boaz-clothes.com/journal",
  },
};

export default function JournalPage() {
  // Group by category
  const categories = [...new Set(blogPosts.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-cream pt-32 pb-20">
      <div className="max-w-[1100px] mx-auto section-padding">
        {/* Header */}
        <div className="mb-16">
          <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4">
            BOAZ Blog
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            Apparel Manufacturing Insights
          </h1>
          <p className="text-dark/60 max-w-2xl text-lg leading-relaxed">
            Three generations of garment manufacturing expertise — from fabric
            selection to final delivery. Practical guides for brands, startups,
            and retailers.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#cat-${cat.replace(/\s+/g, "-")}`}
              className="text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-dark/10 text-dark/60 hover:border-gold hover:text-gold transition-all"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Posts by category */}
        {categories.map((cat) => {
          const posts = blogPosts.filter((p) => p.category === cat);
          return (
            <section key={cat} id={`cat-${cat.replace(/\s+/g, "-")}`} className="mb-16">
              <h2 className="font-heading text-2xl text-dark mb-8 pb-2 border-b border-dark/5">
                {cat}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/journal/${post.slug}`}
                    className="group block bg-white rounded-sm p-6 md:p-8 hover:shadow-sm transition-all border border-transparent hover:border-dark/5"
                  >
                    <p className="text-dark/40 text-xs uppercase tracking-[0.15em] mb-3">
                      {post.date}
                    </p>
                    <h3 className="font-heading text-xl text-dark group-hover:text-gold transition-colors mb-3">
                      {post.title}
                    </h3>
                    <p className="text-dark/60 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 bg-dark/5 text-dark/50 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
