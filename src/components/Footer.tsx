'use client'

import Link from 'next/link'
import { Brain, Github, Twitter, Mail, Heart } from 'lucide-react'
import { APP_CONFIG } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">{APP_CONFIG.NAME}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {APP_CONFIG.DESCRIPTION}. Transform any topic into a comprehensive learning journey 
              with AI-curated resources and interactive mind maps.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/skillmap"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/skillmap"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@skillmap.ai"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-white transition-colors">
                  Explore Topics
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-white transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-400 hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Made with Love */}
        <div className="text-center mt-6 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for learners everywhere
          </p>
        </div>
      </div>
    </footer>
  )
} 