'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  MarkerType,
} from 'reactflow'
import { MindMapStructure, MindMapNode } from '@/types'
import { PLATFORM_CONFIG } from '@/lib/config'
import 'reactflow/dist/style.css'

interface MindMapViewProps {
  mindMap: MindMapStructure
}

// Custom Node Component
const CustomNode = ({ data }: { data: any }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const getNodeStyles = () => {
    switch (data.nodeType) {
      case 'root':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg min-w-[200px] max-w-[250px]'
      case 'branch':
        return 'bg-gradient-to-br from-sky-400 to-sky-500 text-white shadow-md min-w-[180px] max-w-[220px]'
      case 'leaf':
        return 'bg-white border-2 border-gray-300 text-gray-800 shadow-sm min-w-[160px] max-w-[200px]'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getNodeIcon = () => {
    switch (data.nodeType) {
      case 'root': return '🎯'
      case 'branch': return '📚'
      case 'leaf': return '📄'
      default: return '•'
    }
  }

  return (
    <div className={`relative rounded-xl p-4 transition-all duration-200 hover:scale-105 ${getNodeStyles()} ${data.isSelected ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}`}>
      {/* Node Header */}
      <div className="flex items-start gap-2 mb-2">
        <span className="text-lg flex-shrink-0">{getNodeIcon()}</span>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-sm leading-tight ${data.nodeType === 'root' ? 'text-lg' : ''}`}>
            {data.title}
          </h3>
          {data.description && (
            <p className={`text-xs mt-1 ${data.nodeType === 'root' || data.nodeType === 'branch' ? 'text-blue-100' : 'text-gray-600'} line-clamp-2`}>
              {data.description}
            </p>
          )}
        </div>
        {data.children?.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${data.nodeType === 'root' || data.nodeType === 'branch' ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>
      
      {/* Resources Section */}
      {isExpanded && data.resources && data.resources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="space-y-2">
            {data.resources.slice(0, 2).map((resource: any, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <span className="text-xs flex-shrink-0">
                  {PLATFORM_CONFIG[resource.platform as keyof typeof PLATFORM_CONFIG]?.icon || '📄'}
                </span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs hover:underline flex-1 truncate font-medium ${data.nodeType === 'root' || data.nodeType === 'branch' ? 'text-white' : 'text-gray-700'}`}
                  title={resource.title}
                >
                  {resource.title}
                </a>
                <div className={`text-xs px-2 py-1 rounded ${data.nodeType === 'root' || data.nodeType === 'branch' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {resource.type}
                </div>
              </div>
            ))}
            {data.resources.length > 2 && (
              <div className={`text-xs text-center py-1 ${data.nodeType === 'root' || data.nodeType === 'branch' ? 'text-blue-100' : 'text-gray-500'}`}>
                +{data.resources.length - 2} more resources
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Connection handles */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></div>
    </div>
  )
}

// Node types
const nodeTypes = {
  custom: CustomNode,
}

export function MindMapView({ mindMap }: MindMapViewProps) {
  // Convert MindMapStructure to ReactFlow nodes and edges
  const convertToFlowElements = useCallback(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []

    // Root node positioned at center
    nodes.push({
      id: 'root',
      type: 'custom',
      position: { x: 400, y: 200 },
      data: {
        title: mindMap.rootTopic,
        nodeType: 'root',
        resources: [],
      },
    })

    // Main branches with improved layout
    const branchCount = mindMap.mainBranches.length
    const angleStep = (2 * Math.PI) / branchCount
    const radius = Math.max(350, branchCount * 50) // Dynamic radius based on branch count

    mindMap.mainBranches.forEach((branch, branchIndex) => {
      const angle = branchIndex * angleStep - Math.PI / 2 // Start from top
      const x = 500 + radius * Math.cos(angle)
      const y = 300 + radius * Math.sin(angle)

      // Branch node
      nodes.push({
        id: branch.id,
        type: 'custom',
        position: { x, y },
        data: {
          title: branch.title,
          description: branch.description,
          nodeType: 'branch',
          resources: branch.resources,
          children: branch.children,
        },
      })

      // Edge from root to branch
      edges.push({
        id: `root-${branch.id}`,
        source: 'root',
        target: branch.id,
        type: 'smoothstep',
        animated: false,
        style: {
          stroke: '#3b82f6',
          strokeWidth: 3,
          strokeDasharray: '0',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      })

      // Child nodes with improved positioning
      branch.children.forEach((child, childIndex) => {
        const childAngle = angle + (childIndex - (branch.children.length - 1) / 2) * 0.5
        const childRadius = 200
        const childX = x + childRadius * Math.cos(childAngle)
        const childY = y + childRadius * Math.sin(childAngle)

        nodes.push({
          id: child.id,
          type: 'custom',
          position: { x: childX, y: childY },
          data: {
            title: child.title,
            description: child.description,
            nodeType: 'leaf',
            resources: child.resources,
          },
        })

        // Edge from branch to child with styling
        edges.push({
          id: `${branch.id}-${child.id}`,
          source: branch.id,
          target: child.id,
          type: 'smoothstep',
          animated: false,
          style: {
            stroke: '#0ea5e9',
            strokeWidth: 2,
            strokeDasharray: '5,5',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#0ea5e9',
          },
        })
      })
    })

    return { nodes, edges }
  }, [mindMap])

  const { nodes: initialNodes, edges: initialEdges } = convertToFlowElements()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges],
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Handle node selection
    setNodes((nds: Node[]) =>
      nds.map((n: Node) => ({
        ...n,
        data: {
          ...n.data,
          isSelected: n.id === node.id,
        },
      }))
    )
  }, [setNodes])

  return (
    <div className="h-96 md:h-[700px] w-full bg-gradient-to-br from-blue-50 via-white to-sky-50 rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.3}
        maxZoom={2}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Controls 
          className="bg-white shadow-lg rounded-lg border border-gray-200"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          className="bg-white shadow-lg rounded-lg border border-gray-200"
          nodeColor={(node: Node) => {
            switch (node.data?.nodeType) {
              case 'root': return '#3b82f6'
              case 'branch': return '#0ea5e9'
              case 'leaf': return '#6b7280'
              default: return '#9ca3af'
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
          pannable
          zoomable
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1.5} 
          color="#e5e7eb"
        />
      </ReactFlow>
    </div>
  )
} 