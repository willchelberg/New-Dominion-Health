# New Dominion Health - Admin Panel Guide

Welcome to your New Dominion Health admin panel! This guide will help you manage your blog content easily.

## 🔐 Accessing the Admin Panel

1. Scroll to the bottom of any page on your website
2. In the footer, click the small "Admin" link
3. Enter your password: **newdominion2024**
4. You're in!

**To change your password:** Edit `/components/AdminLogin.tsx` on line 18

## ✍️ Creating a New Article

1. In the admin panel, fill out the form at the top:
   - **Title** (required): Your article headline
   - **URL Slug** (optional): Custom URL, or leave blank to auto-generate
   - **Excerpt** (required): 2-3 sentence summary for article cards
   - **Content** (required): Full article text
   - **Featured Image**: Either upload a photo or paste an image URL
   - **Category**: Choose from Articles, Videos, Code Snippets, or Learning Resources
   - **Author**: Your name (defaults to "New Dominion Health")
   - **Featured**: Check this to show on homepage (limit to 3 featured posts)

2. Click "Create Post"

## 📸 Adding Photos

You have two options for images:

### Option 1: Upload from Your Computer
1. Click "Upload Image" button
2. Select a photo from your computer
3. Wait for upload (usually 2-3 seconds)
4. The image URL will automatically populate

### Option 2: Use an Image URL
1. Get a free image from [Unsplash](https://unsplash.com)
2. Right-click the image and select "Copy Image Address"
3. Paste the URL into the "Image URL" field

## ✏️ Editing Articles

1. Find the article in the list below the form
2. Click the pencil icon (Edit button)
3. Make your changes
4. Click "Update Post"

## 🗑️ Deleting Articles

1. Find the article you want to delete
2. Click the trash can icon (Delete button)
3. Confirm deletion

**Warning:** This cannot be undone!

## 🌟 Featured Articles

- Only 3 articles should be marked as "Featured" at a time
- Featured articles appear on the homepage
- Simply check the "Feature this post on homepage" box when creating or editing

## 📝 Content Tips

### Writing Your Excerpt
- Keep it to 2-3 sentences
- Make it compelling - this is what people see first
- Include the main benefit or takeaway

### Writing Content
- Use clear headings with ## for main sections
- Break text into short paragraphs (2-4 sentences)
- Use bullet points and numbered lists
- Keep language simple and accessible

### Choosing Categories
- **Articles**: General health/wellness articles
- **Videos**: Video content or video-related posts
- **Code Snippets**: Technical content (if applicable)
- **Learning Resources**: Educational guides and resources

## 🔒 Security Notes

- Only you have access to the admin panel (with your password)
- Keep your password secure
- Log out when finished (click Logout button in top right)

## ⚙️ Technical Details

Your articles are stored in Supabase (a secure database). Images are also stored in Supabase Storage. Everything is backed up automatically.

## 🆘 Need Help?

If you run into any issues:
1. Try logging out and back in
2. Refresh the page
3. Check that all required fields are filled out
4. Make sure your image uploads successfully before saving

## 🎉 Getting Started

Your site comes with 3 sample articles to show you how everything works. Feel free to:
- Edit them to match your content
- Delete them and start fresh
- Use them as templates for your own articles

---

**Remember:** You don't need any coding knowledge to use the admin panel. Just fill out the forms like you would any website form, and click save!
