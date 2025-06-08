'use client'

import { 
  Sparkles
} from 'lucide-react'

export function Features() {
  const features = [
    {
      title: 'AI-Powered Structure',
      description: 'Advanced Groq AI creates comprehensive learning paths tailored to your topic and skill level.',
      icon: '🧠',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'YouTube Integration',
      description: 'Curated video content from YouTube\'s vast library, filtered for quality and relevance.',
      icon: '📺',
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Khan Academy Resources',
      description: 'High-quality educational content from Khan Academy\'s comprehensive curriculum.',
      icon: '🌟',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Interactive Mind Maps',
      description: 'Dynamic, clickable mind maps that adapt to your learning progress and preferences.',
      icon: '🗺️',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Smart Resource Matching',
      description: 'AI algorithms match the best educational content to each topic in your mind map.',
      icon: '🎯',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Multiple Export Options',
      description: 'Export your mind maps as images, PDFs, or structured documents for offline learning.',
      icon: '💾',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Groq AI & Premium Platforms
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn Faster with AI-Curated Content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Groq-powered AI creates comprehensive learning paths and matches you 
            with the best YouTube videos and Khan Academy courses instantly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4 text-white text-xl`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Workflow Timeline */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 h-full hidden lg:block" />
            
            {/* Timeline Steps */}
            <div className="space-y-12 lg:space-y-16">
              {[
                {
                  step: '01',
                  title: 'Enter Your Topic',
                  description: 'Simply type any subject you want to learn - from "Machine Learning" to "Ancient History"',
                  color: 'bg-primary-500'
                },
                {
                  step: '02',
                  title: 'AI Generates Structure',
                  description: 'Groq AI creates a comprehensive mind map with logical learning progression',
                  color: 'bg-secondary-500'
                },
                {
                  step: '03',
                  title: 'Resources Curated',
                  description: 'Find the best YouTube videos and Khan Academy courses for each topic',
                  color: 'bg-accent-500'
                },
                {
                  step: '04',
                  title: 'Start Learning',
                  description: 'Explore your personalized learning path and track your progress',
                  color: 'bg-primary-600'
                }
              ].map((item, index) => (
                <div
                  key={item.step}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="text-center lg:text-left">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Step Circle */}
                  <div className="relative lg:w-2/12 flex justify-center my-6 lg:my-0">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {item.step}
                    </div>
                  </div>
                  
                  {/* Spacer */}
                  <div className="lg:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 