import Link from "next/link";
import { blogPostsZh } from "@/lib/blog-posts-zh";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客 — 服装制造与采购知识库 | BOAZ",
  description:
    "T恤定制、服装印花、面料选择、最低起订量、品质把控——来自三代服装工厂的实操指南。",
  openGraph: {
    title: "BOAZ 博客 — 服装制造与采购知识库",
    description:
      "T恤定制、服装印花、面料选择、最低起订量、品质把控——来自三代服装工厂的实操指南。",
    url: "https://boaz-clothes.com/zh/journal",
  },
};

export default function ZhJournalPage() {
  const categories = [...new Set(blogPostsZh.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-cream pt-32 pb-20">
      <div className="max-w-[1100px] mx-auto section-padding">
        <div className="mb-16">
          <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4">
            BOAZ 博客
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            服装制造与采购知识库
          </h1>
          <p className="text-dark/60 max-w-2xl text-lg leading-relaxed">
            三代服装制造经验沉淀——从面料选择到最终交付的实用指南，服务品牌方、创业者和零售商。
          </p>
        </div>

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

        {categories.map((cat) => {
          const catPosts = blogPostsZh.filter((p) => p.category === cat);
          return (
            <section key={cat} id={`cat-${cat.replace(/\s+/g, "-")}`} className="mb-16">
              <h2 className="font-heading text-2xl text-dark mb-8 pb-2 border-b border-dark/5">
                {cat}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {catPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/zh/journal/${post.slug}`}
                    className="group block bg-white rounded-sm p-6 md:p-8 hover:shadow-sm transition-all border border-transparent hover:border-dark/5"
                  >
                    <p className="text-dark/40 text-xs tracking-[0.15em] mb-3">
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
                          className="text-[10px] tracking-[0.15em] px-2.5 py-1 bg-dark/5 text-dark/50 rounded-sm"
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
