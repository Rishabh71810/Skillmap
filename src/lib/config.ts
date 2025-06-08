// API Configuration
export const API_CONFIG = {
  // AI/LLM Configuration - Using Groq
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GROQ_MODEL: 'llama3-8b-8192', // Fast Groq model
  GROQ_BASE_URL: 'https://api.groq.com/openai/v1',
  MAX_TOKENS: 2000,
  
  // External APIs - Focus on available ones
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
  YOUTUBE_BASE_URL: 'https://www.googleapis.com/youtube/v3',
  
  // Khan Academy - Free API
  KHAN_ACADEMY_BASE_URL: 'https://www.khanacademy.org/api/v1',
  
  // Firebase Configuration
  FIREBASE_CONFIG: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  },
  
  // NextAuth Configuration
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || '',
  
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  
  // GitHub OAuth
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
};

// Application Constants
export const APP_CONFIG = {
  NAME: 'SkillMap',
  DESCRIPTION: 'AI-Powered Mind Map Learning Assistant',
  VERSION: '1.0.0',
  
  // Mind Map Configuration
  DEFAULT_BRANCHES: 6,
  DEFAULT_DEPTH: 3,
  MAX_BRANCHES: 10,
  MAX_DEPTH: 5,
  
  // Resource Configuration
  MAX_RESOURCES_PER_NODE: 3,
  RESOURCE_FETCH_TIMEOUT: 10000,
  
  // UI Configuration
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  
  // Export Configuration
  EXPORT_FORMATS: ['png', 'svg', 'pdf', 'markdown', 'html', 'json'] as const,
  DEFAULT_EXPORT_QUALITY: 'high' as const,
  
  // Rate Limiting
  RATE_LIMIT_REQUESTS: 100,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
};

// Platform Configuration - Focus on available APIs
export const PLATFORM_CONFIG = {
  youtube: {
    name: 'YouTube',
    icon: '📺',
    color: '#FF0000',
    baseUrl: 'https://www.youtube.com/watch?v=',
    searchParams: {
      part: 'snippet,statistics',
      type: 'video',
      maxResults: 10,
      order: 'relevance',
      videoDuration: 'medium', // 4-20 minutes
      videoDefinition: 'high',
    },
    enabled: true,
  },
  'khan-academy': {
    name: 'Khan Academy',
    icon: '🌟',
    color: '#14BF96',
    baseUrl: 'https://www.khanacademy.org/',
    searchParams: {
      limit: 10,
      format: 'json',
    },
    enabled: true,
  },
  // Disabled platforms for now
  coursera: {
    name: 'Coursera',
    icon: '🎓',
    color: '#0056D3',
    baseUrl: 'https://www.coursera.org/',
    enabled: false,
  },
  udemy: {
    name: 'Udemy',
    icon: '📚',
    color: '#A435F0',
    baseUrl: 'https://www.udemy.com/',
    enabled: false,
  },
  'mit-ocw': {
    name: 'MIT OpenCourseWare',
    icon: '🏛️',
    color: '#8B0000',
    baseUrl: 'https://ocw.mit.edu/',
    enabled: false,
  },
  edx: {
    name: 'edX',
    icon: '🎯',
    color: '#02262B',
    baseUrl: 'https://www.edx.org/',
    enabled: false,
  },
  medium: {
    name: 'Medium',
    icon: '✍️',
    color: '#00AB6C',
    baseUrl: 'https://medium.com/',
    enabled: false,
  },
  github: {
    name: 'GitHub',
    icon: '💻',
    color: '#181717',
    baseUrl: 'https://github.com/',
    enabled: false,
  },
};

// Get only enabled platforms
export const ENABLED_PLATFORMS = Object.entries(PLATFORM_CONFIG)
  .filter(([key, config]) => config.enabled)
  .reduce((acc, [key, config]) => ({ ...acc, [key]: config }), {});

// Validation Rules
export const VALIDATION_RULES = {
  TOPIC: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z0-9\s\-_.,!?]+$/,
  },
  USER_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_TOPIC: 'Please enter a valid topic (2-100 characters)',
  TOPIC_TOO_SHORT: 'Topic must be at least 2 characters long',
  TOPIC_TOO_LONG: 'Topic must be less than 100 characters',
  AI_GENERATION_FAILED: 'Failed to generate mind map. Please try again.',
  RESOURCE_FETCH_FAILED: 'Failed to fetch resources. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please sign in to access this feature.',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please wait before trying again.',
  EXPORT_FAILED: 'Failed to export mind map. Please try again.',
  SAVE_FAILED: 'Failed to save mind map. Please try again.',
  GROQ_API_ERROR: 'AI service unavailable. Please try again.',
  YOUTUBE_QUOTA_EXCEEDED: 'YouTube API quota exceeded. Using fallback resources.',
  API_QUOTA_EXCEEDED: 'API quota exceeded. Some features may be limited.',
};

// Default User Preferences - Updated for available platforms
export const DEFAULT_PREFERENCES = {
  defaultDifficulty: 'intermediate' as const,
  preferredPlatforms: ['youtube', 'khan-academy'] as const,
  preferredResourceTypes: ['video', 'course', 'article'] as const,
  theme: 'light' as const,
  autoSave: true,
};

// Feature Flags
export const FEATURES = {
  AUTHENTICATION: true,
  EXPORT_PDF: true,
  SOCIAL_SHARING: true,
  ANALYTICS: true,
  FEEDBACK_SYSTEM: true,
  COLLABORATIVE_EDITING: false, // Future feature
  AI_CHAT_ASSISTANT: false, // Future feature
  OFFLINE_MODE: false, // Future feature
};

// Groq-specific prompts
export const GROQ_PROMPTS = {
  MIND_MAP_SYSTEM: `You are an expert learning assistant that creates comprehensive mind maps for any topic. 
Your task is to break down topics into logical, learnable chunks.

RULES:
1. Create exactly 6 main branches (subtopics)
2. Each branch should have 3-4 sub-branches (specific topics)
3. Structure should be logical and progressive
4. Consider the specified difficulty level
5. Output must be valid JSON only

JSON FORMAT:
{
  "rootTopic": "string",
  "mainBranches": [
    {
      "id": "branch_1",
      "title": "Branch Title",
      "description": "Brief description",
      "children": [
        {
          "id": "branch_1_child_1",
          "title": "Sub-topic Title",
          "description": "Brief description"
        }
      ]
    }
  ]
}`,

  MIND_MAP_USER: (topic: string, difficulty: string) => 
    `Create a comprehensive learning mind map for: "${topic}"
    
    Difficulty level: ${difficulty}
    Target: ${difficulty === 'beginner' ? 'Someone new to the topic' : 
              difficulty === 'intermediate' ? 'Someone with basic knowledge' : 
              'Someone with advanced understanding'}
    
    Focus on practical, learnable concepts. Make it comprehensive but not overwhelming.
    Return only valid JSON, no additional text.`,
}; 