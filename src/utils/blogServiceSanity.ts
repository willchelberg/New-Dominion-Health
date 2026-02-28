import { sanityClient } from './sanity/client';
import { allPostsQuery, featuredPostsQuery, postBySlugQuery, postsByCategoryQuery } from './sanity/queries';
import { PortableText } from '@portabletext/react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Portable Text content from Sanity
  imageUrl: string;
  category: string[];
  author: string;
  authorLogoUrl?: string; // Will be fetched from Supabase
  publishedAt: string;
  featured: boolean;
}

// Fetch all published posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanityClient.fetch(allPostsQuery);
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category || [],
      author: post.author,
      publishedAt: post.publishedAt,
      featured: post.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    return [];
  }
}

// Fetch featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanityClient.fetch(featuredPostsQuery);
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category || [],
      author: post.author,
      publishedAt: post.publishedAt,
      featured: post.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching featured posts from Sanity:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanityClient.fetch(postBySlugQuery(slug));
    if (!post) return null;
    
    return {
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category || [],
      author: post.author,
      publishedAt: post.publishedAt,
      featured: post.featured || false,
    };
  } catch (error) {
    console.error('Error fetching post by slug from Sanity:', error);
    return null;
  }
}

// Fetch posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await sanityClient.fetch(postsByCategoryQuery(category));
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category || [],
      author: post.author,
      publishedAt: post.publishedAt,
      featured: post.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching posts by category from Sanity:', error);
    return [];
  }
}

// Get published posts (alias for getAllPosts for compatibility)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return getAllPosts();
}

// Convert Portable Text to HTML (for rendering)
export function renderPortableText(content: any): string {
  // This is a simplified version - you'll use PortableText component in React
  // For now, return a placeholder
  return '';
}
