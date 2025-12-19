# AI Note-Taking App

A modern, full-stack note-taking application with AI-powered features built with Next.js, TypeScript, MongoDB, and Google Gemini AI.

## Features

### Core Features
- **User Authentication**: Secure user registration and login with NextAuth.js
- **Note Management**: Create, read, update, and delete notes
- **Search Functionality**: Search notes by title, content, or tags
- **Tagging System**: Organize notes with custom tags

### AI-Powered Features
- **AI Summary**: Generate concise summaries of long notes
- **AI Improve**: Enhance note content with grammar and clarity improvements
- **AI Tags**: Automatically generate relevant tags for notes

### UI/UX
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean Interface**: Built with shadcn/ui components

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication solution

### AI Integration
- **Google Gemini AI** - AI text processing and generation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (free tier works)
- Google AI API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ai-note-taking-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ai-notes?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google AI API Key
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
```

### Setting Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string and replace `<password>` with your database user password
6. Add the connection string to your `.env.local` file

### Getting Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and add it to your `.env.local` file

### Generate NextAuth Secret

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Add the output to your `.env.local` file.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Register**: Create a new account at `/auth/register`
2. **Login**: Sign in at `/auth/login`
3. **Create Notes**: Click "New Note" to create your first note
4. **AI Features**:
   - Click "AI Summary" to generate a summary
   - Click "AI Improve" to enhance your text
   - Click "Generate Tags" to auto-tag your note
5. **Search**: Use the search bar to find notes by title, content, or tags
6. **Edit/Delete**: Click on a note to edit it or delete it

## Project Structure

```
ai-note-taking-app/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── notes/        # Notes CRUD endpoints
│   │   └── ai/           # AI feature endpoints
│   ├── auth/             # Auth pages (login, register)
│   ├── dashboard/        # Protected dashboard pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── note-card.tsx     # Note display component
│   ├── note-editor.tsx   # Note editing component
│   ├── search-bar.tsx    # Search component
│   └── theme-toggle.tsx  # Theme switcher
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   ├── auth.ts           # NextAuth configuration
│   ├── ai.ts             # Google AI integration
│   └── utils.ts          # Utility functions
├── models/
│   ├── User.ts           # User model
│   └── Note.ts           # Note model
└── middleware.ts         # Route protection
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login (handled by NextAuth)
- `POST /api/auth/logout` - Logout (handled by NextAuth)

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Get a specific note
- `PUT /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note
- `GET /api/notes/search?q=query` - Search notes

### AI Features
- `POST /api/ai/summary` - Generate note summary
- `POST /api/ai/improve` - Improve note content
- `POST /api/ai/tags` - Generate tags

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

Make sure to update `NEXTAUTH_URL` in production:
```env
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `GOOGLE_AI_API_KEY` | Google AI API key | Yes |

## License

MIT

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Database by [MongoDB](https://www.mongodb.com/)
