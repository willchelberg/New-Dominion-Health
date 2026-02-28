import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, Clock, Search, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect, useCallback } from "react";
import { getAllPosts, type BlogPost } from "../utils/blogServiceUnified";
import { getAuthorSlugByName } from "../utils/authorService";
import { SEO } from "../components/SEO";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { BlogPostGridSkeleton } from "../components/LoadingSpinner";

interface BlogPageProps {
  onNavigate?: (page: string, post?: BlogPost, authorSlug?: string) => void;
  refreshKey?: number;
}

const categories = ['All', 'Nutrition', 'Exercise', 'Embodied Health', 'Faith & Purpose'] as const;
type Category = typeof categories[number];

export function BlogPage({ onNavigate, refreshKey }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const postsPerPage = 8; // Show 8 posts per page (4 rows of 2 columns)

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        setLoading(true);
        const data = await getAllPosts();
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.log("Error fetching posts. Add blog posts via /admin page.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPosts();
  }, [refreshKey]); // Reload whenever refreshKey changes

  // Reset to page 1 when posts change
  useEffect(() => {
    setCurrentPage(1);
  }, [posts.length, refreshKey]);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Memoize the click handler to prevent unnecessary recreations
  const handlePostClick = useCallback((post: BlogPost) => {
    onNavigate?.('post', post);
  }, [onNavigate]);

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
                      onNavigate?.('bio-author', undefined, slug);
                    }
                  }}
                  className="hover:text-[#64767C] underline underline-offset-4 decoration-[#C6C0B4]/50 cursor-pointer"
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
            onNavigate?.('bio-author', undefined, slug);
          }
        }}
        className="hover:text-[#64767C] underline underline-offset-4 decoration-[#C6C0B4]/50 cursor-pointer"
      >
        {authorString}
      </button>
    );
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    // Category filter
    const postCategories = Array.isArray(post.category) ? post.category : [post.category];
    const categoryMatch = selectedCategory === 'All' || postCategories.includes(selectedCategory);
    
    // Search filter - search in title, excerpt, author, AND categories
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      postCategories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Add keyboard shortcut to close search (ESC key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchExpanded) {
        setSearchQuery('');
        setSearchExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchExpanded]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-16 bg-[#FFFFFF]">
      <SEO 
        title="Articles - New Dominion Health"
        description="Browse our collection of faith-based health and wellness articles covering nutrition, exercise, embodied health, and faith & purpose."
        keywords="Christian health articles, faith-based wellness blog, nutrition articles, exercise tips, embodied health, faith and purpose"
      />
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center relative">
          <h1 className="text-3xl mb-4">Articles</h1>
          <p className="text-[#64767C] max-w-2xl mx-auto">

          </p>

          {/* Expandable Search - Top Right */}
          <div className="absolute top-0 right-0">
            {!searchExpanded ? (
              <button
                onClick={() => setSearchExpanded(true)}
                className="p-2 hover:bg-[#F1EFED] rounded-full transition-colors"
                aria-label="Open search"
              >
                <Search className="w-5 h-5 text-[#64767C]" />
              </button>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64767C]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    // Delay to allow clicking clear or continuing to type
                    setTimeout(() => {
                      if (!searchQuery) setSearchExpanded(false);
                    }, 150);
                  }}
                  autoFocus
                  className="w-64 pl-10 pr-4 py-2 border border-[#C6C0B4] rounded-lg focus:outline-none focus:border-[#64767C] text-[rgb(26,34,39)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchExpanded(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64767C] hover:text-[#6E6D5F]"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Category Filters - Clean text links */}
        <div className="mb-12 flex items-center justify-center gap-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-base transition-colors ${
                selectedCategory === category
                  ? 'text-[#6E6D5F] font-medium'
                  : 'text-[#64767C] hover:text-[#6E6D5F]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active Search/Filter Indicator */}
        {(searchQuery || selectedCategory !== 'All') && filteredPosts.length > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F1EFED] rounded-full text-sm text-[#6E6D5F]">
              {searchQuery && (
                <>
                  <Search className="w-4 h-4" />
                  <span>Searching for "{searchQuery}"</span>
                </>
              )}
              {searchQuery && selectedCategory !== 'All' && <span className="text-[#C6C0B4]">•</span>}
              {selectedCategory !== 'All' && (
                <span>in {selectedCategory}</span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSearchExpanded(false);
                }}
                className="ml-2 hover:text-[#64767C] transition-colors"
                aria-label="Clear all filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          loading ? (
            <BlogPostGridSkeleton count={8} />
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center max-w-xl">
                <p className="text-2xl font-['Baskerville_URW_Medium',_serif] text-[#64767C] italic">
                  Articles coming soon.
                </p>
              </div>
            </div>
          )
        ) : loading ? (
          <BlogPostGridSkeleton count={8} />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {currentPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-[#C6C0B4] rounded-xl cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback 
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-[#64767C] mb-3">
                    <div className="flex items-center gap-1 bg-[rgba(26,34,39,0)]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm text-[rgb(26,34,39)]">{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                  
                  <h3 className="mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-[rgb(26,34,39)] mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.authorLogoUrl && (
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-[#C6C0B4]/30">
                          <ImageWithFallback
                            src={post.authorLogoUrl}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <span className="text-sm text-[rgb(26,34,39)]">
                        By {parseAuthorLinks(post.author)}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 hover:gap-2 transition-all text-[#64767C] hover:text-[#64767C]/80">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="border-[#C6C0B4] hover:bg-[#F1EFED] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                
                // Show ellipsis
                const showEllipsisBefore = pageNumber === currentPage - 2 && currentPage > 3;
                const showEllipsisAfter = pageNumber === currentPage + 2 && currentPage < totalPages - 2;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return <span key={pageNumber} className="text-[#64767C] px-2">...</span>;
                }

                if (!showPage) return null;

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNumber)}
                    className={
                      currentPage === pageNumber
                        ? "bg-[#6E6D5F] text-white hover:bg-[#64767C]"
                        : "border-[#C6C0B4] hover:bg-[#F1EFED]"
                    }
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="border-[#C6C0B4] hover:bg-[#F1EFED] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Page Info */}
        {filteredPosts.length > 0 && (
          <div className="text-center mb-8">
            <p className="text-sm text-[#64767C]">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
            </p>
          </div>
        )}

        {/* No results message */}
        {posts.length > 0 && filteredPosts.length === 0 && (
          <div className="text-center py-12 px-4 max-w-2xl mx-auto">
            <div className="bg-[#F1EFED] rounded-xl p-8">
              <Search className="w-12 h-12 text-[#C6C0B4] mx-auto mb-4" />
              <h3 className="text-xl text-[#6E6D5F] mb-2">No Articles Found</h3>
              <p className="text-[#64767C] mb-6">
                {searchQuery && selectedCategory !== 'All' 
                  ? `We couldn't find any articles matching "${searchQuery}" in ${selectedCategory}.`
                  : searchQuery 
                  ? `We couldn't find any articles matching "${searchQuery}".`
                  : `No articles found in the ${selectedCategory} category.`
                }
              </p>
              <div className="space-y-3">
                <p className="text-sm text-[#64767C]">Try:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {searchQuery && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="border-[#C6C0B4] hover:bg-white"
                    >
                      Clear search
                    </Button>
                  )}
                  {selectedCategory !== 'All' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory('All')}
                      className="border-[#C6C0B4] hover:bg-white"
                    >
                      View all categories
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSearchExpanded(false);
                    }}
                    className="border-[#C6C0B4] hover:bg-white"
                  >
                    Reset all filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <NewsletterCTA compact />
      </div>
    </section>
  );
}