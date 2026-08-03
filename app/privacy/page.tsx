import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-[#D2B48C]/80">
            <p className="lead text-[#D2B48C]">
              Last Updated: August 2026. The secrets you share with us remain in the vault.
            </p>
            
            <h2 className="text-white mt-12 mb-6">1. Information We Collect</h2>
            <p>
              When you enter The Vault, we collect basic transmission data. If you join The Inner Circle, we collect the encrypted communication channel (email address) you provide. We do not track your movements outside our jurisdiction.
            </p>

            <h2 className="text-white mt-12 mb-6">2. Use of Your Information</h2>
            <p>
              Your information is solely used to grant you access to rare artifacts and exclusive society updates. We do not sell, trade, or expose your data to any external entities or uninitiated mortals.
            </p>

            <h2 className="text-white mt-12 mb-6">3. Affiliate Tracking</h2>
            <p>
              Procuring artifacts through our secure links (Amazon, Flipkart, Myntra, Meesho) may result in a society commission. These external domains have their own privacy laws which you should review before completing your transaction.
            </p>

            <h2 className="text-white mt-12 mb-6">4. Security</h2>
            <p>
              The Vault is secured with top-tier cryptographic protocols. However, no transmission over the earthly internet is 100% secure. Enter at your own discretion.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
