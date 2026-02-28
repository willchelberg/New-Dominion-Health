import { useEffect, useState } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Author {
  id: string;
  name: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}

interface AuthorTaggerProps {
  children: React.ReactNode;
  onNavigate: (page: string, authorSlug?: string) => void;
}

// Convert author name to URL slug
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function AuthorTagger({ children, onNavigate }: AuthorTaggerProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [processedContent, setProcessedContent] = useState<React.ReactNode>(children);

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    if (authors.length > 0) {
      processContent();
    }
  }, [children, authors]);

  const loadAuthors = async () => {
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
      console.error("Error loading authors for tagging:", error);
    }
  };

  const processContent = () => {
    if (!children || typeof children !== "string") {
      setProcessedContent(children);
      return;
    }

    let content = children as string;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Sort authors by name length (longest first) to match longer names first
    const sortedAuthors = [...authors].sort((a, b) => b.name.length - a.name.length);

    // Build a regex pattern that matches any author name (case-insensitive)
    const pattern = sortedAuthors
      .map((author) => author.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");

    if (!pattern) {
      setProcessedContent(children);
      return;
    }

    const regex = new RegExp(`\\b(${pattern})\\b`, "gi");
    let match;
    let keyCounter = 0;

    while ((match = regex.exec(content)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      // Find the matching author
      const matchedName = match[0];
      const author = sortedAuthors.find(
        (a) => a.name.toLowerCase() === matchedName.toLowerCase()
      );

      if (author) {
        // Add the linked author name
        parts.push(
          <button
            key={`author-link-${keyCounter++}`}
            onClick={() => onNavigate(`author-${nameToSlug(author.name)}`)}
            className="text-[#64767C] hover:text-[#6E6D5F] underline underline-offset-2 transition-colors cursor-pointer font-inherit"
          >
            {matchedName}
          </button>
        );
      } else {
        parts.push(matchedName);
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    setProcessedContent(<>{parts}</>);
  };

  return <>{processedContent}</>;
}
