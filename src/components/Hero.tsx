'use client'

import { ArrowRight, Sparkles, BookOpen, Target } from 'lucide-react'
import { APP_CONFIG } from '@/lib/config'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Advanced AI Technology
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Anything with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              {' '}AI-Powered Mind Maps
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Enter any topic and watch {APP_CONFIG.NAME} create a comprehensive learning path 
            with curated resources from YouTube, Coursera, Khan Academy, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="btn-primary text-lg px-8 py-4 group">
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Intelligent Structure
              </h3>
              <p className="text-gray-600">
                AI breaks down complex topics into digestible learning paths
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Curated Resources
              </h3>
              <p className="text-gray-600">
                Top-quality videos, courses, and articles for each subtopic
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Personalized Learning
              </h3>
              <p className="text-gray-600">
                Adapts to your skill level and learning preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
} 