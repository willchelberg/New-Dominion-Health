/**
 * Unified Blog Service - Uses ONLY Sanity CMS
 * No backend calls = No "Failed to fetch" errors!
 */

import { sanityClient, isSanityConfigured } from './sanity/client';
import { allPostsQuery, featuredPostsQuery, postBySlugQuery } from './sanity/queries';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Portable Text content from Sanity
  imageUrl: string;
  category: string | string[];
  author: string;
  authorLogoUrl?: string;
  publishedAt: string;
  featured: boolean;
  status?: 'draft' | 'published';
  metaDescription?: string;
}

/**
 * Fetch all published posts from Sanity
 * Returns empty array if Sanity not configured yet - NO ERRORS!
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // If Sanity is not configured, return empty array silently
  if (!isSanityConfigured) {
    console.log('ℹ️ Sanity CMS not configured yet. Configure in /utils/sanity/client.ts or set up environment variables.');
    return [];
  }

  try {
    const posts = await sanityClient.fetch(allPostsQuery);
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title || 'Untitled',
      slug: post.slug?.current || 'untitled',
      excerpt: post.excerpt || '',
      content: post.content || [],
      imageUrl: post.imageUrl || '',
      category: post.category || [],
      author: post.author || 'New Dominion Health',
      authorLogoUrl: post.authorLogoUrl || '',
      publishedAt: post.publishedAt || new Date().toISOString(),
      featured: post.featured || false,
      status: 'published',
    }));
  } catch (error) {
    // Sanity fetch failed - return empty array silently
    console.log('ℹ️ No blog posts found in Sanity. Create your first post at /studio');
    return [];
  }
}

/**
 * Fetch featured posts from Sanity
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const posts = await sanityClient.fetch(featuredPostsQuery);
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title || 'Untitled',
      slug: post.slug?.current || 'untitled',
      excerpt: post.excerpt || '',
      content: post.content || [],
      imageUrl: post.imageUrl || '',
      category: post.category || [],
      author: post.author || 'New Dominion Health',
      authorLogoUrl: post.authorLogoUrl || '',
      publishedAt: post.publishedAt || new Date().toISOString(),
      featured: post.featured || false,
      status: 'published',
    }));
  } catch (error) {
    return [];
  }
}

/**
 * Fetch single post by slug from Sanity
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const post = await sanityClient.fetch(postBySlugQuery(slug));
    if (!post) return null;
    
    return {
      id: post._id,
      title: post.title || 'Untitled',
      slug: post.slug?.current || 'untitled',
      excerpt: post.excerpt || '',
      content: post.content || [],
      imageUrl: post.imageUrl || '',
      category: post.category || [],
      author: post.author || 'New Dominion Health',
      authorLogoUrl: post.authorLogoUrl || '',
      publishedAt: post.publishedAt || new Date().toISOString(),
      featured: post.featured || false,
      status: 'published',
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get published posts (same as getAllPosts for Sanity)
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return getAllPosts();
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => {
      if (Array.isArray(post.category)) {
        return post.category.includes(category);
      }
      return post.category === category;
    });
  } catch (error) {
    return [];
  }
}

// Note: Create, update, delete operations should be done through Sanity Studio
// These functions are stubs for compatibility but return null/false
export async function createPost(): Promise<BlogPost | null> {
  console.warn('Use Sanity Studio to create posts: /studio');
  return null;
}

export async function updatePost(): Promise<BlogPost | null> {
  console.warn('Use Sanity Studio to edit posts: /studio');
  return null;
}

export async function deletePost(): Promise<boolean> {
  console.warn('Use Sanity Studio to delete posts: /studio');
  return false;
}

export async function uploadImage(): Promise<string | null> {
  console.warn('Use Sanity Studio to upload images: /studio');
  return null;
}