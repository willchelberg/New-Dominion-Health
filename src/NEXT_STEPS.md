# ✅ Your Sanity Project is Configured!

**Project ID**: `5q95gqm1`

---

## 🎯 What I Just Did

I've updated your project with your Sanity credentials:

1. ✅ Created `.env.local` with your Project ID
2. ✅ Updated `/sanity/sanity.config.ts` with your Project ID
3. ✅ Created `/sanity.cli.ts` for CLI commands
4. ✅ Everything is ready to connect!

---

## 🚀 Next Steps: Deploy Your Sanity Studio

Follow these commands in your terminal:

### Step 1: Install Sanity Packages

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

### Step 2: Install Sanity CLI Globally

```bash
npm install -g @sanity/cli
```

### Step 3: Login to Sanity CLI

```bash
sanity login
```

This will open a browser window. Login with the same account you just used.

### Step 4: Deploy Your Sanity Studio

```bash
sanity deploy
```

**When prompted for a studio hostname**, choose something like:
- `newdominionhealth`
- `new-dominion-blog`
- `ndh-blog`

Your Studio will be available at: `https://[your-hostname].sanity.studio`

**Example**: If you choose `newdominionhealth`, your editor will be at:
```
https://newdominionhealth.sanity.studio
```

### Step 5: Test Locally

```bash
npm run dev
```

Open: `http://localhost:5173`

---

## 🎨 Create Your First Test Post

### In Sanity Studio:

1. **Go to your Studio URL** (the one you just deployed)
   - Example: `https://newdominionhealth.sanity.studio`

2. **You'll see the Sanity interface**
   - Click "Post" in the left sidebar
   - Click the "+" button or "Create new document"

3. **Fill in the post details**:
   ```
   Title: Welcome to Our New Blog!
   Slug: Click "Generate" button
   Excerpt: This is a test post to make sure everything works.
   Featured Image: Upload any image
   Content: Write anything! Try formatting with bold, headers, etc.
   Categories: Select one (Nutrition, Exercise, etc.)
   Author: You'll need to create an author first (see below)
   Published Date: Today's date
   Featured: Toggle ON if you want it on the homepage
   ```

4. **Click "Publish"** at the bottom right

---

## 👤 Create an Author First

Before creating posts, you need at least one author:

### Option A: Use Sanity Studio

In Sanity Studio:
1. Click "Author" in left sidebar
2. Click "+" to create new
3. Fill in:
   - Name: Your name
   - Bio: Short bio about yourself
   - Profile Image: Upload a photo
4. Click "Publish"

### Option B: Use Your Custom Admin Panel

1. Go to: `http://localhost:5173/admin/login`
2. Login with your admin credentials
3. Go to "Authors" tab
4. Click "Add Author"
5. Fill in details
6. Click "Save"

---

## 🧪 Test the Connection

### After creating a test post in Sanity:

1. **Go to your blog page**:
   ```
   http://localhost:5173/blog
   ```

2. **You should see your test post!**
   - If you don't, check the browser console for errors
   - Make sure the post is "Published" (not a draft)

3. **Click on the post** to view the full article

4. **Check that everything looks right**:
   - ✅ Title displays correctly
   - ✅ Featured image shows
   - ✅ Content is formatted properly
   - ✅ Author bio appears
   - ✅ Categories work
   - ✅ Design matches your brand

---

## 🔧 Troubleshooting

### "Can't find module @sanity/client"
**Solution**: Run `npm install @sanity/client @sanity/image-url @portabletext/react`

### "Sanity command not found"
**Solution**: Run `npm install -g @sanity/cli`

### "Posts aren't showing on website"
**Check**:
- Is the post "Published" (not a draft)?
- Is `.env.local` file in the root of your project?
- Did you restart your dev server after adding `.env.local`?

### "Can't login to Sanity CLI"
**Solution**: Make sure you're using the same account (Google/GitHub) that you used on sanity.io

### "Studio hostname already taken"
**Solution**: Choose a different hostname, or add numbers: `newdominionhealth2`

---

## 📱 What Happens Next

Once everything is working locally:

1. **Create real content** in Sanity Studio
2. **Migrate existing posts** (I can help with this!)
3. **Deploy to production** (Vercel/Netlify)
4. **Your blog is live!** 🎉

---

## 🎯 Quick Command Reference

```bash
# Install packages
npm install @sanity/client @sanity/image-url @portabletext/react

# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Deploy Studio
sanity deploy

# Start local dev server
npm run dev

# Start Sanity Studio locally (optional)
cd sanity
sanity start
# Opens at: http://localhost:3333
```

---

## 💡 Pro Tips

1. **Write drafts first** - Sanity auto-saves, so you can write over multiple sessions
2. **Use the preview button** - See exactly how it will look before publishing
3. **Schedule posts** - Set a future publish date and it will auto-publish
4. **Mobile app** - Download the Sanity app to edit posts from your phone
5. **Invite collaborators** - Free for up to 3 users in your project

---

## 🆘 Need Help?

Common next steps people ask about:

- **"Can you help me migrate my existing posts?"** → Yes! Let me know when ready.
- **"How do I change the design?"** → We already have your custom design! It's all set.
- **"Can I test without publishing the website?"** → Yes! That's what we're doing now (localhost).
- **"What if I mess something up?"** → Sanity has version history - you can undo anything!

---

## ✅ Checklist

```
□ Run: npm install @sanity/client @sanity/image-url @portabletext/react
□ Run: npm install -g @sanity/cli
□ Run: sanity login
□ Run: sanity deploy
□ Choose a studio hostname
□ Create an author in Sanity Studio
□ Create a test post in Sanity Studio
□ Run: npm run dev
□ Check: http://localhost:5173/blog
□ See your test post? ✅ Success!
```

---

**🎉 You're almost there! Just run those commands and you'll be blogging in minutes!**

Let me know when you've run the commands or if you hit any issues!
