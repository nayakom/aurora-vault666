"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  return (
    <div 
      className={`flex items-center gap-3 cursor-pointer group ${className}`} 
      onClick={onClick}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Glow behind the logo */}
        <div className="absolute inset-0 bg-[#8B5A2B]/20 blur-md rounded-full group-hover:bg-[#8B5A2B]/40 transition-all duration-500"></div>
        
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          className="w-full h-full text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-500 relative z-10"
        >
          {/* Subtle Sacred Geometry Lines (Background) */}
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" className="opacity-20" />
          <path d="M5 50 L95 50" stroke="currentColor" strokeWidth="1" className="opacity-10" />
          <path d="M50 5 L50 95" stroke="currentColor" strokeWidth="1" className="opacity-10" />
          
          {/* Outer Occult Ring */}
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" />
          
          {/* Inner Sacred Triangle */}
          <path d="M50 15 L20 72 L80 72 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Central Keyhole of the Vault (Animated pulse) */}
          <motion.g
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50px 55px" }}
          >
            <circle cx="50" cy="46" r="8" fill="currentColor" />
            <path d="M45 50 L40 66 L60 66 L55 50 Z" fill="currentColor" />
          </motion.g>

          {/* Diamond at the apex */}
          <path d="M50 5 L53 11 L50 17 L47 11 Z" fill="currentColor" />
        </svg>
      </div>
      
      <span className="text-[#8B5A2B] font-display font-black text-xl tracking-[10px] uppercase group-hover:text-[#D2B48C] transition-colors duration-500 drop-shadow-[0_0_8px_rgba(139,90,43,0.5)]">
        Aurora
      </span>
    </div>
  );
};

export default Logo;
