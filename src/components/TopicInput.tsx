'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Settings, Sparkles } from 'lucide-react'
import { UserInput } from '@/types'
import { VALIDATION_RULES, ERROR_MESSAGES } from '@/lib/config'
import toast from 'react-hot-toast'

export function TopicInput() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState<UserInput>({
    topic: '',
    difficultyLevel: 'intermediate',
    resourceTypes: ['video', 'course', 'article'],
    outputFormat: 'mindmap'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Phase 1: Input Validation
  const validateTopic = (topic: string): string | null => {
    if (!topic.trim()) {
      return 'Topic is required'
    }
    if (topic.trim().length < VALIDATION_RULES.TOPIC.MIN_LENGTH) {
      return ERROR_MESSAGES.TOPIC_TOO_SHORT
    }
    if (topic.trim().length > VALIDATION_RULES.TOPIC.MAX_LENGTH) {
      return ERROR_MESSAGES.TOPIC_TOO_LONG
    }
    if (!VALIDATION_RULES.TOPIC.PATTERN.test(topic.trim())) {
      return ERROR_MESSAGES.INVALID_TOPIC
    }
    return null
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, topic: value }))
    
    // Clear errors on change
    if (errors.topic) {
      setErrors(prev => ({ ...prev, topic: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate input
    const topicError = validateTopic(formData.topic)
    if (topicError) {
      setErrors({ topic: topicError })
      return
    }

    setIsLoading(true)
    
    try {
      // Normalize topic (Phase 1: Input Validation)
      const normalizedTopic = formData.topic.trim()
        .toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letters
      
      const inputData: UserInput = {
        ...formData,
        topic: normalizedTopic
      }

      // Navigate to mind map generation page
      const searchParams = new URLSearchParams({
        topic: inputData.topic,
        difficulty: inputData.difficultyLevel || 'intermediate',
        resources: inputData.resourceTypes?.join(',') || '',
        format: inputData.outputFormat || 'mindmap'
      })

      router.push(`/generate?${searchParams.toString()}`)
      
    } catch (error) {
      console.error('Error processing topic:', error)
      toast.error('Failed to process topic. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResourceTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      resourceTypes: prev.resourceTypes?.includes(type as any)
        ? prev.resourceTypes.filter(t => t !== type)
        : [...(prev.resourceTypes || []), type as any]
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Topic Input */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={formData.topic}
              onChange={handleTopicChange}
              placeholder="Enter any topic you want to learn (e.g., Machine Learning, Blockchain, Photography)"
              className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                errors.topic
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
              } focus:ring-4`}
              disabled={isLoading}
            />
          </div>
          {errors.topic && (
            <p className="mt-2 text-sm text-red-600">{errors.topic}</p>
          )}
        </div>

        {/* Advanced Options Toggle */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <Settings className="w-4 h-4 mr-1" />
            Advanced Options
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, difficultyLevel: level as any }))}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      formData.difficultyLevel === level
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Types
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleResourceTypeToggle('video')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    formData.resourceTypes?.includes('video')
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">📺</div>
                    <div className="text-sm font-medium">Videos</div>
                    <div className="text-xs text-gray-500">YouTube</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleResourceTypeToggle('course')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    formData.resourceTypes?.includes('course')
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">🌟</div>
                    <div className="text-sm font-medium">Courses</div>
                    <div className="text-xs text-gray-500">Khan Academy</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleResourceTypeToggle('article')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    formData.resourceTypes?.includes('article')
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">📚</div>
                    <div className="text-sm font-medium">Articles</div>
                    <div className="text-xs text-gray-500">Khan Academy</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleResourceTypeToggle('tutorial')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    formData.resourceTypes?.includes('tutorial')
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">🎯</div>
                    <div className="text-sm font-medium">Tutorials</div>
                    <div className="text-xs text-gray-500">Both Platforms</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Output Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'mindmap', label: 'Mind Map' },
                  { value: 'list', label: 'List View' },
                  { value: 'both', label: 'Both' }
                ].map((format) => (
                  <button
                    key={format.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, outputFormat: format.value as any }))}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      formData.outputFormat === format.value
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.topic.trim()}
          className="w-full btn-primary text-lg py-4 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="spinner mr-3" />
              Generating Mind Map...
            </>
          ) : (
            <>
              <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Generate Mind Map
            </>
          )}
        </button>
      </form>

      {/* Example Topics */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-3">Popular topics to try:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            'Machine Learning',
            'Blockchain',
            'Web Development',
            'Data Science',
            'Digital Marketing',
            'Photography'
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => setFormData(prev => ({ ...prev, topic }))}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-800 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 