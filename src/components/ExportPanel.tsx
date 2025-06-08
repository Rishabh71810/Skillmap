'use client'

import { useState } from 'react'
import { Download, FileText, Image, Share2 } from 'lucide-react'
import { MindMapStructure, ExportFormat, ExportOptions } from '@/types'
import { APP_CONFIG } from '@/lib/config'
import toast from 'react-hot-toast'

interface ExportPanelProps {
  mindMap: MindMapStructure
}

export function ExportPanel({ mindMap }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const exportFormats = [
    {
      format: 'png' as ExportFormat,
      label: 'PNG Image',
      icon: Image,
      description: 'High-quality image for presentations'
    },
    {
      format: 'pdf' as ExportFormat,
      label: 'PDF Document',
      icon: FileText,
      description: 'Printable document with resources'
    },
    {
      format: 'markdown' as ExportFormat,
      label: 'Markdown',
      icon: FileText,
      description: 'Text format for documentation'
    },
    {
      format: 'json' as ExportFormat,
      label: 'JSON Data',
      icon: FileText,
      description: 'Raw data for developers'
    }
  ]

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true)
    
    try {
      const exportOptions: ExportOptions = {
        format,
        includeResources: true,
        includeMetadata: true,
        quality: 'high'
      }

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mindMap,
          options: exportOptions
        })
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      // Handle different export types
      if (format === 'json') {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        downloadBlob(blob, `${mindMap.rootTopic.replace(/\s+/g, '_')}.json`)
      } else if (format === 'markdown') {
        const text = await response.text()
        const blob = new Blob([text], { type: 'text/markdown' })
        downloadBlob(blob, `${mindMap.rootTopic.replace(/\s+/g, '_')}.md`)
      } else {
        // For binary formats (PNG, PDF)
        const blob = await response.blob()
        const extension = format === 'png' ? 'png' : 'pdf'
        downloadBlob(blob, `${mindMap.rootTopic.replace(/\s+/g, '_')}.${extension}`)
      }

      toast.success(`Mind map exported as ${format.toUpperCase()}`)
      setShowOptions(false)
      
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export mind map')
    } finally {
      setIsExporting(false)
    }
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    try {
      // Generate shareable link
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mindMap })
      })

      if (!response.ok) {
        throw new Error('Failed to create share link')
      }

      const { shareUrl } = await response.json()
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Share link copied to clipboard!')
      
    } catch (error) {
      console.error('Share error:', error)
      toast.error('Failed to create share link')
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="btn-ghost flex items-center"
          title="Share mind map"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>

        {/* Export Button */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="btn-primary flex items-center"
          disabled={isExporting}
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>

      {/* Export Options Dropdown */}
      {showOptions && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Export Options
            </h3>
            
            <div className="space-y-2">
              {exportFormats.map((item) => (
                <button
                  key={item.format}
                  onClick={() => handleExport(item.format)}
                  disabled={isExporting}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start space-x-3">
                    <item.icon className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Exports include all resources and metadata
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  )
} 