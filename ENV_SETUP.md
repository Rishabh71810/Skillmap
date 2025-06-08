# Environment Setup for SkillMap

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Groq AI API (Required for mind map generation)
GROQ_API_KEY=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

# YouTube Data API v3 (Optional - for YouTube video integration)
YOUTUBE_API_KEY=your_youtube_api_key_here

# NextAuth (Required for authentication)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (Optional - for GitHub sign-in)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## API Setup Instructions

### 1. Groq API (Already Configured)
✅ **Your Groq API key is already provided and configured**

### 2. YouTube Data API v3 (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key to your `.env.local` file

### 3. NextAuth Secret
Generate a random secret:
```bash
openssl rand -base64 32
```

### 4. OAuth Providers (Optional)
- **Google**: [Google Cloud Console](https://console.cloud.google.com/)
- **GitHub**: [GitHub Developer Settings](https://github.com/settings/developers)

## Platform Features

### Currently Enabled:
- 🧠 **Groq AI** - Mind map structure generation
- 📺 **YouTube** - Video content (requires API key)
- 🌟 **Khan Academy** - Educational content (free API)

### Future Platforms:
- Coursera, Udemy, MIT OCW, edX (APIs not yet available)

## Getting Started

1. Copy the environment variables above to your `.env.local` file
2. The Groq API key is already provided and working
3. Run `npm run dev` to start the development server
4. Visit `http://localhost:3000` to use SkillMap

## Notes

- The application will work with just the Groq API key
- YouTube integration requires an additional API key but is optional
- Khan Academy resources work without additional API keys
- All other features (export, sharing, etc.) work without external APIs 