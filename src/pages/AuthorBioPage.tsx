import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { User } from "lucide-react";

interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}

interface AuthorBioPageProps {
  authorSlug: string;
}

export function AuthorBioPage({ authorSlug }: AuthorBioPageProps) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAuthor();
  }, [authorSlug]);

  const loadAuthor = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/authors/by-slug/${authorSlug}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAuthor(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error loading author:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl text-center">
          <User className="w-16 h-16 text-[#C6C0B4] mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-serif text-[#1A2227] mb-4">
            Author Not Found
          </h1>
          <p className="text-[#64767C] text-lg">
            The author you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Image & Meta */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-10 aspect-[4/5] relative overflow-hidden rounded-sm shadow-sm border border-[#C6C0B4]/20">
              {author.logoUrl ? (
                <ImageWithFallback 
                  src={author.logoUrl} 
                  alt={author.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#C6C0B4] flex items-center justify-center">
                  <User className="w-24 h-24 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Bio Content */}
          <div className="md:col-span-7 lg:col-span-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A2227] mb-8">
              {author.name}
            </h1>

            <div className="prose prose-lg max-w-none text-[#1A2227]/90 leading-relaxed font-serif space-y-6">
              {author.bio ? (
                // Split bio by paragraphs (double line breaks) and render each as a <p>
                author.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p className="text-[#64767C] italic">
                  No bio available for this author yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
