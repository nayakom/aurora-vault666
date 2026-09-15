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

      const introAlreadyCompleted = sessionStorage.getItem("aurora_intro_completed") === "true";
      const returnToVault = sessionStorage.getItem("aurora_return_to_vault") === "true";
      const hasFilters = window.location.search.includes("category=") || window.location.search.includes("q=");
      const isVaultHash = window.location.hash === "#vault";

      // If returning from product, intro was completed, soft navigation, or accessing vault/filter:
      if (introAlreadyCompleted || returnToVault || isSoftNav || hasFilters || isVaultHash) {
        setShowMainSite(true);
        sessionStorage.setItem("aurora_intro_completed", "true");

        if (returnToVault || isVaultHash || hasFilters) {
          sessionStorage.removeItem("aurora_return_to_vault");

          const scrollToVault = () => {
            const vaultEl = document.getElementById("vault");
            if (vaultEl) {
              vaultEl.scrollIntoView({ behavior: "smooth" });
            }
          };

          setTimeout(scrollToVault, 50);
          setTimeout(scrollToVault, 250);
          setTimeout(scrollToVault, 600);
        }
      }

      // Handle browser back / forward buttons (popstate & pageshow for bfcache)
      const handlePopState = () => {
        const isBackToVault =
          sessionStorage.getItem("aurora_return_to_vault") === "true" || window.location.hash === "#vault";
        if (isBackToVault) {
          setShowMainSite(true);
          sessionStorage.removeItem("aurora_return_to_vault");
          setTimeout(() => {
            document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      };

      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted || sessionStorage.getItem("aurora_intro_completed") === "true") {
          setShowMainSite(true);
          if (sessionStorage.getItem("aurora_return_to_vault") === "true" || window.location.hash === "#vault") {
            sessionStorage.removeItem("aurora_return_to_vault");
            setTimeout(() => {
              document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
            }, 200);
          }
        }
      };

      window.addEventListener("popstate", handlePopState);
      window.addEventListener("pageshow", handlePageShow);

      return () => {
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("pageshow", handlePageShow);
      };
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("aurora_intro_completed", "true");
    isSpaInitialized = true;
    setShowMainSite(true);
    // User wants to stay at the very top of the page (Hero Section) after the intro
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (!mounted) return <main className="min-h-screen bg-[#030303]" />; // Prevent hydration mismatch flash

  return (
    <main className="min-h-screen bg-[#030303] text-[#e0e0e0] transition-colors duration-500 selection:bg-[#8B5A2B] selection:text-[#000]">
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
              <Navbar onHomeClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
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