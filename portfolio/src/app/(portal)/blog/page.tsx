import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiList, FiGrid } from "react-icons/fi";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and notes on AI, engineering, and building things.",
};

export default function BlogPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-24 pb-32 px-4 md:px-0">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-8">
        <div>
          <h1 className="font-display text-4xl text-foreground mb-4">
            blog
          </h1>
          <p className="text-muted-foreground text-sm">
            Thoughts, tutorials, and notes on AI, engineering, and building things.
          </p>
        </div>
        
        {/* View Toggle (Aesthetic) */}
        <div className="flex items-center gap-1 bg-[#0a0a0a] border border-border/20 rounded-md p-1 shrink-0">
          <button className="p-2 rounded bg-foreground/10 text-foreground transition-colors" aria-label="List View">
            <FiList className="w-4 h-4" />
          </button>
          <button className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors" aria-label="Grid View">
            <FiGrid className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Blog Posts List ─────────────────────────────────────────── */}
      <div className="flex flex-col space-y-12 md:space-y-16">
        {BLOG_POSTS.map((post) => (
          <article 
            key={post.id} 
            className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start border-b border-border/10 pb-12 md:pb-16 last:border-0"
          >
            {/* Post Image */}
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

            {/* Post Content */}
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
              
              <div className="flex items-center text-[10px] uppercase tracking-widest font-display text-muted-foreground/50">
                <span>Read</span>
                <span className="mx-2">·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
    </div>
  );
}
