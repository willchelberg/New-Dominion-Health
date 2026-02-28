// Sanity GROQ queries for fetching blog posts

export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    category,
    author,
    publishedAt,
    featured
  }
`;

export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    category,
    author,
    publishedAt,
    featured
  }
`;

export const postBySlugQuery = (slug: string) => `
  *[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    content,
    category,
    author,
    publishedAt,
    featured
  }
`;

export const postsByCategoryQuery = (category: string) => `
  *[_type == "post" && "${category}" in category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    category,
    author,
    publishedAt,
    featured
  }
`;
