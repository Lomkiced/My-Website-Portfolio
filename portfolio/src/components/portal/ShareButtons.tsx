"use client";

import { useState } from "react";
import { FiLinkedin, FiLink, FiCheck } from "react-icons/fi";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleLinkedInShare}
        className="w-10 h-10 rounded-full border border-border/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
        aria-label="Share on LinkedIn"
      >
        <FiLinkedin className="w-4 h-4" />
      </button>
      <button 
        onClick={handleCopy}
        className="w-10 h-10 rounded-full border border-border/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
        aria-label="Copy Link"
      >
        {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiLink className="w-4 h-4" />}
      </button>
    </div>
  );
}
