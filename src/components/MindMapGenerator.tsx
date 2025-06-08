'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Brain, Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { MindMapStructure, UserInput } from '@/types'
import { MindMapView } from './MindMapView'
import { ListView } from './ListView'
import { ExportPanel } from './ExportPanel'
import toast from 'react-hot-toast'

interface GenerationStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  phase: string
}

export function MindMapGenerator() {
  const searchParams = useSearchParams()
  const [mindMap, setMindMap] = useState<MindMapStructure | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<'mindmap' | 'list' | 'both'>('mindmap')
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    {
      id: 'validate',
      title: 'Validating Input',
      description: 'Checking topic validity and normalizing input',
      status: 'pending',
      phase: 'Phase 1'
    },
    {
      id: 'structure',
      title: 'Generating Mind Map Structure',
      description: 'AI is creating comprehensive topic breakdown',
      status: 'pending',
      phase: 'Phase 2'
    },
    {
      id: 'resources',
      title: 'Fetching Learning Resources',
      description: 'Searching YouTube, Coursera, and other platforms',
      status: 'pending',
      phase: 'Phase 3'
    },
    {
      id: 'filter',
      title: 'Filtering & Ranking Resources',
      description: 'Scoring and selecting the best resources',
      status: 'pending',
      phase: 'Phase 4'
    },
    {
      id: 'combine',
      title: 'Combining Results',
      description: 'Merging structure with curated resources',
      status: 'pending',
      phase: 'Phase 5'
    }
  ])

  // Extract parameters from URL
  const userInput: UserInput = {
    topic: searchParams.get('topic') || '',
    difficultyLevel: (searchParams.get('difficulty') as any) || 'intermediate',
    resourceTypes: searchParams.get('resources')?.split(',') as any || ['video', 'course', 'article'],
    outputFormat: (searchParams.get('format') as any) || 'mindmap'
  }

  useEffect(() => {
    if (userInput.topic && !mindMap && !isGenerating) {
      generateMindMap()
    }
  }, [userInput.topic])

  const updateStepStatus = (stepId: string, status: GenerationStep['status']) => {
    setGenerationSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    )
  }

  const generateMindMap = async () => {
    if (!userInput.topic) {
      setError('No topic provided')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Phase 1: Validate Input
      updateStepStatus('validate', 'running')
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate validation
      updateStepStatus('validate', 'completed')

      // Phase 2: Generate Mind Map Structure
      updateStepStatus('structure', 'running')
      const structureResponse = await fetch('/api/generate-structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: userInput.topic,
          difficulty: userInput.difficultyLevel,
          branches: 6,
          depth: 3
        })
      })

      if (!structureResponse.ok) {
        throw new Error('Failed to generate mind map structure')
      }

      const structure = await structureResponse.json()
      updateStepStatus('structure', 'completed')

      // Phase 3: Fetch Resources
      updateStepStatus('resources', 'running')
      const resourcesResponse = await fetch('/api/fetch-resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structure: structure.data,
          resourceTypes: userInput.resourceTypes,
          difficulty: userInput.difficultyLevel
        })
      })

      if (!resourcesResponse.ok) {
        throw new Error('Failed to fetch resources')
      }

      const resources = await resourcesResponse.json()
      
      // Check if YouTube API quota was exceeded and show appropriate notification
      if (resources.warnings && resources.warnings.includes('youtube_quota_exceeded')) {
        toast('YouTube API quota exceeded. Using fallback resources for videos.', {
          icon: '⚠️',
          duration: 5000,
        })
      }
      
      updateStepStatus('resources', 'completed')

      // Phase 4: Filter & Rank Resources
      updateStepStatus('filter', 'running')
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate filtering
      updateStepStatus('filter', 'completed')

      // Phase 5: Combine Structure and Resources
      updateStepStatus('combine', 'running')
      const finalMindMap: MindMapStructure = {
        ...structure.data,
        mainBranches: structure.data.mainBranches.map((branch: any, branchIndex: number) => ({
          ...branch,
          resources: resources.data[branchIndex]?.resources || [],
          children: branch.children.map((child: any, childIndex: number) => ({
            ...child,
            resources: resources.data[branchIndex]?.children?.[childIndex]?.resources || []
          }))
        }))
      }

      setMindMap(finalMindMap)
      setCurrentView(userInput.outputFormat || 'mindmap')
      updateStepStatus('combine', 'completed')
      
      toast.success('Mind map generated successfully!')

    } catch (error) {
      console.error('Error generating mind map:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate mind map'
      setError(errorMessage)
      
      // Mark current step as error
      const currentStep = generationSteps.find(step => step.status === 'running')
      if (currentStep) {
        updateStepStatus(currentStep.id, 'error')
      }
      
      toast.error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRetry = () => {
    setGenerationSteps(prev => 
      prev.map(step => ({ ...step, status: 'pending' }))
    )
    setError(null)
    generateMindMap()
  }

  const getStatusIcon = (status: GenerationStep['status']) => {
    switch (status) {
      case 'running':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    }
  }

  if (!userInput.topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Topic Provided</h2>
        <p className="text-gray-600">Please go back and enter a topic to generate a mind map.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userInput.topic}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                {userInput.difficultyLevel}
              </span>
              <span>
                Resources: {userInput.resourceTypes?.join(', ')}
              </span>
            </div>
          </div>
          
          {mindMap && (
            <div className="flex items-center space-x-2">
              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setCurrentView('mindmap')}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentView === 'mindmap'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Mind Map
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentView === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setCurrentView('both')}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentView === 'both'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Both
                </button>
              </div>
              
              <ExportPanel mindMap={mindMap} />
            </div>
          )}
        </div>
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Generating Your Mind Map
            </h3>
          </div>
          
          <div className="space-y-4">
            {generationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {step.phase}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">
                  Generation Failed
                </h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="btn-primary flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Mind Map Display */}
      {mindMap && !isGenerating && (
        <div className="space-y-8">
          {(currentView === 'mindmap' || currentView === 'both') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Interactive Mind Map
                </h3>
              </div>
              <MindMapView mindMap={mindMap} />
            </div>
          )}
          
          {(currentView === 'list' || currentView === 'both') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Structured Learning Path
                </h3>
              </div>
              <ListView mindMap={mindMap} />
            </div>
          )}
        </div>
      )}
    </div>
  )
} 