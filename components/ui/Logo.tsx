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
          {/* Subtle Outer Occult Ring */}
          <circle cx="50" cy="55" r="40" stroke="currentColor" strokeWidth="2" className="opacity-40" />
          
          {/* Main Triangle */}
          <path d="M50 10 L15 85 L85 85 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Capstone Separation */}
          <path d="M34 40 L66 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          
          {/* Animated Blinking Eye */}
          <motion.g
            style={{ transformOrigin: "50px 65px" }}
            animate={{ scaleY: [1, 0.05, 1] }}
            transition={{ 
              duration: 0.25, 
              times: [0, 0.5, 1], 
              repeat: Infinity, 
              repeatDelay: 5, 
              ease: "easeInOut" 
            }}
          >
            {/* Flawless Eye Outline using Bezier Curves */}
            <path d="M25 65 Q50 42 75 65 Q50 88 25 65 Z" stroke="currentColor" strokeWidth="3" />
            
            {/* Iris and Pupil */}
            <circle cx="50" cy="65" r="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="65" r="4" fill="currentColor" />
          </motion.g>

          {/* Mystical Rays emitting from capstone */}
          <path d="M50 32 L50 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-70" />
          <path d="M43 36 L36 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-70" />
          <path d="M57 36 L64 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-70" />
        </svg>
      </div>
      
      <span className="text-[#8B5A2B] font-display font-black text-xl tracking-[10px] uppercase group-hover:text-[#D2B48C] transition-colors duration-500 drop-shadow-[0_0_8px_rgba(139,90,43,0.5)]">
        Aurora
      </span>
    </div>
  );
};

export default Logo;
