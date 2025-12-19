# Quick Start Guide

Get the AI Note-Taking App running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Google AI API key

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/ai-notes

# Generate: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-here

# Local development
NEXTAUTH_URL=http://localhost:3000

# Get from https://makersuite.google.com/app/apikey
GOOGLE_AI_API_KEY=your-google-ai-key
# Optional: override the default model (default: models/text-bison-001)
# Example: GOOGLE_AI_MODEL=models/text-bison-001
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Register**: Click "Sign Up" and create an account
2. **Create Note**: Click "New Note" button
3. **Try AI Features**:
   - Write some content
   - Click "AI Summary" to get a summary
   - Click "AI Improve" to enhance your text
   - Click "Generate Tags" to auto-tag

## Quick Links

- **Documentation**: See [README.md](README.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Project Details**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## Common Issues

### MongoDB Connection Failed
- Check your connection string in `.env.local`
- Ensure IP whitelist in MongoDB Atlas includes your IP or `0.0.0.0/0`

### Google AI API Error
- Verify API key is correct
- Check API is enabled at https://makersuite.google.com

### Build Errors
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Node.js version is 18+

## Need Help?

Check the full [README.md](README.md) for detailed instructions and troubleshooting.
