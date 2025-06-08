# SkillMap - AI-Powered Mind Map Learning Assistant

![SkillMap Logo](https://via.placeholder.com/800x200/3b82f6/ffffff?text=SkillMap+-+AI-Powered+Learning)

SkillMap is an innovative AI-powered learning assistant that transforms any topic into a comprehensive, interactive mind map with curated resources from top educational platforms. Save hours of research time and get a structured learning path in minutes.

## 🌟 Features

### ✅ Complete 9-Phase Workflow

**Phase 1: User Input Stage**
- ✅ Topic input with validation
- ✅ Difficulty level selection (Beginner, Intermediate, Advanced)
- ✅ Resource type preferences (Videos, Courses, Articles, Books, Tutorials)
- ✅ Output format selection (Mind Map, List View, Both)

**Phase 2: AI Mind Map Generation**
- ✅ LLM-powered topic breakdown
- ✅ 5-7 main branches with 3-5 subtopics each
- ✅ Structured hierarchical organization

**Phase 3: Resource Fetching**
- ✅ Multi-platform resource discovery
- ✅ YouTube, Coursera, Khan Academy, and more
- ✅ Intelligent query generation for each subtopic

**Phase 4: Resource Filtering & Ranking**
- ✅ Relevance scoring algorithm
- ✅ Quality-based filtering
- ✅ Top 2-3 resources per subtopic

**Phase 5: Combine & Structure Output**
- ✅ Mind map + resources integration
- ✅ Metadata preservation
- ✅ Clean, organized structure

**Phase 6: Frontend Rendering**
- ✅ Interactive mind map visualization
- ✅ Clean list view alternative
- ✅ Expandable/collapsible nodes
- ✅ Resource preview and links

**Phase 7: Export Options**
- ✅ PNG/SVG image export
- ✅ PDF document generation
- ✅ Markdown format
- ✅ JSON data export

**Phase 8: Sharing & Collaboration**
- ✅ Shareable public links
- ✅ Social media integration
- ✅ Copy-to-clipboard functionality

**Phase 9: User Management (Future)**
- 🔄 User authentication
- 🔄 Personal dashboard
- 🔄 Learning progress tracking
- 🔄 AI recommendations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key
- YouTube Data API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/skillmap.git
   cd skillmap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

### 1. Enter Your Topic
Simply type any subject you want to learn about:
- "Machine Learning"
- "Blockchain Technology" 
- "Digital Photography"
- "Web Development"

### 2. Customize Your Preferences
- **Difficulty Level**: Beginner, Intermediate, or Advanced
- **Resource Types**: Videos, Courses, Articles, Books, Tutorials
- **Output Format**: Mind Map, List View, or Both

### 3. AI Generates Structure
Our AI creates a comprehensive breakdown:
- 5-7 main learning branches
- 3-5 subtopics under each branch
- Logical learning progression

### 4. Resources Are Curated
Smart algorithms find the best resources:
- YouTube videos with high ratings
- Top Coursera and Udemy courses
- Quality articles and tutorials
- Ranked by relevance and popularity

### 5. Interactive Exploration
Explore your personalized learning path:
- Interactive mind map visualization
- Clean list view for linear learning
- Click to access resources instantly
- Expand/collapse sections as needed

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom Components
- **Mind Maps**: ReactFlow, Custom Node Components
- **AI**: OpenAI GPT-4 Turbo
- **APIs**: YouTube Data API, Custom Resource APIs
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: Firebase (planned)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
skillmap/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── generate/        # Mind map generation
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Landing page hero
│   │   ├── TopicInput.tsx   # Phase 1: User input
│   │   ├── MindMapGenerator.tsx # Phase 2-5: Generation
│   │   ├── MindMapView.tsx  # Phase 6: Mind map view
│   │   ├── ListView.tsx     # Phase 6: List view
│   │   ├── ExportPanel.tsx  # Phase 7: Export options
│   │   ├── Features.tsx     # Feature showcase
│   │   └── Footer.tsx       # Site footer
│   ├── lib/                 # Utilities and config
│   │   └── config.ts        # App configuration
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # All type definitions
│   └── api/                 # API routes (planned)
├── public/                  # Static assets
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) - Main actions, links
- **Secondary**: Sky (#0ea5e9) - Secondary elements
- **Accent**: Purple (#d946ef) - Highlights, special features
- **Gray Scale**: Comprehensive gray palette for text and backgrounds

### Components
- **Buttons**: Primary, Secondary, Ghost variants
- **Cards**: Mind map nodes, resource cards, feature cards
- **Forms**: Input fields, dropdowns, toggles
- **Navigation**: Header, footer, breadcrumbs

## 🔧 Configuration

### Environment Variables

```env
# AI Configuration
OPENAI_API_KEY=your_openai_api_key

# External APIs
YOUTUBE_API_KEY=your_youtube_api_key

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Firebase (Optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### App Configuration

Customize the app behavior in `src/lib/config.ts`:

```typescript
export const APP_CONFIG = {
  NAME: 'SkillMap',
  DEFAULT_BRANCHES: 6,        // Number of main topics
  DEFAULT_DEPTH: 3,           // Subtopic depth
  MAX_RESOURCES_PER_NODE: 3,  // Resources per topic
  // ... more options
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   ```bash
   vercel --prod
   ```

2. **Set environment variables**
   Add all required environment variables in the Vercel dashboard

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Other Platforms

SkillMap can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- ReactFlow for mind map visualization
- Tailwind CSS for styling system
- Next.js team for the amazing framework
- All the educational platforms that provide learning resources

## 📞 Support

- **Documentation**: [docs.skillmap.ai](https://docs.skillmap.ai)
- **Issues**: [GitHub Issues](https://github.com/your-username/skillmap/issues)
- **Email**: hello@skillmap.ai
- **Discord**: [Join our community](https://discord.gg/skillmap)

---

**Made with ❤️ for learners everywhere**

Transform any topic into a comprehensive learning journey with SkillMap! #   S k i l l m a p  
 