import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiArrowLeft } from "react-icons/fi";
import { BLOG_POSTS } from "@/lib/data";
import ShareButtons from "@/components/portal/ShareButtons";

interface Props {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

export function generateMetadata({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.id === params.id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  // Format content (if not provided, just render the summary as a paragraph)
  const paragraphs = post.content || [post.summary];

  return (
    <div className="w-full max-w-2xl mx-auto pb-20 px-4 md:px-0">
      
      {/* ── Top Navigation ────────────────────────────────────────────── */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <FiChevronLeft className="w-4 h-4" />
        all posts
      </Link>

      {/* ── Header Info ───────────────────────────────────────────────── */}
      <header className="mb-10">
        <div className="flex items-center text-[10px] uppercase tracking-widest font-mono text-muted-foreground/60 mb-6">
          <span>{post.date}</span>
          <span className="mx-2">·</span>
          <span>{post.readTime} READ</span>
        </div>
        
        <h1 className="font-display text-3xl md:text-[40px] leading-[1.1] text-foreground font-medium mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 border-t border-border/20 pt-6">
          <div className="w-6 h-6 rounded-full overflow-hidden relative grayscale border border-border/40">
            {/* We'll use the profile/hero picture as the author avatar */}
            <Image 
              src="/hero-picture.jpg" 
              alt="Mike Cedrick" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium text-foreground/90">Mike Cedrick</span>
        </div>
      </header>

      {/* ── Hero Image ────────────────────────────────────────────────── */}
      {post.imageUrl && (
        <div className="w-full aspect-[16/9] relative rounded-xl overflow-hidden mb-12 border border-border/20">
          <Image 
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover grayscale"
            priority
          />
        </div>
      )}

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="prose prose-invert max-w-none font-serif text-lg leading-relaxed text-foreground/80 space-y-8 mb-20">
        {paragraphs.map((p, idx) => {
          // If the ENTIRE paragraph is bold, style it as a block quote/callout
          if (p.trim().startsWith("**") && p.trim().endsWith("**") && p.trim().match(/\*\*/g)?.length === 2) {
            return (
              <p key={idx} className="font-bold text-foreground font-sans text-xl md:text-2xl leading-snug my-8 border-l-2 border-foreground/30 pl-6">
                {p.replace(/\*\*/g, "")}
              </p>
            );
          }
          
          // Inline bold parsing
          const parts = p.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx}>
              {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                }
                return part;
              })}
            </p>
          );
        })}
      </div>

      {/* ── Bottom Section ────────────────────────────────────────────── */}
      <div className="border-t border-border/20 pt-8 flex items-center justify-between">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <FiChevronLeft className="w-4 h-4" />
          all posts
        </Link>
        <ShareButtons title={post.title} />
      </div>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <div className="border-t border-border/20 mt-8 pt-8 flex items-center justify-between text-xs font-mono text-muted-foreground/60">
        <span>© {new Date().getFullYear()} Mike Cedrick</span>
        <Link href="/overview" className="hover:text-foreground transition-colors flex items-center gap-1.5">
          <FiArrowLeft className="w-3 h-3" />
          back to site
        </Link>
      </div>

    </div>
  );
}
