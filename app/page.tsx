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

      // Only skip the intro if we are returning from a product page (soft navigation) AND it's not a hard refresh
      if (isSoftNav && window.location.hash === '#vault') {
        setShowMainSite(true);
      }
    }
  }, []);

  const handleIntroComplete = () => {
    setShowMainSite(true);
    router.replace('/#vault', { scroll: false });
  };

  if (!mounted) return <main className="min-h-screen bg-[#030303]" />; // Prevent hydration mismatch flash

  return (
    <main className="min-h-screen bg-[var(--color-aurora-bg)] text-[var(--color-aurora-text)] selection:bg-[#8B5A2B] selection:text-[#000]">
      <AnimatePresence mode="wait">
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