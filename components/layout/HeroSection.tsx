"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const handleScrollToVault = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 z-0 bg-transparent overflow-hidden" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(139,90,43,0.1)_0%,_transparent_70%)] rounded-full z-0 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(210,180,140,0.1)_0%,_transparent_70%)] rounded-full z-0 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.h1 
          className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#D2B48C] via-[#8B5A2B] to-[#5C4033] mb-6 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Exclusive Treasures.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-[#8B5A2B]/70 mb-10 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Unlock access to premium global selections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a 
            href="#vault"
            onClick={handleScrollToVault}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-[#030303] text-[#D2B48C] border border-[#8B5A2B]/40 uppercase tracking-[4px] text-xs font-black transition-all duration-700 hover:bg-[#8B5A2B]/10 overflow-hidden"
          >
            {/* Shimmer Effect and Light Corners */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#8B5A2B]/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#D2B48C] transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-opacity-30" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#D2B48C] transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-opacity-30" />
            
            {/* Illuminati Eye/Triangle SVG */}
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-500 group-hover:rotate-180">
              <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            
            <span className="relative z-10 drop-shadow-[0_0_8px_rgba(210,180,140,0.8)]">Reveal Collection</span>
            
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-500 group-hover:-rotate-180">
              <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
