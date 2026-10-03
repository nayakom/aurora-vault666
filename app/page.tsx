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
  const [showMainSite, setShowMainSite] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("aurora-skip-intro") ||
        sessionStorage.getItem("aurora_intro_completed") === "true";
    }
    return false;
  });
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

  // Lock body scroll and touch swiping during intro so background content never scrolls or peeks through
  useEffect(() => {
    if (!showMainSite) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [showMainSite]);

  const handleIntroComplete = () => {
    sessionStorage.setItem("aurora_intro_completed", "true");
    document.documentElement.classList.add("aurora-skip-intro");
    isSpaInitialized = true;
    setShowMainSite(true);
    // User wants to stay at the very top of the page (Hero Section) after the intro
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <main className="min-h-screen bg-[#030303] text-[#e0e0e0] selection:bg-[#8B5A2B] selection:text-[#000]">
      {/* Intro Overlay: Fullscreen fixed overlay only rendered if intro has not been completed */}
      <AnimatePresence>
        {!showMainSite && (
          <motion.div
            id="aurora-intro-overlay"
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] overflow-hidden overscroll-none"
          >
            <AuroraIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Site: Completely hidden and disabled while intro is active so vault never leaks or flickers */}
      <div className={`relative ${!showMainSite ? 'opacity-0 pointer-events-none h-0 overflow-hidden select-none' : 'opacity-100 transition-opacity duration-500'}`}>
        <MouseGlow />
        <IlluminatiEye />
        {/* Foreground Content */}
        <div className="relative z-10">
          <Navbar 
            onLogoClick={() => {
              try {
                sessionStorage.removeItem("aurora_intro_completed");
                sessionStorage.removeItem("aurora_return_to_vault");
                document.documentElement.classList.remove("aurora-skip-intro");
              } catch (e) {}
              isSpaInitialized = false;
              window.scrollTo({ top: 0, behavior: "instant" });
              setShowMainSite(false);
            }}
            onHomeClick={() => { 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }} 
          />
          <HeroSection />
          <Suspense fallback={<div className="text-center py-20 text-[#D2B48C]">Loading Vault...</div>}>
            <div id="vault" className="scroll-mt-20">
              <ProductGrid />
            </div>
          </Suspense>
          <Footer />
        </div>
      </div>
    </main>
  );
}