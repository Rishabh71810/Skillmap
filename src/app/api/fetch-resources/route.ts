import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG, PLATFORM_CONFIG, ERROR_MESSAGES } from '../../../lib/config'
import { Resource, MindMapNode } from '../../../types'

interface FetchResourcesRequest {
  structure: {
    mainBranches: MindMapNode[]
  }
  resourceTypes: string[]
  difficulty: string
}

// YouTube API functions
async function searchYouTube(query: string, maxResults: number = 5): Promise<Resource[]> {
  if (!API_CONFIG.YOUTUBE_API_KEY) {
    console.warn('YouTube API key not provided, using fallback resources')
    return createFallbackYouTubeResources(query, maxResults)
  }

  try {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: maxResults.toString(),
      order: 'relevance',
      videoDuration: 'medium',
      videoDefinition: 'high',
      key: API_CONFIG.YOUTUBE_API_KEY
    })

    const response = await fetch(
      `${API_CONFIG.YOUTUBE_BASE_URL}/search?${searchParams}`,
      { method: 'GET' }
    )

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: { message: errorText } }
      }

      // Handle quota exceeded error specifically
      if (response.status === 403 && errorData.error?.reason === 'quotaExceeded') {
        console.warn('YouTube API quota exceeded, using fallback resources')
        return createFallbackYouTubeResources(query, maxResults)
      }

      console.error('YouTube API Error:', errorData)
      return createFallbackYouTubeResources(query, maxResults)
    }

    const data = await response.json()

    return data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description ? item.snippet.description.substring(0, 200) + '...' : `Learn about ${query} in this video`,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      platform: 'youtube' as const,
      type: 'video' as const,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      duration: 'N/A', // YouTube doesn't provide duration in search results
      rating: 4.0, // Default rating
      difficulty: 'intermediate' as const,
      tags: [query]
    })) || []

  } catch (error) {
    console.error('YouTube search error:', error)
    return createFallbackYouTubeResources(query, maxResults)
  }
}

// Fallback YouTube resources when API is unavailable
function createFallbackYouTubeResources(query: string, maxResults: number = 5): Resource[] {
  const fallbackResources = [
    {
      id: `yt-fallback-1-${Date.now()}`,
      title: `${query} Tutorial - YouTube Search`,
      description: `Find comprehensive tutorials and explanations about ${query} on YouTube.`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' tutorial')}`,
      platform: 'youtube' as const,
      type: 'video' as const,
      thumbnail: 'https://www.youtube.com/img/desktop/yt_1200.png',
      duration: '10-20 min',
      rating: 4.0,
      difficulty: 'beginner' as const,
      tags: [query, 'tutorial']
    },
    {
      id: `yt-fallback-2-${Date.now()}`,
      title: `${query} Explained - YouTube Search`,
      description: `Discover detailed explanations and practical examples of ${query} concepts.`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' explained')}`,
      platform: 'youtube' as const,
      type: 'video' as const,
      thumbnail: 'https://www.youtube.com/img/desktop/yt_1200.png',
      duration: '15-25 min',
      rating: 4.2,
      difficulty: 'intermediate' as const,
      tags: [query, 'explanation']
    },
    {
      id: `yt-fallback-3-${Date.now()}`,
      title: `Advanced ${query} - YouTube Search`,
      description: `Explore advanced topics and in-depth analysis of ${query}.`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' advanced')}`,
      platform: 'youtube' as const,
      type: 'video' as const,
      thumbnail: 'https://www.youtube.com/img/desktop/yt_1200.png',
      duration: '20-30 min',
      rating: 4.3,
      difficulty: 'advanced' as const,
      tags: [query, 'advanced']
    }
  ]

  return fallbackResources.slice(0, maxResults)
}

// Khan Academy API functions
async function searchKhanAcademy(query: string, maxResults: number = 5): Promise<Resource[]> {
  // Khan Academy has limited API access, so we'll create curated resource suggestions
  // based on common educational topics
  
  const khanSubjects = {
    'math': ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry'],
    'science': ['biology', 'chemistry', 'physics', 'astronomy'],
    'computer': ['programming', 'algorithms', 'computer science'],
    'economics': ['microeconomics', 'macroeconomics', 'finance'],
    'history': ['world history', 'us history', 'art history'],
    'language': ['grammar', 'writing', 'reading comprehension']
  }

  const resources: Resource[] = []
  const queryLower = query.toLowerCase()

  // Find matching subjects
  for (const [subject, topics] of Object.entries(khanSubjects)) {
    if (queryLower.includes(subject) || topics.some(topic => queryLower.includes(topic))) {
      // Create curated Khan Academy resources
      const subjectResources = [
                 {
           id: `ka-${subject}-intro`,
           title: `Introduction to ${query}`,
           description: `Learn the fundamentals of ${query} with Khan Academy's comprehensive course.`,
           url: `https://www.khanacademy.org/search?search_again=1&q=${encodeURIComponent(query)}`,
           platform: 'khan-academy' as const,
           type: 'course' as const,
           thumbnail: 'https://cdn.kastatic.org/images/khan-logo-dark-background-2.png',
           duration: '2-4 hours',
           rating: 4.5,
           difficulty: 'beginner' as const,
           tags: [query, subject]
         },
         {
           id: `ka-${subject}-advanced`,
           title: `Advanced ${query} Concepts`,
           description: `Master advanced topics in ${query} with in-depth video lessons and practice exercises.`,
           url: `https://www.khanacademy.org/search?search_again=1&q=${encodeURIComponent(query + ' advanced')}`,
           platform: 'khan-academy' as const,
           type: 'course' as const,
           thumbnail: 'https://cdn.kastatic.org/images/khan-logo-dark-background-2.png',
           duration: '4-6 hours',
           rating: 4.7,
           difficulty: 'advanced' as const,
           tags: [query, subject, 'advanced']
         }
      ]
      
      resources.push(...subjectResources.slice(0, maxResults))
      break
    }
  }

  // If no specific subject match, create a general search resource
  if (resources.length === 0) {
         resources.push({
       id: `ka-general-${Date.now()}`,
       title: `${query} - Khan Academy`,
       description: `Explore comprehensive educational content about ${query} on Khan Academy.`,
       url: `https://www.khanacademy.org/search?search_again=1&q=${encodeURIComponent(query)}`,
       platform: 'khan-academy' as const,
       type: 'course' as const,
       thumbnail: 'https://cdn.kastatic.org/images/khan-logo-dark-background-2.png',
       duration: '1-3 hours',
       rating: 4.5,
       difficulty: 'intermediate' as const,
       tags: [query]
     })
  }

  return resources.slice(0, maxResults)
}

