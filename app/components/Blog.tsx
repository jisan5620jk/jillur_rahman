"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
};

// Optional: hardcoded fallback posts
const FALLBACK_BLOG_POSTS: Article[] = [
  {
    id: 1,
    title:
      "Building Scalable Frontends with Next.js 14 and React Server Components",
    excerpt:
      "Learn how to structure your Next.js app for optimal scalability, leveraging new server actions and caching.",
    date: "Oct 12, 2025",
    tags: ["Next.js", "Frontend", "Performance"],
    slug: "scalable-frontends-next14",
  },
  {
    id: 2,
    title: "Mastering GSAP Animations for Modern Web Interfaces",
    excerpt:
      "Step-by-step breakdown on creating smooth, GPU-accelerated animations with GSAP in your React projects.",
    date: "Sep 28, 2025",
    tags: ["GSAP", "Animation", "UI"],
    slug: "gsap-animations-ui",
  },
  {
    id: 3,
    title: "10 UI Patterns That Improve Developer Portfolios",
    excerpt:
      "Want your portfolio to stand out? Here are 10 design and interaction patterns that increase engagement.",
    date: "Aug 15, 2025",
    tags: ["UX", "Portfolio", "Design"],
    slug: "portfolio-ui-patterns",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [posts, setPosts] = useState<Article[]>(FALLBACK_BLOG_POSTS);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".blog-heading", { y: -20, opacity: 0, duration: 0.6 });
      gsap.from(".blog-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Optional: fetch posts from an API safely
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog"); // replace with your API endpoint
        if (!res.ok) throw new Error(res.status.toString());
        const data: Article[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.warn("Failed to fetch blog posts, using fallback.", err);
        setPosts(FALLBACK_BLOG_POSTS);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 lg:px-12 bg-[var(--color-bg-alt)]"
      id="blog"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="blog-heading text-3xl md:text-4xl font-[var(--font-poppins)] font-bold text-[var(--color-heading)]">
            Latest Articles
          </h2>
          <p className="text-[var(--color-muted)] mt-3 max-w-2xl mx-auto">
            Sharing my insights, lessons, and experiments from building for the
            web.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="blog-card border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)] p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-sm text-[var(--color-muted)] mb-2">
                {post.date}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
                {post.title}
              </h3>
              <p className="text-[var(--color-text)] mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] px-2 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block text-[var(--color-primary)] font-medium hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
