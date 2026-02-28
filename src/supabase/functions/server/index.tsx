import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Initialize Supabase client for storage
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "*",
  cors({
    origin: (origin) => origin || "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey", "x-client-info", "x-supabase-auth"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Explicit OPTIONS handler for preflights
app.options("*", (c) => c.text("", 204));

// Define routes with a helper to register both prefixed and unprefixed versions
const registerRoute = (method: 'get' | 'post' | 'put' | 'delete', path: string, handler: any) => {
  const prefixedPath = `/make-server-19263118${path}`;
  app[method](path, handler);
  app[method](prefixedPath, handler);
};

// Health check endpoint
registerRoute('get', '/health', (c) => {
  return c.json({ status: "ok" });
});

// Blog Posts API

// Get all blog posts
registerRoute('get', '/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix("blog_post:");
    // Sort by publishedAt date (newest first)
    const sortedPosts = (posts || []).sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    return c.json({ posts: sortedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json({ error: `Failed to fetch posts: ${error.message}`, posts: [] }, 500);
  }
});

// Get a single post by ID
registerRoute('get', '/posts/:id', async (c) => {
  try {
    const id = c.req.param("id");
    const post = await kv.get(`blog_post:${id}`);
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return c.json({ error: "Failed to fetch post" }, 500);
  }
});

// Create a new blog post
registerRoute('post', '/posts', async (c) => {
  try {
    const body = await c.req.json();
    
    // Generate ID from slug or timestamp
    const id = body.slug || `post_${Date.now()}`;
    
    const post = {
      id,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content || "",
      imageUrl: body.imageUrl || "",
      authorLogoUrl: body.authorLogoUrl || "",
      publishedAt: body.publishedAt || new Date().toISOString(),
      category: body.category || "General",
      author: body.author || "New Dominion Health",
      featured: body.featured || false,
      slug: body.slug || id
    };

    await kv.set(`blog_post:${id}`, post);
    return c.json(post, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

// Update a blog post
registerRoute('put', '/posts/:id', async (c) => {
  try {
    const id = c.req.param("id");
    const existingPost = await kv.get(`blog_post:${id}`);
    
    if (!existingPost) {
      return c.json({ error: "Post not found" }, 404);
    }

    const body = await c.req.json();
    const updatedPost = {
      ...existingPost,
      ...body,
      id // Ensure ID doesn't change
    };

    await kv.set(`blog_post:${id}`, updatedPost);
    return c.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return c.json({ error: "Failed to update post" }, 500);
  }
});

// Delete a blog post
registerRoute('delete', '/posts/:id', async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`blog_post:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return c.json({ error: "Failed to delete post" }, 500);
  }
});

// Delete ALL blog posts (for cleanup)
registerRoute('delete', '/posts-all', async (c) => {
  try {
    const posts = await kv.getByPrefix("blog_post:");
    const deletePromises = posts.map(post => kv.del(`blog_post:${post.id}`));
    await Promise.all(deletePromises);
    return c.json({ success: true, deletedCount: posts.length });
  } catch (error) {
    console.error("Error deleting all posts:", error);
    return c.json({ error: "Failed to delete all posts" }, 500);
  }
});

// Image Upload API
registerRoute('post', '/upload-image', async (c) => {
  try {
    const bucketName = "make-19263118-blog-images";
    
    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true
      });
    }

    // Get the file from the request
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: "Failed to upload image" }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ url: publicUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

// Author Logo Upload API
registerRoute('post', '/upload-author-logo', async (c) => {
  try {
    const bucketName = "make-19263118-author-logos";
    
    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true
      });
    }

    // Get the file from the request
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `author-${timestamp}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: "Failed to upload image" }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ url: publicUrl });
  } catch (error) {
    console.error("Error uploading author logo:", error);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

// Document Upload API (for PDFs, etc.)
registerRoute('post', '/upload-document', async (c) => {
  try {
    const bucketName = "make-19263118-documents";
    
    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true
      });
    }

    // Get the file from the request
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Generate clean filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `new-hampshire-confession-${timestamp}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type || 'application/pdf',
        upsert: false
      });

    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: "Failed to upload document" }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ url: publicUrl });
  } catch (error) {
    console.error("Error uploading document:", error);
    return c.json({ error: "Failed to upload document" }, 500);
  }
});

// Admin Signup API
registerRoute('post', '/signup', async (c) => {
  try {
    const { email, password, name, signupSecret } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Verify signup secret to prevent unauthorized admin account creation
    const requiredSecret = Deno.env.get('ADMIN_SIGNUP_SECRET');
    if (!requiredSecret) {
      return c.json({ error: "Admin signup is not configured. Please set ADMIN_SIGNUP_SECRET environment variable." }, 500);
    }

    if (signupSecret !== requiredSecret) {
      return c.json({ error: "Invalid signup code. Only authorized users can create admin accounts." }, 403);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Admin' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: `Failed to create user: ${error.message}` }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Error in signup:", error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// About Page API
registerRoute('get', '/about', async (c) => {
  try {
    const content = await kv.get("about_page_content");
    if (!content) {
      return c.json(null, 404);
    }
    return c.json(content);
  } catch (error) {
    console.error("Error fetching About page content:", error);
    return c.json({ error: "Failed to fetch About page content" }, 500);
  }
});

registerRoute('post', '/about', async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("about_page_content", body);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving About page content:", error);
    return c.json({ error: "Failed to save About page content" }, 500);
  }
});

// Authors API
// Get all authors
registerRoute('get', '/authors', async (c) => {
  try {
    const authors = await kv.getByPrefix("author:");
    // Sort by creation date (newest first)
    const sortedAuthors = (authors || []).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return c.json(sortedAuthors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    return c.json({ error: `Failed to fetch authors: ${error.message}` }, 500);
  }
});

// Get a single author by ID
registerRoute('get', '/authors/:id', async (c) => {
  try {
    const id = c.req.param("id");
    const author = await kv.get(`author:${id}`);
    if (!author) {
      return c.json({ error: "Author not found" }, 404);
    }
    return c.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    return c.json({ error: "Failed to fetch author" }, 500);
  }
});

// Get author by name
registerRoute('get', '/authors/name/:name', async (c) => {
  try {
    const name = decodeURIComponent(c.req.param("name"));
    const authors = await kv.getByPrefix("author:");
    const author = authors.find((a: any) => a.name === name);
    
    if (!author) {
      return c.json({ error: "Author not found" }, 404);
    }
    return c.json(author);
  } catch (error) {
    console.error("Error fetching author by name:", error);
    return c.json({ error: "Failed to fetch author" }, 500);
  }
});

// Get author by slug
registerRoute('get', '/authors/by-slug/:slug', async (c) => {
  try {
    const slug = decodeURIComponent(c.req.param("slug"));
    const authors = await kv.getByPrefix("author:");
    const author = authors.find((a: any) => a.slug === slug);
    
    if (!author) {
      return c.json({ error: "Author not found" }, 404);
    }
    return c.json(author);
  } catch (error) {
    console.error("Error fetching author by slug:", error);
    return c.json({ error: "Failed to fetch author" }, 500);
  }
});

// Create a new author
registerRoute('post', '/authors', async (c) => {
  try {
    const body = await c.req.json();
    
    // Generate ID from slug or timestamp
    const id = body.slug || body.name.toLowerCase().replace(/\s+/g, '_') || `author_${Date.now()}`;
    
    const author = {
      id,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      bio: body.bio || "",
      logoUrl: body.logoUrl || "",
      createdAt: new Date().toISOString(),
    };

    await kv.set(`author:${id}`, author);
    return c.json(author);
  } catch (error) {
    console.error("Error creating author:", error);
    return c.json({ error: "Failed to create author" }, 500);
  }
});

// Update an existing author
registerRoute('put', '/authors/:id', async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingAuthor = await kv.get(`author:${id}`);
    if (!existingAuthor) {
      return c.json({ error: "Author not found" }, 404);
    }

    const updatedAuthor = {
      ...existingAuthor,
      name: body.name,
      slug: body.slug || existingAuthor.slug,
      bio: body.bio || "",
      logoUrl: body.logoUrl || "",
    };

    await kv.set(`author:${id}`, updatedAuthor);
    return c.json(updatedAuthor);
  } catch (error) {
    console.error("Error updating author:", error);
    return c.json({ error: "Failed to update author" }, 500);
  }
});

// Delete an author
registerRoute('delete', '/authors/:id', async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`author:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting author:", error);
    return c.json({ error: "Failed to delete author" }, 500);
  }
});

Deno.serve(app.fetch);