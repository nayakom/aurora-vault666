import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[var(--color-aurora-bg)] text-[var(--color-aurora-text)] selection:bg-[#8B5A2B] selection:text-[#000]">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-[#8B5A2B] blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-6 py-32 min-h-screen">
          <Link 
            href="/"
            className="inline-flex items-center text-sm uppercase tracking-[4px] text-[#8B5A2B] hover:text-[#D2B48C] transition-colors mb-12 group"
          >
            <svg className="w-4 h-4 mr-3 transform group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Vault
          </Link>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8 font-display uppercase tracking-widest">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-[#D2B48C]/80">
            <p className="lead text-[#D2B48C]">
              Last Updated: August 2026. By entering The Vault, you agree to our sacred codes.
            </p>
            
            <h2 className="text-white mt-12 mb-6">1. Acceptance of Terms</h2>
            <p>
              By accessing Aurora and The Vault, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are forbidden from accessing the artifacts.
            </p>

            <h2 className="text-white mt-12 mb-6">2. The Artifacts</h2>
            <p>
              All artifacts showcased within The Vault are subject to availability on external platforms (Amazon, Flipkart, Myntra, Meesho). We curate the best, but we do not manufacture or directly ship these items.
            </p>

            <h2 className="text-white mt-12 mb-6">3. External Links</h2>
            <p>
              Our service contains links to third-party web sites or services that are not owned or controlled by Aurora. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
            </p>

            <h2 className="text-white mt-12 mb-6">4. Intellectual Property</h2>
            <p>
              The design, aesthetic, and unique branding of Aurora is the exclusive property of our secret society. You may not duplicate, copy, or reuse any portion of our visual design elements or concepts without express written permission.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
