import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG, GROQ_PROMPTS, ERROR_MESSAGES } from '../../../lib/config'

interface GenerateStructureRequest {
  topic: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  branches?: number
  depth?: number
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateStructureRequest = await request.json()
    const { topic, difficulty, branches = 6, depth = 3 } = body

    // Validate input
    if (!topic || topic.length < 2) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOPIC },
        { status: 400 }
      )
    }

    if (!API_CONFIG.GROQ_API_KEY) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.GROQ_API_ERROR },
        { status: 500 }
      )
    }

    // Call Groq API
    const response = await fetch(`${API_CONFIG.GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: API_CONFIG.GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content: GROQ_PROMPTS.MIND_MAP_SYSTEM
          },
          {
            role: 'user',
            content: GROQ_PROMPTS.MIND_MAP_USER(topic, difficulty)
          }
        ],
        max_tokens: API_CONFIG.MAX_TOKENS,
        temperature: 0.7,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Groq API Error:', errorData)
      return NextResponse.json(
        { error: ERROR_MESSAGES.GROQ_API_ERROR },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.AI_GENERATION_FAILED },
        { status: 500 }
      )
    }

    // Parse the AI response
    let mindMapStructure
    try {
      const content = data.choices[0].message.content.trim()
      // Remove any code block markers if present
      const jsonContent = content.replace(/```json\n?|\n?```/g, '')
      mindMapStructure = JSON.parse(jsonContent)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      return NextResponse.json(
        { error: ERROR_MESSAGES.AI_GENERATION_FAILED },
        { status: 500 }
      )
    }

    // Validate and enhance the structure
    if (!mindMapStructure.rootTopic || !mindMapStructure.mainBranches) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.AI_GENERATION_FAILED },
        { status: 500 }
      )
    }

    // Ensure proper structure and add missing fields
    const enhancedStructure = {
      id: 'root',
      rootTopic: mindMapStructure.rootTopic || topic,
      description: `Comprehensive learning path for ${topic}`,
      difficulty,
      totalEstimatedTime: `${Math.ceil(mindMapStructure.mainBranches.length * 2)} hours`,
      mainBranches: mindMapStructure.mainBranches.map((branch: any, index: number) => ({
        id: branch.id || `branch_${index + 1}`,
        title: branch.title,
        description: branch.description || '',
        estimatedTime: '30 minutes',
        resources: [], // Will be filled by resource fetching
        children: (branch.children || []).map((child: any, childIndex: number) => ({
          id: child.id || `${branch.id || `branch_${index + 1}`}_child_${childIndex + 1}`,
          title: child.title,
          description: child.description || '',
          estimatedTime: '15 minutes',
          resources: [] // Will be filled by resource fetching
        }))
      }))
    }

    return NextResponse.json({
      success: true,
      data: enhancedStructure,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: API_CONFIG.GROQ_MODEL,
        difficulty,
        branches: enhancedStructure.mainBranches.length
      }
    })

  } catch (error) {
    console.error('Generate Structure Error:', error)
    return NextResponse.json(
      { error: ERROR_MESSAGES.AI_GENERATION_FAILED },
      { status: 500 }
    )
  }
} 