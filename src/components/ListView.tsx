'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { MindMapStructure, MindMapNode, Resource } from '@/types'
import { PLATFORM_CONFIG } from '@/lib/config'

interface ListViewProps {
  mindMap: MindMapStructure
}

interface NodeItemProps {
  node: MindMapNode
  level: number
}

function ResourceItem({ resource }: { resource: Resource }) {
  const platformConfig = PLATFORM_CONFIG[resource.platform as keyof typeof PLATFORM_CONFIG]
  
  return (
    <div className={`resource-card ${resource.type} mb-2`}>
      <div className="flex items-center space-x-3">
        <span className="text-sm">
          {platformConfig?.icon || '📄'}
        </span>
        <div className="flex-1 min-w-0">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-900 hover:text-primary-600 flex items-center group"
          >
            <span className="truncate">{resource.title}</span>
            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          {resource.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {resource.description}
            </p>
          )}
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-500 capitalize">
              {resource.type}
            </span>
            {resource.duration && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{resource.duration}</span>
              </>
            )}
            {resource.rating && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  ⭐ {resource.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function NodeItem({ node, level }: NodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const hasResources = node.resources && node.resources.length > 0

  const getNodeIcon = () => {
    switch (level) {
      case 1: return '🎯'
      case 2: return '📚'
      default: return '📄'
    }
  }

  const getNodeColor = () => {
    switch (level) {
      case 1: return 'border-l-primary-500 bg-primary-50'
      case 2: return 'border-l-secondary-500 bg-secondary-50'
      default: return 'border-l-gray-400 bg-gray-50'
    }
  }

  return (
    <div className={`border-l-4 ${getNodeColor()} rounded-r-lg p-4 mb-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-lg">{getNodeIcon()}</span>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className={`font-semibold ${
                level === 1 ? 'text-lg text-primary-900' : 
                level === 2 ? 'text-base text-secondary-900' : 
                'text-sm text-gray-800'
              }`}>
                {node.title}
              </h3>
              {hasChildren && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            
            {node.description && (
              <p className="text-sm text-gray-600 mt-1 mb-3">
                {node.description}
              </p>
            )}

            {/* Resources */}
            {hasResources && (
              <div className="mt-3">
                <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Learning Resources
                </h4>
                <div className="space-y-2">
                  {node.resources.map((resource, index) => (
                    <ResourceItem key={index} resource={resource} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-4 ml-6 space-y-3">
          {node.children.map((child) => (
            <NodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ListView({ mindMap }: ListViewProps) {
  return (
    <div className="p-6">
      {/* Root Topic */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">🧠</span>
          <h1 className="text-2xl font-bold text-gray-900">
            {mindMap.rootTopic}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
          <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
            {mindMap.metadata.difficulty}
          </span>
          <span>
            {mindMap.metadata.totalNodes} topics
          </span>
          <span>
            Created {new Date(mindMap.metadata.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Main Branches */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Learning Path
        </h2>
        
        {mindMap.mainBranches.map((branch, index) => (
          <div key={branch.id}>
            <div className="flex items-center space-x-2 mb-3">
              <span className="flex items-center justify-center w-6 h-6 bg-primary-600 text-white text-xs font-bold rounded-full">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Step {index + 1}
              </span>
            </div>
            <NodeItem node={branch} level={1} />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Learning Path Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Main Topics:</span>
            <span className="ml-2 text-gray-600">{mindMap.mainBranches.length}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Subtopics:</span>
            <span className="ml-2 text-gray-600">
              {mindMap.mainBranches.reduce((acc, branch) => acc + branch.children.length, 0)}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Resources:</span>
            <span className="ml-2 text-gray-600">
              {mindMap.mainBranches.reduce((acc, branch) => 
                acc + branch.resources.length + 
                branch.children.reduce((childAcc, child) => childAcc + child.resources.length, 0), 0
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 