import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data";
import BlogContent from "@/components/sections/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and notes on AI, engineering, and building things.",
};

export default function BlogPage() {
  return (
    <div className="w-full max-w-5xl mx-auto pt-24 pb-32 px-4 md:px-8">
      <BlogContent posts={BLOG_POSTS} />
    </div>
  );
}
