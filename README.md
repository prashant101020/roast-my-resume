# Resume Roast 🔥

> Upload your resume. Get emotionally damaged.

**Resume Roast** is a modern AI-powered web app that brutally roasts your resume with savage humor while delivering actionable career advice. Powered by Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🔥 Savage AI Roasts** — Get brutally honest, hilarious feedback on your resume
- **📊 Fun Metrics** — Buzzword Density, Corporate NPC Score, Tech Bro Delusion Meter
- **📄 Multi-format Support** — Upload PDF or DOCX resumes
- **🎯 ATS Score** — See how your resume performs against ATS systems
- **💡 Actionable Advice** — Every roast comes with a fix
- **🎨 Premium UI** — Dark mode, glassmorphism, smooth animations
- **🔌 Multi-LLM Support** — Gemini, Groq, OpenRouter (swap with env vars)
- **🚀 Vercel Ready** — Deploy in seconds

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm
- A Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd resume-roast

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes* | Google Gemini API key |
| `GROQ_API_KEY` | No | Groq API key (alternative) |
| `OPENROUTER_API_KEY` | No | OpenRouter API key (alternative) |
| `NEXT_PUBLIC_APP_URL` | No | App URL (defaults to localhost:3000) |

\* At least one LLM API key is required.

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Animations | Framer Motion |
| Resume Parsing | pdf-parse, mammoth |
| AI/LLM | Google Gemini (primary), Groq, OpenRouter |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/roast/          # AI roast API endpoint
│   ├── roast/              # Upload & results page
│   ├── globals.css         # Design system & custom styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── landing/            # Landing page components
│   ├── results/            # Roast results components
│   ├── shared/             # Shared animated components
│   ├── ui/                 # shadcn/ui primitives
│   └── upload/             # File upload components
├── hooks/
│   └── use-roast.ts        # Main roast flow hook
└── lib/
    ├── llm/                # LLM abstraction layer
    │   ├── provider.ts     # Provider interface & factory
    │   ├── gemini.ts       # Gemini implementation
    │   ├── groq.ts         # Groq implementation
    │   ├── openrouter.ts   # OpenRouter implementation
    │   └── prompts.ts      # System prompts
    ├── parsers/            # Resume parsing
    ├── validators/         # File validation
    ├── types.ts            # TypeScript interfaces
    └── utils.ts            # Utilities
```

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add your `GEMINI_API_KEY` in Vercel Environment Variables
4. Deploy!

> **Note:** The `/api/roast` endpoint uses `maxDuration = 60` for Vercel serverless functions. On the free tier, the max is 10 seconds — you may need the Pro plan for reliable roast generation.

## 🔒 Security

- Files are processed in-memory only (never written to disk)
- MIME type + magic byte validation on uploads
- Server-side file size limits (5MB max)
- API keys are server-side only, never exposed to the client
- Prompt injection protection via structured prompts

## 📄 License

MIT License — go ship something amazing! 🚀
