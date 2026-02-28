# 🚀 Deploy Backend Server to Supabase

## The Problem
You're getting "TypeError: Failed to fetch" because your backend server code exists locally but hasn't been deployed to Supabase yet.

## The Solution
We need to deploy the Supabase Edge Function using the Supabase CLI.

---

# 📋 STEP-BY-STEP DEPLOYMENT GUIDE (MacBook)

## STEP 1: Install Supabase CLI

### Open Terminal in VS Code
1. In VS Code, click **Terminal** → **New Terminal** (or press `` Ctrl + ` ``)

### Install with Homebrew (Recommended for Mac)

**Option A: If you have Homebrew**
```bash
brew install supabase/tap/supabase
```

**Option B: If you don't have Homebrew, install it first**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install Supabase CLI:
```bash
brew install supabase/tap/supabase
```

**Option C: Direct install without Homebrew**
```bash
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sh
```

### Verify Installation
```bash
supabase --version
```

You should see something like: `1.x.x`

---

## STEP 2: Log Into Supabase

1. In the terminal, type:
```bash
supabase login
```

2. Press **Enter**

3. Your browser will open with Supabase login

4. Click **"Authorize"** or log in if needed

5. Back in the terminal, you should see:
```
✓ Logged in as your-email@example.com
```

---

## STEP 3: Link Your Project to Supabase

### Get Your Supabase Project Reference ID

1. Open browser and go to: https://supabase.com/dashboard
2. Click on your **New Dominion Health** project
3. Click **Settings** (gear icon, bottom-left)
4. Click **General**
5. Look for **"Reference ID"** (NOT the Project ID!)
   - It looks like: `abcdefghijklmnop` (16 characters)
6. **Copy it**

### Link the Project

Back in VS Code terminal:

```bash
supabase link --project-ref YOUR_REFERENCE_ID
```

Replace `YOUR_REFERENCE_ID` with the actual Reference ID you just copied.

Example:
```bash
supabase link --project-ref abcdefghijklmnop
```

**What happens:**
- It will ask for your database password
- Enter the password you used when creating the Supabase project
- You'll see: `✓ Linked to project YOUR_REFERENCE_ID`

---

## STEP 4: Deploy the Edge Function

Now deploy your server code!

```bash
supabase functions deploy make-server-19263118
```

**What you'll see:**
```
Deploying Function make-server-19263118...
Bundling make-server-19263118...
Uploading make-server-19263118...
✓ Deployed Function make-server-19263118
```

This takes about 30-60 seconds.

---

## STEP 5: Set Environment Variables in Supabase

Your function needs the environment variables to work.

### Set Each Secret

Run these commands one by one (replace with YOUR actual values from your Notes):

**1. SUPABASE_URL**
```bash
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
```

**2. SUPABASE_SERVICE_ROLE_KEY**
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...YOUR_ACTUAL_KEY
```

**3. SUPABASE_ANON_KEY**
```bash
supabase secrets set SUPABASE_ANON_KEY=eyJhbGc...YOUR_ACTUAL_KEY
```

**4. SUPABASE_DB_URL**
```bash
supabase secrets set SUPABASE_DB_URL=postgresql://postgres...YOUR_ACTUAL_URL
```

**5. ADMIN_SIGNUP_SECRET**
```bash
supabase secrets set ADMIN_SIGNUP_SECRET=YourSecretPassword123
```

**After each command, you'll see:**
```
✓ Set secret SUPABASE_URL
```

---

## STEP 6: Verify Deployment

### Test the Health Endpoint

In your terminal:
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-19263118/health
```

Replace `YOUR_PROJECT_ID` with your actual Supabase project ID.

**You should see:**
```json
{"status":"ok"}
```

If you see this, **YOUR BACKEND IS LIVE!** 🎉

---

## STEP 7: Test Your Website

1. Go to your website: `https://your-site.vercel.app`
2. Refresh the page (Cmd + R)
3. **The "Failed to fetch" error should be GONE!**
4. Your website should load properly

---

## TROUBLESHOOTING

### Error: "supabase: command not found"
- Homebrew didn't install correctly
- Try: `brew install supabase/tap/supabase`
- Or restart your terminal and try again

### Error: "Project not found"
- Wrong Reference ID
- Go back to Step 3 and double-check the Reference ID

### Error: "Function not found"
- The function name might be wrong
- Make sure you're deploying `make-server-19263118` exactly

### Error: "Database password incorrect"
- Check your Supabase database password
- You can reset it in Supabase Dashboard → Settings → Database → Reset Password

### Still getting "Failed to fetch"?
- Wait 1-2 minutes after deployment
- Clear your browser cache
- Check the function deployed: `supabase functions list`

---

## FUTURE UPDATES

Whenever you update the server code in `/supabase/functions/server/index.tsx`:

1. Save your changes
2. Run:
   ```bash
   supabase functions deploy make-server-19263118
   ```
3. Wait 30 seconds
4. Your changes are live!

---

## Quick Reference Commands

```bash
# Login to Supabase
supabase login

# Link project
supabase link --project-ref YOUR_REF_ID

# Deploy function
supabase functions deploy make-server-19263118

# Set a secret
supabase secrets set SECRET_NAME=value

# List deployed functions
supabase functions list

# View function logs (for debugging)
supabase functions serve make-server-19263118
```

---

**That's it! Your backend should now be deployed and working!** 🚀