// Main resource fetching function
async function fetchResourcesForQuery(query: string, resourceTypes: string[]): Promise<Resource[]> {
  const resources: Resource[] = []

  // Fetch from both platforms in parallel
  const [youtubeResults, khanResults] = await Promise.all([
    searchYouTube(query, 3),
    searchKhanAcademy(query, 3)
  ])

  resources.push(...youtubeResults, ...khanResults)

  // Filter by resource types if specified
  if (resourceTypes && resourceTypes.length > 0) {
    return resources.filter(resource => 
      resourceTypes.includes(resource.type) || resourceTypes.includes('all')
    )
  }

  return resources
}

export async function POST(request: NextRequest) {
  try {
    const body: FetchResourcesRequest = await request.json()
    const { structure, resourceTypes = ['video', 'course'], difficulty } = body

    if (!structure || !structure.mainBranches) {
      return NextResponse.json(
        { error: 'Invalid structure provided' },
        { status: 400 }
      )
    }

    const results = []
    const warnings: string[] = []
    let youtubeQuotaExceeded = false

    // Process each main branch
    for (const branch of structure.mainBranches) {
      const branchResults = {
        branchId: branch.id,
        branchTitle: branch.title,
        resources: [] as Resource[],
        children: [] as any[]
      }

      // Fetch resources for the main branch
      const branchResources = await fetchResourcesForQuery(branch.title, resourceTypes)
      
      // Check if any YouTube resources are fallback resources (indicating quota exceeded)
      const hasFallbackYouTube = branchResources.some(resource => 
        resource.platform === 'youtube' && resource.id.includes('fallback')
      )
      if (hasFallbackYouTube && !youtubeQuotaExceeded) {
        youtubeQuotaExceeded = true
        warnings.push('youtube_quota_exceeded')
      }
      
      branchResults.resources = branchResources.slice(0, 3) // Limit to top 3

      // Process children if they exist
      if (branch.children && branch.children.length > 0) {
        for (const child of branch.children) {
          const childResources = await fetchResourcesForQuery(child.title, resourceTypes)
          
          // Check for fallback YouTube resources in children too
          const hasChildFallbackYouTube = childResources.some(resource => 
            resource.platform === 'youtube' && resource.id.includes('fallback')
          )
          if (hasChildFallbackYouTube && !youtubeQuotaExceeded) {
            youtubeQuotaExceeded = true
            warnings.push('youtube_quota_exceeded')
          }
          
          branchResults.children.push({
            childId: child.id,
            childTitle: child.title,
            resources: childResources.slice(0, 2) // Limit to top 2 for children
          })
        }
      }

      results.push(branchResults)
    }

    // Calculate some statistics
    const totalResources = results.reduce((total, branch) => {
      const branchCount = branch.resources.length
      const childrenCount = branch.children.reduce((childTotal, child) => 
        childTotal + child.resources.length, 0
      )
      return total + branchCount + childrenCount
    }, 0)

    return NextResponse.json({
      success: true,
      data: results,
      warnings,
      metadata: {
        totalResources,
        platforms: ['youtube', 'khan-academy'],
        resourceTypes,
        difficulty,
        fetchedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Fetch Resources Error:', error)
    return NextResponse.json(
      { error: ERROR_MESSAGES.RESOURCE_FETCH_FAILED },
      { status: 500 }
    )
  }
} 