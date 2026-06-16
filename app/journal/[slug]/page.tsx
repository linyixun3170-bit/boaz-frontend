import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-posts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | BOAZ Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://boaz-clothes.com/journal/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Previous / Next navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1
      ? blogPosts[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-cream pt-32 pb-20">
      <article className="max-w-[720px] mx-auto section-padding">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-dark/40">
          <Link
            href="/journal/"
            className="hover:text-gold transition-colors uppercase tracking-[0.15em] text-xs"
          >
            ← Back to Blog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-xs text-dark/40 uppercase tracking-[0.15em] mb-4">
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

        {/* Content */}
        <div className="prose prose-dark max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            // Headings
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
            // Bold lists
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
            // Numbered lists
            if (/^\d+\.\s/.test(line)) {
              return (
                <p key={i} className="text-dark/80 mb-2 ml-4">
                  {line}
                </p>
              );
            }
            // Table rows
            if (line.startsWith("|")) {
              return (
                <p key={i} className="text-dark/70 text-sm font-mono mb-1">
                  {line}
                </p>
              );
            }
            // Regular paragraph
            return (
              <p key={i} className="text-dark/80 leading-relaxed mb-4">
                {line}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-dark/5">
            <p className="text-xs uppercase tracking-[0.15em] text-dark/40 mb-3">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 bg-dark/5 text-dark/50 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next */}
        <nav className="mt-16 pt-8 border-t border-dark/5 flex justify-between">
          {prevPost ? (
            <Link
              href={`/journal/${prevPost.slug}`}
              className="group text-left max-w-[45%]"
            >
              <span className="text-xs text-dark/40 uppercase tracking-[0.15em]">
                ← Previous
              </span>
              <p className="text-sm text-dark/70 group-hover:text-gold transition-colors mt-1 line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/journal/${nextPost.slug}`}
              className="group text-right max-w-[45%]"
            >
              <span className="text-xs text-dark/40 uppercase tracking-[0.15em]">
                Next →
              </span>
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
