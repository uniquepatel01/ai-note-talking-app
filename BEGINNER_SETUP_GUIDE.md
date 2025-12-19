# 🚀 Beginner Setup Guide - AI Note-Taking App

This guide will help you set up and run the AI Note-Taking App on your computer, even if you're new to web development!

## 📋 What You'll Need

Before starting, make sure you have:
- A computer with internet connection
- About 30-45 minutes of time
- A GitHub account (free)
- A Google account (for AI features)

---

## Step 1: Install Node.js

Node.js is required to run this application.

### For Windows:
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Keep clicking "Next" with default settings
5. Click "Install" and wait for completion

### For Mac:
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version**
3. Open the downloaded `.pkg` file
4. Follow the installation wizard
5. Enter your password when asked

### Verify Installation:
Open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
node --version
```
You should see something like `v20.x.x` or `v18.x.x`

---

## Step 2: Install Git (Version Control)

Git helps you manage code and download this project.

### For Windows:
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer
3. Use default settings (keep clicking "Next")
4. Finish installation

### For Mac:
1. Open Terminal
2. Type: `git --version`
3. If not installed, it will prompt you to install Xcode Command Line Tools
4. Click "Install" and wait

### Verify Installation:
```bash
git --version
```
You should see something like `git version 2.x.x`

---

## Step 3: Download This Project

Now let's get the code on your computer!

### Option A: Using Git (Recommended)
1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to where you want the project:
   ```bash
   cd Desktop
   ```
3. Clone the repository (if you have it on GitHub):
   ```bash
   git clone <your-repository-url>
   cd ai-note-talking-app
   ```

### Option B: Download ZIP
1. If you have this as a ZIP file, extract it
2. Open Terminal/Command Prompt
3. Navigate to the project folder:
   ```bash
   cd path/to/ai-note-talking-app
   ```

---

## Step 4: Install Project Dependencies

Dependencies are libraries and tools the app needs to work.

1. Make sure you're in the project folder
2. Run this command:
   ```bash
   npm install
   ```
3. Wait 2-5 minutes (it's downloading packages)
4. You'll see a lot of text - that's normal!

---

## Step 5: Set Up MongoDB Database

MongoDB is where your notes will be stored.

### Create Free MongoDB Account:

1. **Go to MongoDB Atlas**: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)

2. **Sign up** with your email or Google account

3. **Create a Free Cluster**:
   - Click "Build a Database"
   - Choose **FREE** tier (M0)
   - Select a cloud provider (AWS is fine)
   - Choose a region **closest to you**
   - Click "Create"
   - Wait 3-5 minutes for cluster creation

4. **Create Database User**:
   - You'll see "Security Quickstart"
   - Choose "Username and Password"
   - Create a username (e.g., `admin`)
   - Create a password (SAVE THIS!)
   - Click "Create User"

5. **Add IP Address**:
   - Click "Add My Current IP Address"
   - OR click "Add a Different IP Address" and enter `0.0.0.0/0` (allows access from anywhere)
   - Click "Finish and Close"

6. **Get Connection String**:
   - Click "Connect" button
   - Choose "Drivers"
   - Select "Node.js" and version "4.1 or later"
   - Copy the connection string (looks like this):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` with your username
   - Replace `<password>` with your password
   - Add `/ai-notes` before the `?` like this:
     ```
     mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ai-notes?retryWrites=true&w=majority
     ```

---

## Step 6: Get Google AI API Key

This powers the AI features.

1. **Go to Google AI Studio**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

2. **Sign in** with your Google account

3. **Create API Key**:
   - Click "Create API Key"
   - Select a project or create a new one
   - Click "Create API key in new project"
   - Copy the API key (starts with `AIza...`)
   - **SAVE THIS!** You won't see it again

---

## Step 7: Configure Environment Variables

Environment variables are secret settings for your app.

1. **Find the `.env.example` file** in the project folder

2. **Create a copy** and name it `.env.local`:

   **On Mac/Linux (Terminal):**
   ```bash
   cp .env.example .env.local
   ```

   **On Windows (Command Prompt):**
   ```bash
   copy .env.example .env.local
   ```

   **OR manually:**
   - Right-click `.env.example`
   - Choose "Duplicate" or "Copy"
   - Rename the copy to `.env.local`

3. **Open `.env.local`** in a text editor (Notepad, TextEdit, VS Code)

4. **Fill in your values**:

   ```env
   # Paste your MongoDB connection string here
   MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ai-notes?retryWrites=true&w=majority

   # Generate a random secret (see below)
   NEXTAUTH_SECRET=your-generated-secret-here

   # Keep this as is for local development
   NEXTAUTH_URL=http://localhost:3000

   # Paste your Google AI API key here
   GOOGLE_AI_API_KEY=AIzaXXXXXXXXXXXXXXXXXXXXXXXX
   ```

