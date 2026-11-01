# 🚀 NEXTFLIX Setup Guide

## ✅ Project Status: **READY TO USE!**

Your Netflix clone is complete with **real video streaming** powered by frameXTV!

---

## 🎯 Quick Start (2 Steps)

### **Option 1: Use Without API Key (Sample Data)**
The app works immediately with sample movies!

```bash
npm run dev
```

Open: http://localhost:3000

✅ Browse sample movies  
✅ Watch real videos with frameXTV  
✅ Test all features  

---

### **Option 2: Use Real TMDB Data (Recommended)**

Get thousands of real movies!

#### Step 1: Get TMDB API Key (2 minutes)

1. Go to: https://www.themoviedb.org/signup
2. Create FREE account
3. Verify email
4. Go to: https://www.themoviedb.org/settings/api
5. Click "Request an API Key"
6. Select "Developer"
7. Fill form (use any website/app name)
8. Copy your **API Key (v3 auth)**

#### Step 2: Add to `.env.local`

```env
# Replace this line:
NEXT_PUBLIC_TMDB_API_KEY=demo_key_replace_with_real_one

# With your actual key:
NEXT_PUBLIC_TMDB_API_KEY=your_actual_tmdb_api_key_here
```

#### Step 3: Restart server

```bash
npm run dev
```

**Done!** Now you have access to:
- ✅ Trending movies
- ✅ Top rated movies
- ✅ Genre-based categories
- ✅ Real movie posters & descriptions
- ✅ YouTube trailers

---

## 🎬 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Landing Page | ✅ | Netflix-style hero, FAQ, footer |
| Authentication | ✅ | Email/Password + Google OAuth |
| Browse Dashboard | ✅ | 7 movie rows with smooth scroll |
| **Video Streaming** | ✅ | **Real frameXTV streaming** |
| YouTube Trailers | ✅ | Preview trailers in modal |
| My List/Watchlist | ✅ | Save favorites (localStorage) |
| Responsive | ✅ | Mobile, tablet, desktop |
| Dark Theme | ✅ | Netflix-inspired UI |

---

## 🎥 Video Streaming (frameXTV)

**No configuration needed!** It works out of the box.

### How It Works:
1. Click any movie poster
2. Click **"Play"** button
3. Enjoy real streaming!

### Features:
- ✅ Multi-provider fallback (Barbarian, Archer, Goblin, P.E.K.K.A)
- ✅ 4K/HD quality support
- ✅ Built-in subtitles & audio tracks
- ✅ Auto-fallback if provider fails
- ✅ Custom controls (play, pause, volume, fullscreen)

---

## 📁 Environment Variables

Your `.env.local` file should have:

```env
# TMDB API (For movie metadata)
NEXT_PUBLIC_TMDB_API_KEY=your_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p

# frameXTV Streaming (Already configured!)
NEXT_PUBLIC_FRAMEXTV_BASE_URL=https://framextv.xyz/embed

# Supabase (Optional - for authentication)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🚀 Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
```

---

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_TMDB_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (optional)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional)
4. Deploy!

---

## 🔧 Optional: Supabase Authentication

If you want real authentication:

### Step 1: Create Supabase Project
1. Go to: https://supabase.com
2. Create new project
3. Wait for setup (2-3 minutes)

### Step 2: Enable Auth
1. Go to: Authentication → Providers
2. Enable "Email"
3. (Optional) Enable "Google" OAuth

### Step 3: Get Credentials
1. Go to: Settings → API
2. Copy:
   - Project URL
   - anon/public key

### Step 4: Update `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 🎯 Test the App

### Pages to Visit:
- `/` - Landing page
- `/browse` - Main dashboard with movies
- `/profile` - Your watchlist
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

### Things to Try:
1. ✅ Browse movie rows
2. ✅ Click movie poster → See details
3. ✅ Click "Play" → Watch real video
4. ✅ Add movies to "My List"
5. ✅ Check your watchlist at `/profile`

---

## 🐛 Troubleshooting

### Movies not loading?
- Check if TMDB API key is correct in `.env.local`
- Restart dev server after changing `.env.local`
- **Or just use sample data** (works without API key)

### Video not playing?
- frameXTV works automatically, no config needed
- Try different movie (some may have limited availability)
- Check browser console for errors

### Build errors?
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

---

## 📚 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TMDB API** - Movie data
- **frameXTV** - Video streaming
- **Supabase** - Authentication (optional)
- **Zustand** - State management

---

## 🎉 You're All Set!

```bash
npm run dev
```

Open http://localhost:3000 and enjoy your Netflix clone! 🍿

**Questions?** Check README.md for detailed documentation.
