# New Dominion Health Blog

A modern, responsive blog website for New Dominion Health built with React, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### 1. Run the Development Server

```bash
npm install
npm run dev
```

Your site will be available at: `http://localhost:5173`

### 2. Access the Admin Dashboard

Navigate to: `http://localhost:5173/admin`

Here you can:
- Create new blog posts
- Edit existing posts
- Delete posts
- Toggle posts as "featured" on homepage

### 3. Create Your First Post

1. Go to `/admin`
2. Click "New Post"
3. Fill in:
   - Title
   - Author
   - Category
   - Excerpt (2-3 sentences)
   - Image URL (get from [Unsplash](https://unsplash.com))
   - Content
   - Toggle "Featured" to show on homepage
4. Click "Create Post"

## 📁 Project Structure

```
/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Site header with navigation
│   ├── Footer.tsx      # Site footer with social links
│   └── FeaturedArticles.tsx
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── BlogPage.tsx    # All blog posts
│   ├── AboutPage.tsx   # About page
│   └── AdminPage.tsx   # Admin dashboard
├── utils/              # Utility functions
│   └── blogService.ts  # Blog API functions
├── supabase/           # Supabase backend
│   └── functions/server/
│       ├── index.tsx   # API endpoints
│       └── kv_store.tsx # Database functions
└── App.tsx            # Main app component
```

## 🎨 Features

- ✅ Responsive design (mobile & desktop)
- ✅ Featured articles on homepage
- ✅ Blog page with all posts
- ✅ About page
- ✅ Admin dashboard for content management
- ✅ Category filtering
- ✅ Image support
- ✅ Real-time updates
- ✅ Mobile hamburger menu

## 📝 Managing Content

### Creating Posts
Navigate to `/admin` and click "New Post". All fields marked with * are required.

### Featured Posts
Toggle the "Featured" checkbox to show up to 3 posts on the homepage. Featured posts are automatically sorted by date.

### Categories
Choose from:
- Healthcare
- Leadership
- Technology
- Business
- Management

### Images
Get free stock photos from:
- [Unsplash](https://unsplash.com) (recommended)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

Right-click on an image → Copy Image Address → Paste in "Featured Image URL" field

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your admin dashboard will be available at: `https://your-site.vercel.app/admin`

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings should auto-detect
6. Click "Deploy"

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Edge Functions + KV Store)
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📖 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) - Detailed guide on using the admin dashboard

## 🤝 Support

For issues or questions:
1. Check the browser console for errors
2. Review the SUPABASE_SETUP_GUIDE.md
3. Ensure all posts have required fields filled

## 📄 License

This project is for New Dominion Health. All rights reserved.
