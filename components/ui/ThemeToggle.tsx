"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import { LuSun, LuMoon } from "react-icons/lu";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-full border border-[#8B5A2B]/30 bg-[#0a0a0a]/50 ${className}`} />
    );
  }

  const isLight = theme === "light";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative flex items-center gap-2 p-2 rounded-full transition-all duration-300 group focus:outline-none ${
        isLight
          ? "bg-[#FAF7F2] border border-[#B8860B]/40 shadow-[0_2px_12px_rgba(184,134,11,0.2)] hover:border-[#B8860B]"
          : "bg-[#0A0A0A] border border-[#8B5A2B]/40 shadow-[0_2px_15px_rgba(139,90,43,0.25)] hover:border-[#D2B48C]"
      } ${className}`}
      aria-label={isLight ? "Switch to Obsidian Vault (Dark Mode)" : "Switch to Solar Sanctuary (Light Mode)"}
      title={isLight ? "Switch to Obsidian Dark" : "Switch to Solar Light"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className="text-[#B8860B]"
            >
              <LuSun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(184,134,11,0.6)]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className="text-[#D2B48C]"
            >
              <LuMoon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(210,180,140,0.6)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span
          className={`text-xs font-mono font-bold tracking-[0.2em] uppercase pr-2 transition-colors ${
            isLight ? "text-[#2C2621]" : "text-[#D2B48C]"
          }`}
        >
          {isLight ? "Solar" : "Obsidian"}
        </span>
      )}
    </motion.button>
  );
}
