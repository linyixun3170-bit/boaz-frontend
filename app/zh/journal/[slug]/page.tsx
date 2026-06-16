import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPostsZh } from "@/lib/blog-posts-zh";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPostsZh.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsZh.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | BOAZ`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://boaz-clothes.com/zh/journal/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00Z").toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ZhBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsZh.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPostsZh.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPostsZh[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPostsZh.length - 1
      ? blogPostsZh[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-cream pt-32 pb-20">
      <article className="max-w-[720px] mx-auto section-padding">
        <nav className="mb-8 text-sm text-dark/40">
          <Link
            href="/zh/journal/"
            className="hover:text-gold transition-colors text-xs"
          >
            ← 返回博客
          </Link>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 text-xs text-dark/40 mb-4">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-dark/20" />
            <span>{formatDate(post.date)}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-dark leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-dark/60 text-lg leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-dark max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-heading text-2xl text-dark mt-10 mb-4"
                >
                  {line.slice(3)}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="font-heading text-xl text-dark mt-8 mb-3"
                >
                  {line.slice(4)}
                </h3>
              );
            }
            if (line.startsWith("**") && line.includes("** —")) {
              const [bold, rest] = line.split("** — ");
              return (
                <p key={i} className="text-dark/80 mb-3">
                  <strong className="text-dark">
                    {bold.replace(/\*\*/g, "")}
                  </strong>
                  {" — "}
                  {rest}
                </p>
              );
            }
            if (/^\d+\.\s/.test(line)) {
              return (
                <p key={i} className="text-dark/80 mb-2 ml-4">
                  {line}
                </p>
              );
            }
            if (line.startsWith("|")) {
              return (
                <p key={i} className="text-dark/70 text-sm font-mono mb-1">
                  {line}
                </p>
              );
            }
            return (
              <p key={i} className="text-dark/80 leading-relaxed mb-4">
                {line}
              </p>
            );
          })}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-dark/5">
            <p className="text-xs text-dark/40 mb-3">标签</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1.5 bg-dark/5 text-dark/50 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <nav className="mt-16 pt-8 border-t border-dark/5 flex justify-between">
          {prevPost ? (
            <Link
              href={`/zh/journal/${prevPost.slug}`}
              className="group text-left max-w-[45%]"
            >
              <span className="text-xs text-dark/40">← 上一篇</span>
              <p className="text-sm text-dark/70 group-hover:text-gold transition-colors mt-1 line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/zh/journal/${nextPost.slug}`}
              className="group text-right max-w-[45%]"
            >
              <span className="text-xs text-dark/40">下一篇 →</span>
              <p className="text-sm text-dark/70 group-hover:text-gold transition-colors mt-1 line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </main>
  );
}
