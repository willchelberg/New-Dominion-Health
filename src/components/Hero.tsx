import { Button } from "./ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
import { getAllPosts, type BlogPost } from "../utils/blogServiceUnified";
import { getAuthorSlugByName } from "../utils/authorService";

interface HeroProps {
  onNavigate: (page: string, post?: BlogPost, authorSlug?: string) => void;
  refreshKey?: number;
  cachedLatest?: BlogPost | null;
}

export function Hero({ onNavigate, refreshKey, cachedLatest }: HeroProps) {
  const [latestArticle, setLatestArticle] = useState<BlogPost | null>(cachedLatest || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use cached data from parent if available
    if (cachedLatest) {
      setLatestArticle(cachedLatest);
      setLoading(false);
      return;
    }

    async function fetchLatestArticle() {
      try {
        setLoading(true);
        const posts = await getAllPosts();
        if (posts && posts.length > 0) {
          // Get the most recent article
          const sorted = posts.sort((a, b) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          setLatestArticle(sorted[0]);
        } else {
          setLatestArticle(null);
        }
      } catch (error) {
        console.log("Error loading latest article");
        setLatestArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestArticle();
  }, [refreshKey, cachedLatest]);

  return (
    <section className="relative overflow-hidden bg-[rgb(255,255,255)]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Section - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl leading-tight mb-6">
                  Christ-Centered Health & Wellness
                </h1>
                
                <p className="text-[#64767C] text-lg md:text-xl leading-relaxed max-w-md">
                  Discover practical, biblical insights for a Christ-centered approach to health and wellness.
                </p>
              </div>

              {/* Compact Substack Newsletter Subscription */}
              <div className="space-y-3">
                <div className="bg-[#F1EFED] rounded-lg p-4 max-w-md overflow-hidden">
  <iframe 
    src="https://newdominionhealth.substack.com/embed" 
    width="100%" 
    height="150" 
    style={{ border: 'none', background: 'transparent', maxWidth: '100%' }} 
    frameBorder="0" 
    scrolling="no"
    sandbox="allow-scripts allow-forms allow-same-origin allow-popups-to-escape-sandbox"
    title="Subscribe to newsletter"
  />
</div>
                <p className="text-sm text-[#64767C]">
                  
                </p>
              </div>
            </div>

            {/* Right Section - Featured Article */}
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 flex items-center">
                <span 
                  className="text-xs tracking-[0.3em] text-[#64767C] uppercase"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  Featured
                </span>
              </div>

              {latestArticle ? (
                <Card 
                  className="overflow-hidden border border-[#C6C0B4] rounded-2xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  onClick={() => onNavigate('post', latestArticle)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback 
                      src={latestArticle.imageUrl}
                      alt={latestArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl mb-3">
                      {latestArticle.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      {latestArticle.authorLogoUrl && (
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-[#C6C0B4]/30">
                          <ImageWithFallback
                            src={latestArticle.authorLogoUrl}
                            alt={latestArticle.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="text-sm text-[rgb(26,34,39)]">
                        By <button 
                          onClick={async (e) => {
                            e.stopPropagation();
                            const slug = await getAuthorSlugByName(latestArticle.author);
                            if (slug) {
                              onNavigate('bio-author', undefined, slug);
                            }
                          }}
                          className="hover:text-[#64767C] underline underline-offset-4 decoration-[#C6C0B4]/50 cursor-pointer"
                        >
                          {latestArticle.author}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-[#1A2227] mb-6 leading-relaxed line-clamp-3">
                      {latestArticle.excerpt}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="border-[#64767C] text-[#64767C] hover:bg-[#64767C] hover:text-white rounded-full px-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('post', latestArticle);
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center min-h-[300px]">
                  <div className="text-center max-w-xl">
                    <p className="text-2xl font-['Baskerville_URW_Medium',_serif] text-[#64767C] italic">
                      Articles coming soon.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}