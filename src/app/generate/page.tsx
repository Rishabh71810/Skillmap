'use client'

import { Suspense } from 'react'
import { MindMapGenerator } from '@/components/MindMapGenerator'
import { Header } from '@/components/Header'

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-8">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="spinner w-8 h-8 mx-auto mb-4" />
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }
        >
          <MindMapGenerator />
        </Suspense>
      </main>
    </div>
  )
} 