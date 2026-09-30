"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiList, FiGrid } from "react-icons/fi";
import { type BlogPost } from "@/lib/data";

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-8">
        <div>
          <h1 className="font-display text-4xl text-foreground mb-4">blog</h1>
          <p className="text-muted-foreground text-sm">
            Thoughts, tutorials, and notes on AI, engineering, and building things.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#0a0a0a] border border-border/20 rounded-md p-1 shrink-0">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-foreground/10 text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
            aria-label="List View"
          >
            <FiList className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-foreground/10 text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
            aria-label="Grid View"
          >
            <FiGrid className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Blog Posts ─────────────────────────────────────────── */}
      {viewMode === "list" ? (
        <div className="flex flex-col space-y-12 md:space-y-16 max-w-4xl">
          {[...posts].reverse().map((post) => (
            <article
              key={post.id}
              className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start border-b border-border/10 pb-12 md:pb-16 last:border-0"
            >
              {post.imageUrl && (
                <Link
                  href={`/blog/${post.id}`}
                  className="w-full md:w-[280px] shrink-0 aspect-[16/10] relative rounded-lg overflow-hidden border border-border/20 bg-background/50"
                >
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </Link>
              )}

              <div className="flex-1 flex flex-col pt-1">
                <span className="font-mono text-xs text-muted-foreground/60 mb-3">
                  {post.date}
                </span>

                <Link href={`/blog/${post.id}`}>
                  <h2 className="font-display text-xl md:text-2xl text-foreground font-medium mb-3 group-hover:text-foreground/80 transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6 line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
                  <span>Read</span>
                  <span className="mx-2">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 w-full">
          {[...posts].reverse().map((post) => (
            <article key={post.id} className="group flex flex-col">
              {post.imageUrl && (
                <Link
                  href={`/blog/${post.id}`}
                  className="w-full aspect-[16/10] relative rounded-xl overflow-hidden border border-border/10 bg-[#080808] mb-5 shadow-md"
                >
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                </Link>
              )}

              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-3">
                {post.date}
              </span>

              <Link href={`/blog/${post.id}`}>
                <h2 className="font-display text-[22px] text-foreground font-bold leading-[1.25] mb-4 group-hover:text-foreground/80 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <div className="mt-auto flex items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
                <span>Read</span>
                <span className="mx-2 text-border">·</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
