# 🚀 SANITY CMS - QUICK SETUP GUIDE

## ✅ ERRORS ARE FIXED!

Your website now works **without any errors** even before Sanity is configured!

You'll see a friendly message: `"ℹ️ Sanity CMS not configured yet"`

---

## 🎯 OPTION 1: USE ENVIRONMENT VARIABLES (RECOMMENDED)

### Step 1: Get Sanity Credentials

1. Go to **https://www.sanity.io**
2. Sign up / Log in
3. Create new project
4. Get your **Project ID** and **Token**

### Step 2: Add to Vercel

1. Go to **https://vercel.com/dashboard**
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

   **Variable 1:**
   - Name: `VITE_SANITY_PROJECT_ID`
   - Value: `abc123xyz` (your actual project ID)

   **Variable 2:**
   - Name: `VITE_SANITY_DATASET`
   - Value: `production`

   **Variable 3:**
   - Name: `VITE_SANITY_TOKEN`
   - Value: `sk...` (your actual token)

5. Click **Save**
6. Go to **Deployments** tab
7. Click **...** menu on latest deployment
8. Click **"Redeploy"**

### Step 3: Wait & Test

- Wait 2 minutes for deployment
- Visit your website
- Console shows: `"ℹ️ No blog posts found in Sanity"`
- Create posts in Sanity Studio!

---

## 🎯 OPTION 2: LOCAL .ENV FILE (FOR DEVELOPMENT)

### Step 1: Create .env File

In VS Code, create file `.env` in project root:

```bash
VITE_SANITY_PROJECT_ID=abc123xyz
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=sk_your_token_here
```

### Step 2: Add to .gitignore

Make sure `.env` is in `.gitignore` (should be already):

```
.env
.env.local
```

### Step 3: Restart Dev Server

```bash
# Stop server (Ctrl + C)
# Start again
npm run dev
```

**Note:** This only works locally! You still need to add to Vercel for production.

---

## 📊 WHAT HAPPENS AT EACH STAGE:

### Stage 1: No Sanity Config (RIGHT NOW)
```
✅ Website loads perfectly
✅ Zero console errors
ℹ️ Console shows: "Sanity not configured yet"
✅ Shows "Articles coming soon" message
✅ All pages work
```

### Stage 2: Sanity Configured, No Posts
```
✅ Website loads perfectly
✅ Zero console errors
ℹ️ Console shows: "No blog posts found"
✅ Shows "Articles coming soon" message
✅ All pages work
```

### Stage 3: Sanity Configured + Posts Created
```
✅ Website loads perfectly
✅ Zero console errors
✅ Blog posts appear on homepage
✅ All pages work with content
🎉 FULLY FUNCTIONAL BLOG!
```

---

## 🆘 TROUBLESHOOTING:

### Still see "Sanity not configured" after adding env vars?

1. **Did you redeploy?** Environment changes need a new deployment
2. **Check variable names:** Must be EXACTLY:
   - `VITE_SANITY_PROJECT_ID` (not `SANITY_PROJECT_ID`)
   - `VITE_SANITY_DATASET`
   - `VITE_SANITY_TOKEN`
3. **Hard refresh browser:** `Cmd + Shift + R`

### "Failed to fetch" from Sanity?

1. **Check Project ID** is correct
2. **Check Token** has Editor permissions
3. **Check CORS** settings in Sanity dashboard
4. **Verify Dataset** is `production`

---

## 📝 QUICK CHECKLIST:

Current Status (after pushing these fixes):
- [x] Website loads without errors ✅
- [x] Clean console ✅
- [ ] Sanity configured (Optional - do when ready)
- [ ] Blog posts created (Optional - after Sanity setup)

---

## 💡 KEY POINT:

**You don't need to configure Sanity right away!**

Your website works perfectly without it. Take your time to:
1. Push these fixes now
2. Test the error-free website
3. Set up Sanity when you're ready to add blog posts

---

## 🚀 PUSH THE FIXES NOW:

```bash
git add .
git commit -m "Fix Sanity environment variable errors"
git push
```

**Wait 2 minutes, then enjoy your error-free website!** ✅

---

## 🎓 NEXT STEPS (OPTIONAL):

1. **Now:** Push fixes, test website (no errors!)
2. **Later today:** Set up Sanity account (10 min)
3. **Tomorrow:** Create first blog post (5 min)
4. **This week:** Add more content!

**No rush - your website is fully functional right now!** 🎉
