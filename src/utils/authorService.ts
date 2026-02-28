import { projectId, publicAnonKey } from "./supabase/info";

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}

let authorsCache: Author[] | null = null;

export async function getAllAuthors(): Promise<Author[]> {
  // Return cached data if available
  if (authorsCache) {
    return authorsCache;
  }

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
      const authors = await response.json();
      authorsCache = authors;
      return authors;
    }
    return [];
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}

export async function getAuthorByName(name: string): Promise<Author | null> {
  const authors = await getAllAuthors();
  return authors.find((author) => author.name === name) || null;
}

export async function getAuthorSlugByName(name: string): Promise<string | null> {
  const author = await getAuthorByName(name);
  return author?.slug || null;
}

// Clear cache when needed (e.g., after creating/updating an author)
export function clearAuthorsCache() {
  authorsCache = null;
}
