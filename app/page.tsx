"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuroraIntro from "@/components/intro/AuroraIntro";
import HeroSection from "@/components/layout/HeroSection";
import ProductGrid from "@/components/product/ProductGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/intro/MouseGlow";
import IlluminatiEye from "@/components/layout/IlluminatiEye";
import { motion, AnimatePresence } from "framer-motion";

// Global variable to track if the JS environment has persisted (soft navigation)
let isSpaInitialized = false;

export default function Home() {
  const [showMainSite, setShowMainSite] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const isSoftNav = isSpaInitialized;
      isSpaInitialized = true;

      const hasFilters = window.location.search.includes('category=') || window.location.search.includes('q=');
      // Skip the intro if we are returning from another page (soft navigation), or if accessing a specific filter/hash
      if (isSoftNav || hasFilters || window.location.hash === '#vault') {
        setShowMainSite(true);
        if (hasFilters || window.location.hash === '#vault') {
          setTimeout(() => {
            document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' });
          }, 300); // slightly longer timeout to ensure layout is ready
        }
      }
    }
  }, []);

  const handleIntroComplete = () => {
    setShowMainSite(true);
    // User wants to stay at the very top of the page (Hero Section) after the intro
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (!mounted) return <main className="min-h-screen bg-[#030303]" />; // Prevent hydration mismatch flash

  return (
    <main className="min-h-screen bg-[var(--color-aurora-bg)] text-[var(--color-aurora-text)] selection:bg-[#8B5A2B] selection:text-[#000]">
      <AnimatePresence>
        {!showMainSite ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <AuroraIntro onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <MouseGlow />
            <IlluminatiEye />
            
            {/* Foreground Content */}
            <div className="relative z-10">
              <Navbar onHomeClick={() => setShowMainSite(false)} />
              <HeroSection />
              <Suspense fallback={<div className="text-center py-20 text-[#D2B48C]">Loading Vault...</div>}>
                <div id="vault" className="scroll-mt-20">
                  <ProductGrid />
                </div>
              </Suspense>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}