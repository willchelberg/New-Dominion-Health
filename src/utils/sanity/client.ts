import { createClient } from '@sanity/client';

// Safe way to access environment variables - prevents crashes if import.meta.env is undefined
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  try {
    return (import.meta?.env?.[key] as string) || defaultValue;
  } catch {
    return defaultValue;
  }
};

// Sanity configuration - safe defaults to prevent crashes
const projectId = getEnvVar('VITE_SANITY_PROJECT_ID', 'placeholder');
const dataset = getEnvVar('VITE_SANITY_DATASET', 'production');
const token = getEnvVar('VITE_SANITY_TOKEN', '');

// Check if Sanity is configured
export const isSanityConfigured = projectId !== 'placeholder' && projectId.length > 0;

// Sanity client configuration with safe defaults
export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  token: token,
  apiVersion: '2024-02-23',
  useCdn: false, // Use false for fresh data, true for cached data
});

// Helper function to fetch all blog posts
export async function fetchPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    authors,
    category,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    content,
    publishedAt,
    featured
  }`;
  
  return await sanityClient.fetch(query);
}

// Helper function to fetch a single post by slug
export async function fetchPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    authors,
    category,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    content,
    publishedAt,
    featured
  }`;
  
  return await sanityClient.fetch(query, { slug });
}

// Helper function to fetch featured posts
export async function fetchFeaturedPosts() {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    authors,
    category,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    content,
    publishedAt,
    featured
  }`;
  
  return await sanityClient.fetch(query);
}

// Helper function to fetch posts by category
export async function fetchPostsByCategory(category: string) {
  const query = `*[_type == "post" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    authors,
    category,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    content,
    publishedAt,
    featured
  }`;
  
  return await sanityClient.fetch(query, { category });
}

// Helper function to fetch posts by author
export async function fetchPostsByAuthor(authorId: string) {
  const query = `*[_type == "post" && $authorId in authors] | order(publishedAt desc) {
    _id,
    title,
    slug,
    authors,
    category,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    content,
    publishedAt,
    featured
  }`;
  
  return await sanityClient.fetch(query, { authorId });
}