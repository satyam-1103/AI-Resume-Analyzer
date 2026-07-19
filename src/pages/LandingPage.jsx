import { Target, ListChecks, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Hero from '../components/landing/Hero'
import FeatureCard from '../components/landing/FeatureCard'
import HowItWorksStep from '../components/landing/HowItWorksStep'
import CreditsBanner from '../components/landing/CreditsBanner'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function LandingPage() {
  usePageTitle('Home')
  return (
    <div className="min-h-screen bg-[color:var(--bg-base)] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)] tracking-tight">
              Everything you need to optimize your resume
            </h2>
            <p className="mt-4 text-[color:var(--text-secondary)]">
              Powered by advanced AI to simulate real ATS systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <FeatureCard
              icon={Target}
              title="ATS Score Checker"
              description="Upload your resume and get an instant score reflecting how well you match standard Applicant Tracking Systems. We check for formatting, keywords, and structure."
              credits="4"
              color="violet"
            />
            <FeatureCard
              icon={ListChecks}
              title="Skills Gap Analysis"
              description="Identify exactly which skills you're missing for your target role. We break down both your strengths and the critical gaps holding you back."
              credits="Included"
              color="cyan"
            />
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[color:var(--bg-subtle)]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[color:var(--text-primary)] tracking-tight">
                How it works
              </h2>
              <p className="mt-4 text-[color:var(--text-secondary)]">
                Three simple steps to a better resume.
              </p>
            </div>

            <div className="ml-4 md:ml-0 md:pl-16 relative">
              <HowItWorksStep
                step="1"
                icon={ArrowUpRight}
                title="Upload your resume"
                description="Drag and drop your PDF or DOCX file into our secure uploader. We accept most standard formats."
              />
              <HowItWorksStep
                step="2"
                icon={ArrowUpRight}
                title="AI Analysis"
                description="Our AI engine scans your document in under 60 seconds, evaluating it against thousands of data points and ATS rules."
              />
              <HowItWorksStep
                step="3"
                icon={ArrowUpRight}
                title="Get actionable insights"
                description="Review your score, discover skill gaps, and get concrete suggestions on how to improve your education and experience sections."
                isLast
              />
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" as={Link} to="/signup">
                Get started free
              </Button>
            </div>
          </div>
        </section>

        {/* Credits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <CreditsBanner />
        </section>
      </main>

      <Footer />
    </div>
  )
}
