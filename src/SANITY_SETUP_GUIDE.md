# 🚀 Sanity Hybrid Setup Guide

## What We've Built

Your blog now uses a **hybrid approach**:
- **Sanity Studio** - For writing and managing blog posts (rich text editor, drafts, scheduling)
- **Custom Admin Panel** - For editing About page and managing author bios

---

## 📋 Setup Steps

### Step 1: Create Your Sanity Project

1. **Go to** https://www.sanity.io/get-started
2. **Sign up** with Google/GitHub (free account)
3. **Create a new project**:
   - Project name: `New Dominion Health`
   - Dataset: `production`
   - Copy your **Project ID** (you'll need this)

### Step 2: Install Sanity CLI

Open your terminal and run:

```bash
npm install -g @sanity/cli
```

### Step 3: Initialize Sanity in Your Project

Navigate to your project folder and run:

```bash
cd /path/to/your/project
sanity init --project-id YOUR_PROJECT_ID --dataset production
```

When prompted:
- Use existing project? **YES**
- Select your project: **New Dominion Health**
- Use default dataset? **YES** (production)
- Project output path? **/sanity** (already created for you!)

### Step 4: Deploy Sanity Studio

```bash
cd sanity
sanity deploy
```

You'll be asked to choose a studio hostname:
- Example: `newdominionhealth` 
- Your studio will be at: `newdominionhealth.sanity.studio`

### Step 5: Add Environment Variables

Create a `.env` file in your project root:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

Replace `your_project_id_here` with your actual Sanity Project ID.

Also update `/sanity/sanity.config.ts` with your Project ID:
```typescript
projectId: 'YOUR_PROJECT_ID', // Replace with your actual ID
```

### Step 6: Start Sanity Studio Locally (Optional)

To run Sanity Studio on your computer for testing:

```bash
cd sanity
sanity start
```

Opens at: `http://localhost:3333`

---

## 🎯 How to Use Your New System

### For Blog Posts (Use Sanity):

1. **Go to your Sanity Studio**:
   - Online: `https://newdominionhealth.sanity.studio` (or your chosen URL)
   - Local: `http://localhost:3333`

2. **Create a new post**:
   - Click "Post" in the left sidebar
   - Click "+" to create new
   - Fill in:
     - Title
     - Generate slug (click "Generate")
     - Excerpt
     - Upload featured image
     - Write content (rich text editor!)
     - Select categories
     - Choose author
     - Set published date

3. **Save as draft** or **Publish immediately**

4. **Preview** before publishing (click Preview button)

### For About Page & Author Bios (Use Custom Admin):

1. **Go to**: `your-website.com/admin/login`

2. **Login** with your credentials

3. **About Page Tab**:
   - Edit mission statement
   - Update all About page content
   - Click "Save Changes"

4. **Authors Tab**:
   - Click "Add Author"
   - Enter name, bio, upload photo
   - Click "Save Author"
   - These authors will appear in Sanity when creating posts!

---

## 📊 Content Migration

### Migrate Existing Posts to Sanity

You have two options:

#### Option A: Manual Migration (Recommended for few posts)
1. Open Sanity Studio
2. Create new posts
3. Copy/paste content from your existing posts
4. Much easier with the visual editor!

#### Option B: Automatic Migration
We can create a migration script that:
1. Fetches all posts from Supabase
2. Creates them in Sanity automatically
3. Preserves all data (images, categories, etc.)

Let me know if you want Option B!

---

## 🎨 What Each System Does

### Sanity Studio (Blog Posts)

**URL**: `newdominionhealth.sanity.studio`

**Features**:
- ✅ Rich text editor (like Google Docs)
- ✅ Drag & drop images
- ✅ Save drafts
- ✅ Schedule publishing
- ✅ Preview before publish
- ✅ Version history
- ✅ Mobile app available

**You'll use this for**:
- Writing new blog posts
- Editing existing posts
- Managing post categories
- Setting featured posts

---

### Custom Admin Panel (About & Authors)

**URL**: `your-website.com/admin`

**Features**:
- ✅ Edit About page content
- ✅ Manage author profiles
- ✅ Upload author photos
- ✅ Quick and simple

**You'll use this for**:
- Updating About page (rarely)
- Adding new authors (when hiring)
- Editing author bios

---

## 🔗 How They Connect

```
┌─────────────────────────────────────┐
│  YOU write in Sanity Studio         │
│  (Beautiful rich text editor)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Sanity Database                     │
│  (Stores all blog posts)             │
└──────────────┬───────────────────────┘
               │
               │ Your website fetches ▼
               │
┌──────────────────────────────────────┐
│  Your Website                        │
│  (Displays posts to visitors)        │
│  + Author bios from Supabase         │
└──────────────────────────────────────┘
```

---

## 📝 Next Steps After Setup

1. ✅ Create Sanity account
2. ✅ Deploy Sanity Studio
3. ✅ Add environment variables
4. ✅ Create your first test post in Sanity
5. ✅ Add authors in Custom Admin
6. ✅ Migrate existing posts (or we can automate this)
7. ✅ Start blogging!

---

## 🆘 Need Help?

**Common Issues**:

**Q: "I can't see my Sanity Studio"**
A: Make sure you deployed it: `cd sanity && sanity deploy`

**Q: "Posts aren't showing on my website"**
A: Check that:
- Environment variables are set correctly
- Posts are "Published" (not drafts) in Sanity
- You're using the correct Project ID

**Q: "Author photos aren't uploading"**
A: The server handles this automatically - just make sure you're logged into the admin panel

---

## 💡 Pro Tips

1. **Write in drafts first** - Take your time, Sanity saves automatically
2. **Use preview** - See exactly how it looks before publishing
3. **Schedule posts** - Write on Monday, auto-publish on Friday
4. **Mobile app** - Download Sanity app to edit on the go
5. **Invite collaborators** - Add team members (free for up to 3 users)

---

## 🎉 You're All Set!

Your hybrid system is ready to use. You get:
- Professional blog management (Sanity)
- Simple admin for basic edits (Custom)
- Best of both worlds!

**Ready to migrate your posts or need help with setup?** Let me know!
