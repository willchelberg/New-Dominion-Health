import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowLeft, Facebook, Printer, Link2, Upload, Calendar, Linkedin, Instagram } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";
import { type BlogPost } from "../utils/blogServiceUnified";
import { useState, useMemo, useEffect, useRef } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { addAuthorLinksToHTML, attachAuthorLinkHandlers } from "../utils/authorLinkProcessor";
import { getAuthorSlugByName } from "../utils/authorService";

// Custom X (Twitter) Icon Component
const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface Author {
  id: string;
  name: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (page: string) => void;
}

export function BlogPostPage({ post, onNavigate }: BlogPostPageProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [showShareMessage, setShowShareMessage] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load all authors for tagging
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-19263118/authors`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAuthors(data);
        }
      } catch (error) {
        console.error("Error loading authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  // Attach click handlers for author links
  useEffect(() => {
    if (contentRef.current && authors.length > 0) {
      const cleanup = attachAuthorLinkHandlers(contentRef.current, onNavigate);
      return cleanup;
    }
  }, [authors, onNavigate, post.content]);

  // Parse author names and create links
  const parseAuthorLinks = (authorString: string) => {
    // Check if it's a co-authored post (contains "and")
    if (authorString.includes(' and ')) {
      const authorNames = authorString.split(' and ');
      return (
        <>
          {authorNames.map((authorName, index) => {
            const trimmedAuthor = authorName.trim();
            return (
              <span key={trimmedAuthor}>
                {index > 0 && ' and '}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const slug = await getAuthorSlugByName(trimmedAuthor);
                    if (slug) {
                      window.dispatchEvent(new CustomEvent('navigate', { 
                        detail: { page: 'bio-author', authorSlug: slug } 
                      }));
                    }
                  }}
                  className="hover:text-[#64767C] underline underline-offset-4 decoration-[#C6C0B4] cursor-pointer"
                >
                  {trimmedAuthor}
                </button>
              </span>
            );
          })}
        </>
      );
    }

    // Single author
    return (
      <button
        onClick={async (e) => {
          e.stopPropagation();
          const slug = await getAuthorSlugByName(authorString);
          if (slug) {
            window.dispatchEvent(new CustomEvent('navigate', { 
              detail: { page: 'bio-author', authorSlug: slug } 
            }));
          }
        }}
        className="hover:text-[#64767C] underline underline-offset-4 decoration-[#C6C0B4] cursor-pointer"
      >
        {authorString}
      </button>
    );
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support URL sharing, opens app
    };

    if (platform === 'copy') {
      // Fallback method for copying text
      const copyToClipboard = async (text: string) => {
        try {
          await navigator.clipboard.writeText(text);
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
          // Fallback for browsers that don't support clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          } catch (error) {
            console.error('Failed to copy:', error);
          }
          textArea.remove();
        }
      };
      copyToClipboard(window.location.href);
    } else if (platform === 'print') {
      window.print();
    } else if (platform === 'share') {
      // Use native share if available, otherwise fallback to copy link
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
        .then(() => {
          setShowShareMessage(true);
          setTimeout(() => setShowShareMessage(false), 2000);
        })
        .catch(err => {
          // If user cancels or error occurs, copy link as fallback
          if (err.name !== 'AbortError') {
            console.log('Share failed, copying link instead:', err);
            const copyToClipboard = async (text: string) => {
              try {
                await navigator.clipboard.writeText(text);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
              } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                  document.execCommand('copy');
                  setShowCopied(true);
                  setTimeout(() => setShowCopied(false), 2000);
                } catch (error) {
                  console.error('Failed to copy:', error);
                }
                textArea.remove();
              }
            };
            copyToClipboard(window.location.href);
          }
        });
      } else {
        // Fallback to copy link if native share not supported
        const copyToClipboard = async (text: string) => {
          try {
            await navigator.clipboard.writeText(text);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
              document.execCommand('copy');
              setShowCopied(true);
              setTimeout(() => setShowCopied(false), 2000);
            } catch (error) {
              console.error('Failed to copy:', error);
            }
            textArea.remove();
          }
        };
        copyToClipboard(window.location.href);
      }
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Calculate read time based on content length (memoized to avoid recalculation)
  const readTime = useMemo(() => {
    const wordsPerMinute = 200;
    // Strip HTML tags for accurate word count
    const text = post.content.replace(/<[^>]*>/g, ' ');
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }, [post.content]);

  // Check if content contains HTML tags (memoized)
  const isHTMLContent = useMemo(() => {
    return /<[^>]*>/g.test(post.content);
  }, [post.content]);

  // Process HTML content to add author links (memoized)
  const processedContent = useMemo(() => {
    if (isHTMLContent && authors.length > 0) {
      return addAuthorLinksToHTML(post.content, authors);
    }
    return post.content;
  }, [post.content, authors, isHTMLContent]);

  // Format paragraphs from content (for plain text content)
  const formatContent = (content: string) => {
    return content.split('\\\\n\\\\n').map((paragraph, index) => (
      <p key={index} className="text-[rgb(26,34,39)] leading-relaxed mb-6">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={`${post.title} - New Dominion Health`}
        description={post.excerpt}
        image={post.imageUrl}
        type="article"
        author={post.author}
        publishedTime={post.publishedAt}
        keywords={Array.isArray(post.category) ? post.category.join(', ') : post.category}
      />
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('blog')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>

      {/* Article container with sidebar for share icons */}
      <div className="container mx-auto px-4 relative">
        <div className="flex gap-8 max-w-5xl mx-auto">
          {/* Social Share Sidebar - Fixed on left */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={() => handleShare('facebook')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5 text-[#6E6D5F]" />
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                title="Share on Twitter"
              >
                <TwitterXIcon className="w-5 h-5 text-[#6E6D5F]" />
              </button>
              
              <button
                onClick={() => handleShare('print')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                title="Print"
              >
                <Printer className="w-5 h-5 text-[#6E6D5F]" />
              </button>
              
              <button
                onClick={() => handleShare('share')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                title="Share"
              >
                <Upload className="w-5 h-5 text-[#6E6D5F]" />
              </button>
              
              <button
                onClick={() => handleShare('copy')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors relative"
                title="Copy link"
              >
                <Link2 className="w-5 h-5 text-[#6E6D5F]" />
                {showCopied && (
                  <span className="absolute left-12 bg-[#6E6D5F] text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
              
              {/* Vertical SHARE text */}
              <div className="mt-4 flex items-center justify-center">
                <span 
                  className="text-[#6E6D5F] text-xs tracking-[0.2em] uppercase font-bold"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  SHARE
                </span>
              </div>
            </div>
          </div>

          {/* Main article content */}
          <article className="flex-1 max-w-3xl">
            {/* Centered Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl mb-6">{post.title}</h1>
            </div>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Author info and meta */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#C6C0B4]">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {post.authorLogoUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#C6C0B4]">
                      <ImageWithFallback
                        src={post.authorLogoUrl}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-[rgb(26,34,39)] mb-1">
                      By {parseAuthorLinks(post.author)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#64767C]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none
              prose-headings:font-['Baskerville_URW_Medium',_serif]
              prose-headings:text-[#1A2227]
              prose-p:text-[#1A2227]
              prose-p:leading-relaxed
              prose-a:text-[#64767C]
              prose-a:underline
              prose-a:hover:text-[#6E6D5F]
              prose-strong:text-[#1A2227]
              prose-ul:text-[#1A2227]
              prose-ol:text-[#1A2227]
              prose-li:text-[#1A2227]
              prose-blockquote:border-l-[#64767C]
              prose-blockquote:text-[#64767C]
              prose-blockquote:italic
              prose-code:text-[#64767C]
              prose-code:bg-[#F1EFED]
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              prose-pre:bg-[#1A2227]
              prose-pre:text-white">
              {isHTMLContent ? (
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
              ) : (
                formatContent(post.content)
              )}
            </div>

            {/* Mobile share buttons */}
            <div className="lg:hidden mt-12 pt-8 border-t border-[#C6C0B4]">
              <h3 className="text-lg mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#6E6D5F]" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <TwitterXIcon className="w-4 h-4 text-[#6E6D5F]" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#6E6D5F]" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#6E6D5F]" />
                  Instagram
                </button>
                <button
                  onClick={() => handleShare('print')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#6E6D5F]" />
                  Print
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <Link2 className="w-4 h-4 text-[#6E6D5F]" />
                  {showCopied ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => handleShare('share')}
                  className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#F1EFED] hover:bg-[#C6C0B4] transition-colors"
                >
                  <Upload className="w-4 h-4 text-[#6E6D5F]" />
                  Share
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Back to blog */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center">
          <Button
            onClick={() => onNavigate('blog')}
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Button>
        </div>
      </div>
    </div>
  );
}