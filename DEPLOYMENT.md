# Deployment Guide

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AI Note-Taking App"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In your Vercel project settings, add the following environment variables:

1. **MONGODB_URI**
   - Get from MongoDB Atlas
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/ai-notes?retryWrites=true&w=majority`

2. **NEXTAUTH_SECRET**
   - Generate with: `openssl rand -base64 32`
   - Or use any random 32+ character string

3. **NEXTAUTH_URL**
   - Set to your Vercel deployment URL
   - Example: `https://your-app.vercel.app`

4. **GOOGLE_AI_API_KEY**
   - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test note creation
- [ ] Test note editing
- [ ] Test note deletion
- [ ] Test search functionality
- [ ] Test AI Summary feature
- [ ] Test AI Improve feature
- [ ] Test AI Tags feature
- [ ] Test dark/light theme toggle
- [ ] Test mobile responsiveness

## Troubleshooting

### Build Fails

- Ensure all environment variables are set correctly
- Check Vercel build logs for specific errors
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` for serverless functions

### Authentication Issues

- Verify `NEXTAUTH_URL` matches your deployment URL
- Ensure `NEXTAUTH_SECRET` is set
- Check MongoDB connection string is correct

### AI Features Not Working

- Verify `GOOGLE_AI_API_KEY` is valid
- Check Google AI API quotas and limits
- Review API endpoint logs in Vercel

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Yes | Secret for NextAuth.js sessions |
| `NEXTAUTH_URL` | Yes | Full URL of your deployed app |
| `GOOGLE_AI_API_KEY` | Yes | Google Gemini API key |