5. **Generate NEXTAUTH_SECRET**:

   **On Mac/Linux (Terminal):**
   ```bash
   openssl rand -base64 32
   ```

   **On Windows (PowerShell):**
   ```powershell
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   ```

   **OR use online generator:**
   - Go to [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
   - Copy the generated secret

6. **Save the file** (`.env.local`)

---

## Step 8: Run the Application

Time to start the app!

1. **Open Terminal/Command Prompt** in the project folder

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Wait for it to start** (takes 10-30 seconds)

4. **You'll see**:
   ```
   ▲ Next.js 15.x.x
   - Local:        http://localhost:3000
   - Ready in 2s
   ```

5. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

---

## Step 9: Use the Application

### First Time Setup:

1. **Register an Account**:
   - Click "Sign Up"
   - Enter your name, email, and password
   - Click "Create Account"

2. **Login**:
   - Enter your email and password
   - Click "Sign In"

3. **Create Your First Note**:
   - Click "New Note" button
   - Add a title (e.g., "My First Note")
   - Write some content
   - Click "Save Note"

### Try AI Features:

1. **AI Summary**:
   - Write a long paragraph in the content area
   - Click "AI Summary"
   - See a short summary appear

2. **AI Improve**:
   - Write some text with typos or grammar errors
   - Click "AI Improve"
   - See improved version

3. **Generate Tags**:
   - Write content about a topic
   - Click "Generate Tags"
   - Get relevant tag suggestions

### Other Features:

- **Search Notes**: Use the search bar to find notes
- **Edit Note**: Click "Edit" on any note card
- **Delete Note**: Click the trash icon
- **Dark Mode**: Click the sun/moon icon in the header
- **Logout**: Click the logout button

---

## 🎯 Common Issues & Solutions

### Issue: "npm: command not found"
**Solution**: Node.js isn't installed correctly. Go back to Step 1.

### Issue: "Cannot find module"
**Solution**:
```bash
rm -rf node_modules
npm install
```

### Issue: MongoDB connection error
**Solution**:
- Check your MongoDB connection string in `.env.local`
- Make sure you replaced `<username>` and `<password>`
- Verify IP address is whitelisted in MongoDB Atlas

### Issue: Google AI API error
**Solution**:
- Verify API key in `.env.local` is correct
- Check API is enabled at [https://makersuite.google.com](https://makersuite.google.com)

### Issue: Port 3000 already in use
**Solution**:
- Another app is using port 3000
- Kill the process or use a different port:
  ```bash
  npm run dev -- -p 3001
  ```
- Then visit `http://localhost:3001`

### Issue: Changes not showing up
**Solution**:
- Stop the server (Press `Ctrl + C`)
- Restart: `npm run dev`
- Hard refresh browser (`Ctrl + Shift + R` or `Cmd + Shift + R`)

---

## 🛑 Stopping the Application

To stop the server:
1. Go to Terminal/Command Prompt where it's running
2. Press `Ctrl + C` (Windows/Mac)
3. Type `Y` if asked to confirm

---

## 📱 Testing on Mobile

Want to test on your phone?

1. **Make sure phone and computer are on same WiFi**

2. **Find your computer's IP address**:

   **On Mac:**
   ```bash
   ifconfig | grep "inet "
   ```
   Look for something like `192.168.1.x`

   **On Windows:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" like `192.168.1.x`

3. **Update `.env.local`**:
   ```env
   NEXTAUTH_URL=http://192.168.1.x:3000
   ```
   (Replace `x` with your actual IP)

4. **Restart the server**

5. **On your phone's browser**, go to:
   ```
   http://192.168.1.x:3000
   ```

---

## 📚 Next Steps

### Learn More:
- **Full Documentation**: See [README.md](README.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Features List**: See [FEATURES_CHECKLIST.md](FEATURES_CHECKLIST.md)

### Deploy to Production:
When you're ready to make your app available online:
1. Push code to GitHub
2. Deploy to Vercel (free)
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions

---

## 🆘 Need Help?

### Stuck on Setup?
1. Read the error message carefully
2. Check "Common Issues" section above
3. Google the error message
4. Check MongoDB Atlas and Google AI Studio are set up correctly

### Want to Learn More?
- **Next.js**: [https://nextjs.org/learn](https://nextjs.org/learn)
- **MongoDB**: [https://university.mongodb.com/](https://university.mongodb.com/)
- **TypeScript**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

---

## ✅ Success Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] Git installed (`git --version` works)
- [ ] Project downloaded and dependencies installed
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string added to `.env.local`
- [ ] Google AI API key added to `.env.local`
- [ ] NextAuth secret generated and added
- [ ] `npm run dev` runs without errors
- [ ] Can open `http://localhost:3000` in browser
- [ ] Can register a new account
- [ ] Can create and save notes
- [ ] AI features work

---

## 🎉 Congratulations!

You've successfully set up the AI Note-Taking App! You now have a working full-stack application with:
- User authentication
- Note management
- AI-powered features
- Dark/light theme
- Responsive design

Happy note-taking! 📝✨
