# Getting Started with Your Blog

## ✅ What You Have Now

Your blog is **fully functional** and powered by Supabase! Here's what's ready:

✅ Homepage with featured articles section  
✅ Blog page showing all posts  
✅ About page  
✅ Admin dashboard at `/admin`  
✅ Supabase backend with API  
✅ Mobile responsive design  

## 🎯 Your Next 3 Steps

### Step 1: Start Your Development Server

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

### Step 2: Go to the Admin Page

In your browser, navigate to: `http://localhost:5173/admin`

You'll see the admin dashboard with:
- "New Post" button
- List of all posts (empty for now)

### Step 3: Create Your First Blog Post

Click **"+ New Post"** and fill in:

**Example:**
- **Title**: `Welcome to New Dominion Health`
- **Slug**: (leave empty - auto-generated)
- **Author**: `Dr. Sarah Johnson`
- **Category**: `Healthcare`
- **Excerpt**: `We're excited to share insights and innovations in healthcare with you. Join us on this journey.`
- **Image URL**: 
  1. Go to https://unsplash.com/s/photos/healthcare
  2. Right-click an image you like
  3. Select "Copy Image Address"
  4. Paste it here
- **Content**: Write a longer welcome message
- **Featured**: ✅ Check this box

Click **"Create Post"** 

🎉 **Your post now appears on your homepage!**

## 📱 Testing Your Site

### Check the Homepage
- Go to `http://localhost:5173`
- You should see your featured post in the "Featured Articles" section

### Check the Blog Page
- Click "Read" in the navigation
- You should see your post listed

### Create More Posts
- Go back to `/admin`
- Create 2-3 more posts
- Toggle "Featured" on up to 3 posts total

## 🎨 Customization Tips

### Best Practices for Featured Posts
- Feature your **3 best** articles
- Mix different categories for variety
- Use high-quality, relevant images
- Update regularly to keep content fresh

### Writing Great Excerpts
- Keep it to 2-3 sentences
- Make it compelling and interesting
- Summarize the main point
- Avoid giving away the ending

### Choosing Images
- Use **high-resolution** images (1200x800 or larger)
- Make sure they're **relevant** to your content
- Choose **professional-looking** photos
- Stick to a **consistent style** across posts

## 🚀 When You're Ready to Deploy

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Deploy!
4. Your admin will be at: `your-site.vercel.app/admin`

### Option 2: Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Deploy!
4. Your admin will be at: `your-site.netlify.app/admin`

## 💡 Pro Tips

### Content Strategy
1. **Plan your content**: Outline 10-15 post ideas
2. **Mix categories**: Balance different topics
3. **Consistent publishing**: Set a schedule (weekly/monthly)
4. **Evergreen content**: Focus on timeless topics

### SEO Best Practices
- Write **descriptive titles** (50-60 characters)
- Create **compelling excerpts** (155-160 characters)
- Use **relevant images** with good alt text
- Choose **clear categories**

### Image Resources (All Free!)
- **Unsplash**: https://unsplash.com (recommended)
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

Search terms to try:
- "healthcare professional"
- "medical technology"
- "team meeting"
- "hospital modern"
- "doctor patient"

## 🔧 Common Tasks

### Adding a New Post
1. Go to `/admin`
2. Click "New Post"
3. Fill in the form
4. Click "Create Post"

### Editing a Post
1. Go to `/admin`
2. Find the post
3. Click the edit icon (pencil)
4. Make changes
5. Click "Update Post"

### Deleting a Post
1. Go to `/admin`
2. Find the post
3. Click the trash icon
4. Confirm deletion

### Featuring a Post on Homepage
1. Edit the post
2. Check the "Featured" box
3. Save
4. Maximum: 3 featured posts

## 📋 Troubleshooting

### Posts Not Showing?
- Check that you clicked "Create Post" (not just filled the form)
- Refresh the page
- Check browser console for errors

### Image Not Loading?
- Verify the URL is correct and public
- Try a different image from Unsplash
- Make sure it's a direct image URL (ends in .jpg or .png)

### Can't Access /admin?
- Make sure dev server is running (`npm run dev`)
- Check the URL: `http://localhost:5173/admin`
- Clear browser cache and refresh

## 📚 Learn More

- **Detailed Setup**: See [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
- **Project Overview**: See [README.md](./README.md)
- **Supabase Docs**: https://supabase.com/docs

## 🎉 You're All Set!

Your blog is ready to use! Start creating content and watch your site come to life.

**Quick Reminder:**
- Admin dashboard: `/admin`
- Create posts there
- Toggle "Featured" for homepage
- Deploy when ready

Happy blogging! 🚀
