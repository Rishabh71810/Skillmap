// Phase 1: User Input Types
export interface UserInput {
  topic: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  resourceTypes?: ResourceType[];
  outputFormat?: 'mindmap' | 'list' | 'both';
  userId?: string;
}

// Phase 2: Mind Map Structure Types
export interface MindMapNode {
  id: string;
  title: string;
  description?: string;
  level: number;
  parentId?: string;
  children: MindMapNode[];
  resources: Resource[];
  position?: { x: number; y: number };
  expanded?: boolean;
}

export interface MindMapStructure {
  id: string;
  rootTopic: string;
  mainBranches: MindMapNode[];
  metadata: {
    createdAt: Date;
    userId?: string;
    difficulty: string;
    totalNodes: number;
  };
}

// Phase 3: Resource Types
export type ResourceType = 'video' | 'course' | 'article' | 'book' | 'tutorial';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  thumbnail?: string;
  duration?: string;
  rating?: number;
  viewCount?: number;
  platform: Platform;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  relevanceScore?: number;
}

export type Platform = 'youtube' | 'coursera' | 'udemy' | 'khan-academy' | 'mit-ocw' | 'edx' | 'medium' | 'github';

// Phase 4: Search and Filtering
export interface SearchQuery {
  query: string;
  platform: Platform;
  resourceType: ResourceType;
  difficulty?: string;
  maxResults?: number;
}

export interface ResourceFilter {
  minRating?: number;
  maxDuration?: number;
  platforms?: Platform[];
  types?: ResourceType[];
  difficulty?: string[];
}

// Phase 5: AI Processing
export interface AIPrompt {
  topic: string;
  difficulty: string;
  requestedBranches: number;
  requestedDepth: number;
  context?: string;
}

export interface AIResponse {
  mindMap: MindMapStructure;
  confidence: number;
  suggestions?: string[];
}

// Phase 6: Export Types
export type ExportFormat = 'png' | 'svg' | 'pdf' | 'markdown' | 'html' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  includeResources: boolean;
  includeMetadata: boolean;
  quality?: 'low' | 'medium' | 'high';
}

// Phase 7: User Management
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'github' | 'email';
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  defaultDifficulty: 'beginner' | 'intermediate' | 'advanced';
  preferredPlatforms: Platform[];
  preferredResourceTypes: ResourceType[];
  theme: 'light' | 'dark';
  autoSave: boolean;
}

// Phase 8: Storage and Persistence
export interface SavedMindMap {
  id: string;
  userId: string;
  title: string;
  structure: MindMapStructure;
  isPublic: boolean;
  shareableLink?: string;
  lastModified: Date;
  viewCount: number;
  tags: string[];
}

export interface UserDashboard {
  recentMaps: SavedMindMap[];
  favoriteTopics: string[];
  learningProgress: LearningProgress[];
  recommendations: string[];
}

export interface LearningProgress {
  topicId: string;
  completedResources: string[];
  timeSpent: number;
  lastAccessed: Date;
  progressPercentage: number;
}

// Phase 9: Feedback and Analytics
export interface UserFeedback {
  id: string;
  userId: string;
  mindMapId: string;
  resourceId?: string;
  rating: number;
  comment?: string;
  category: 'content' | 'relevance' | 'quality' | 'ui' | 'other';
  timestamp: Date;
}

export interface Analytics {
  popularTopics: string[];
  averageRatings: { [key: string]: number };
  platformUsage: { [key in Platform]: number };
  userEngagement: {
    dailyActiveUsers: number;
    averageSessionTime: number;
    mapsCreatedToday: number;
  };
}

// UI State Types
export interface UIState {
  isLoading: boolean;
  error?: string;
  currentView: 'input' | 'generating' | 'mindmap' | 'list' | 'dashboard';
  selectedNode?: string;
  zoomLevel: number;
  panPosition: { x: number; y: number };
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Hook Types
export interface UseMindMapReturn {
  mindMap: MindMapStructure | null;
  isLoading: boolean;
  error: string | null;
  generateMindMap: (input: UserInput) => Promise<void>;
  updateNode: (nodeId: string, updates: Partial<MindMapNode>) => void;
  exportMindMap: (options: ExportOptions) => Promise<void>;
  saveMindMap: () => Promise<void>;
}

export interface UseResourcesReturn {
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
  fetchResources: (queries: SearchQuery[]) => Promise<void>;
  filterResources: (filters: ResourceFilter) => Resource[];
  rateResource: (resourceId: string, rating: number) => Promise<void>;
} 