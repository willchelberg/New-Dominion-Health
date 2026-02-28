import { Hero } from "../components/Hero";
import { FeaturedArticles } from "../components/FeaturedArticles";
import { MissionSection } from "../components/MissionSection";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { SEO } from "../components/SEO";
import { type BlogPost } from "../utils/blogServiceUnified";
import { useState, useEffect } from "react";
import { getPublishedPosts } from "../utils/blogServiceUnified";

interface HomePageProps {
  onNavigate?: (page: string, post?: BlogPost) => void;
  refreshKey?: number;
}

export function HomePage({ onNavigate, refreshKey }: HomePageProps) {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [latestArticle, setLatestArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        setLoading(true);
        const data = await getPublishedPosts();
        if (data && data.length > 0) {
          // Get the 3 most recent posts for featured section
          const featured = data.slice(0, 3);
          setFeaturedPosts(featured);
          
          // Get the latest article for the "Latest from the Blog" section
          setLatestArticle(data[0]);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPosts();
  }, [refreshKey]); // Reload whenever refreshKey changes

  return (
    <>
      <SEO />
      <Hero onNavigate={onNavigate} refreshKey={refreshKey} cachedLatest={latestArticle} />
      <MissionSection onNavigate={onNavigate} />
      <FeaturedArticles onNavigate={onNavigate} refreshKey={refreshKey} cachedFeatured={featuredPosts} />
      <NewsletterCTA compact />
    </>
  );
}