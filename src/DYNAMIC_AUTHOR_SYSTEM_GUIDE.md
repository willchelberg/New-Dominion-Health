# Dynamic Author System Guide

## Overview

The New Dominion Health website now has a **fully dynamic author management system**. You can add, edit, and delete authors through the admin panel, and everything (bio pages, author links, auto-linking) works automatically!

## ✅ What's Changed

### Before (Hardcoded System)
- Each author had a separate bio page file (WillChelbergBioPage.tsx, etc.)
- Adding a new author required creating new files and updating routing code
- Author links were hardcoded with if/else statements

### After (Dynamic System)
- **One template** creates bio pages for all authors
- **Admin panel** lets you add/edit/delete authors easily
- **Automatic routing** - just add an author, and their bio page works instantly
- **Smart auto-linking** - author names in blog posts automatically link to their bio pages

---

## 📋 How To Add A New Author

### Step 1: Go to the Admin Panel
1. Log in to `/admin`
2. Click on the **"Authors"** tab

### Step 2: Create Author Profile
1. Click **"Add Author"**
2. Fill in the form:
   - **Author Name** (e.g., "Sarah Thompson") - This is the name that will appear on blog posts
   - **URL Slug** - Auto-generated from the name (e.g., "sarah-thompson"), but you can customize it
   - **Author Bio** - Write their bio (supports multiple paragraphs - separate with blank lines)
   - **Profile Photo** - Upload a headshot (recommended: square, 400x400px minimum)

3. Click **"Save Author"**

### Step 3: Use in Sanity
Now when you create blog posts in Sanity, you can assign this author to posts!

---

## 🔗 How It Works

### Author Pages
- **URL Format**: `/author/[slug]`
- **Examples**: 
  - `/author/will-chelberg`
  - `/author/sarah-thompson`
  
When someone visits an author page, the system:
1. Takes the slug from the URL
2. Fetches the author data from Supabase
3. Displays their photo and bio using the dynamic template

### Auto-Linking
Author names mentioned in blog post content automatically become clickable links to their bio pages. This works for ANY author you create in the admin panel!

### Author Attribution on Posts
When you assign an author to a blog post in Sanity:
1. The author's name appears on the post (with "By [Author Name]")
2. The author's profile photo appears (fetched from Supabase)
3. Clicking the author name navigates to their bio page
4. Only the name is underlined/clickable (not the word "By")

---

## 🎨 Bio Page Template

All author bio pages follow Will Chelberg's design:
- **Left Column**: Profile photo (4:5 aspect ratio, full color on hover from grayscale)
- **Right Column**: Author name as heading + bio paragraphs

The bio supports multiple paragraphs - just separate them with double line breaks when editing in the admin panel.

---

## 🔄 Integration with Sanity

### How Blog Posts Connect to Authors

**In Sanity Studio (where you write blog posts):**
- You'll select an author name from a dropdown
- This saves just the author NAME with the blog post

**In Supabase (author profiles):**
- Author details (bio, photo, slug) are stored here
- Managed through the Admin Panel

**When Displaying Posts:**
- The system takes the author name from the Sanity post
- Fetches the full author profile from Supabase
- Shows the photo and makes the name clickable

### Setting Up Author Selection in Sanity

In your Sanity schema (`/sanity/schemas/blogPost.ts`), the author field should look like this:

```typescript
{
  name: 'author',
  title: 'Author',
  type: 'string',
  description: 'Author name (must match an author created in the admin panel)',
  options: {
    list: [
      { title: 'Will Chelberg', value: 'Will Chelberg' },
      { title: 'Andon Chelberg', value: 'Andon Chelberg' },
      { title: 'Connor Chelberg', value: 'Connor Chelberg' },
      { title: 'Aidan Preston', value: 'Aidan Preston' },
      // Add new authors here as you create them in the admin panel
    ]
  }
}
```

**Important:** The author name in Sanity must EXACTLY match the author name in the Admin Panel.

---

## 📝 Best Practices

### Author Names
- Use full names (e.g., "Will Chelberg" not "Will")
- Keep names consistent between Sanity and the Admin Panel
- Names are case-sensitive!

### URL Slugs
- Auto-generated but customizable
- Use lowercase with hyphens (e.g., "will-chelberg")
- Keep them simple and readable
- Once set, try not to change them (breaks existing links)

### Profile Photos
- **Format**: JPG or PNG
- **Size**: At least 400x400px (square)
- **Style**: Professional headshot, full color
- **File size**: Under 2MB for fast loading

### Bios
- Write in 3rd person (e.g., "Will is a writer..." not "I am a writer...")
- Keep it concise but meaningful (150-300 words ideal)
- Separate paragraphs with double line breaks
- Focus on their expertise and role at New Dominion Health

---

## 🛠️ Technical Details

### File Structure
```
/pages/AuthorBioPage.tsx         → Dynamic template for all author pages
/utils/authorService.ts          → Fetches author data from Supabase
/components/AuthorsEditor.tsx    → Admin panel interface for managing authors
/supabase/functions/server/index.tsx → API routes for CRUD operations
```

### API Endpoints
- `GET /authors` - Get all authors
- `GET /authors/by-slug/:slug` - Get author by slug
- `GET /authors/name/:name` - Get author by name
- `POST /authors` - Create new author
- `PUT /authors/:id` - Update existing author
- `DELETE /authors/:id` - Delete author

### Data Storage
Authors are stored in Supabase using the KV store with the key pattern `author:[id]`.

Each author object contains:
```typescript
{
  id: string;
  name: string;
  slug: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}
```

---

## 🎯 Common Tasks

### Adding a New Author
1. Admin Panel → Authors → Add Author
2. Fill in details & upload photo
3. Save
4. Update Sanity schema to include their name in the dropdown

### Editing an Author
1. Admin Panel → Authors → Click Edit on the author
2. Make changes
3. Save (slug changes will affect URL)

### Deleting an Author
1. Admin Panel → Authors → Click Delete
2. Confirm deletion
3. **Note**: Existing blog posts will still reference their name, but bio link won't work

### Updating a Profile Photo
1. Edit the author in Admin Panel
2. Click "Change Photo"
3. Upload new image
4. Save

---

## 🚀 Future Authors

When new writers join your team:
1. Create their author profile in the Admin Panel (takes 2 minutes)
2. Add their name to the Sanity dropdown list
3. Start assigning them to blog posts!

No code changes needed! The system handles everything automatically.

---

## ❓ Troubleshooting

### Author bio page shows "Author Not Found"
- Check that the slug in the URL matches the slug in the Admin Panel
- Verify the author exists and hasn't been deleted

### Author name not clickable on posts
- Ensure the author name in the Sanity post matches an author in the Admin Panel (case-sensitive!)
- Check that the author has a slug set

### Profile photo not showing
- Make sure the image uploaded successfully
- Check the browser console for errors
- Try re-uploading a smaller image

### Auto-linking not working in post content
- Author names must be typed EXACTLY as they appear in the Admin Panel
- The AuthorTagger component should be enabled on the BlogPostPage

---

## 📚 Related Files

- `/ADMIN_GUIDE.md` - Complete admin panel guide
- `/SANITY_SETUP_GUIDE.md` - Sanity configuration
- `/ARTICLE_ENHANCEMENTS_SUMMARY.md` - Auto-linking feature details

---

**That's it!** You now have a fully scalable author management system. Add as many authors as you need without touching code! 🎉
