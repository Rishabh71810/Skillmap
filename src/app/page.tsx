import { Hero } from '../components/Hero'
import { TopicInput } from '../components/TopicInput'
import { Features } from '../components/Features'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Topic Input Section - Phase 1 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Start Your Learning Journey
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Enter any topic and watch AI create a comprehensive mind map with curated resources
              </p>
            </div>
            
            <TopicInput />
          </div>
        </section>
        
        {/* Features Section */}
        <Features />
      </main>
      
      <Footer />
    </div>
  )
} 