import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { getFeaturedPosts, type BlogPost } from "../utils/blogServiceUnified";
import { getAuthorSlugByName } from "../utils/authorService";

interface FeaturedArticlesProps {
  onNavigate?: (page: string, post?: BlogPost, authorSlug?: string) => void;
  refreshKey?: number;
  cachedFeatured?: BlogPost[] | null;
}

export function FeaturedArticles({ onNavigate, refreshKey, cachedFeatured }: FeaturedArticlesProps) {
  const [articles, setArticles] = useState<BlogPost[]>(cachedFeatured || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use cached data from parent if available
    if (cachedFeatured && cachedFeatured.length > 0) {
      setArticles(cachedFeatured);
      setLoading(false);
      return;
    }

    async function fetchFeaturedPosts() {
      try {
        setLoading(true);
        const posts = await getFeaturedPosts();
        if (posts && posts.length > 0) {
          setArticles(posts);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.log("Error loading featured posts. Add blog posts via /admin page.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPosts();
  }, [refreshKey, cachedFeatured]); // Reload whenever refreshKey changes

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="featured" className="py-24 bg-white/50 bg-[rgb(255,255,255)]">
      <div className="max-w-6xl mx-auto px-4 bg-[rgba(241,239,237,0)]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="mb-2">Featured Articles</h2>
          </div>
          <Button 
            variant="secondary"
            onClick={() => onNavigate?.('blog')}
          >
            View All
          </Button>
        </div>

        {articles.length === 0 ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center max-w-xl">
              <p className="text-2xl font-['Baskerville_URW_Medium',_serif] text-[#64767C] italic">
                Articles coming soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-[#C6C0B4] rounded-xl cursor-pointer"
                onClick={() => onNavigate?.('post', article)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-[#64767C] mb-3 bg-[rgba(26,34,39,0)]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs text-[rgb(26,34,39)]">{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                  
                  <h3 className="mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-[rgb(26,34,39)] mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4 border-t border-[#C6C0B4]/20 pt-4">
                    {article.authorLogoUrl && (
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-[#C6C0B4]/30">
                        <ImageWithFallback
                          src={article.authorLogoUrl}
                          alt={article.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-xs text-[rgb(26,34,39)] text-left">
                      By <button 
                        onClick={async (e) => {
                          e.stopPropagation();
                          const slug = await getAuthorSlugByName(article.author);
                          if (slug) {
                            onNavigate?.('bio-author', undefined, slug);
                          }
                        }}
                        className="hover:text-[#64767C] underline underline-offset-4 decoration-[#C6C0B4]/50 cursor-pointer"
                      >
                        {article.author}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="gap-1 p-0 h-auto hover:gap-2 transition-all text-[#64767C] hover:text-[#64767C]/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate?.('post', article);
                    }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}