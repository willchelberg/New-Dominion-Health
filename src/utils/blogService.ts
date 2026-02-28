// Blog service using Supabase KV store
// This manages all blog post data

import { projectId, publicAnonKey } from './supabase/info';
import { safeFetchJSON } from './safeFetch';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  authorLogoUrl?: string; // Author profile picture/logo URL
  publishedAt: string;
  category: string | string[]; // Can be a single category or multiple categories
  author: string;
  featured: boolean;
  slug: string;
  status?: 'draft' | 'published'; // Draft or published
  metaDescription?: string; // SEO meta description
  scheduledFor?: string; // Schedule future publishing
  lastSaved?: string; // Auto-save timestamp
}

const getApiBase = () => {
  return `https://${projectId}.supabase.co/functions/v1/make-server-19263118`;
};

// Common headers for all API requests
const getHeaders = () => ({
  'Authorization': `Bearer ${publicAnonKey}`,
  'apikey': publicAnonKey,
  'Content-Type': 'application/json'
});

// Fetch all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await safeFetchJSON<{ posts: BlogPost[] }>(`${getApiBase()}/posts`, {
    headers: getHeaders()
  });
  
  return data?.posts || [];
}

// Fetch featured posts only
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    return posts
      .filter(post => post.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Create a new blog post
export async function createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${getApiBase()}/posts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(`Failed to create post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

// Update an existing blog post
export async function updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${getApiBase()}/posts/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(`Failed to update post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

// Delete a blog post
export async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${getApiBase()}/posts/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

// Duplicate a blog post
export async function duplicatePost(id: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    const originalPost = posts.find(post => post.id === id);
    if (!originalPost) return null;

    const duplicatedPost = {
      ...originalPost,
      title: `${originalPost.title} (Copy)`,
      slug: `${originalPost.slug}-copy-${Date.now()}`,
      status: 'draft' as const,
      publishedAt: new Date().toISOString(),
      featured: false
    };

    // Remove the id so a new one is generated
    const { id: _id, ...postWithoutId } = duplicatedPost;
    return await createPost(postWithoutId);
  } catch (error) {
    console.error('Error duplicating post:', error);
    return null;
  }
}

// Get only published posts (for public display)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    const now = new Date();
    return posts.filter(post => {
      // Show if published status
      if (post.status === 'draft') return false;
      
      // Check if scheduled for future
      if (post.scheduledFor) {
        const scheduledDate = new Date(post.scheduledFor);
        return scheduledDate <= now;
      }
      
      return true;
    });
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
}

// Upload image to Supabase Storage
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${getApiBase()}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'apikey': publicAnonKey
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(`Failed to upload image: ${response.status}`);
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}