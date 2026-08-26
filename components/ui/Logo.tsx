import React from 'react';

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
          {/* Main Triangle */}
          <path d="M50 5 L5 90 L95 90 Z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Capstone Line (Illuminati Pyramid) */}
          <path d="M32 38 L68 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          
          {/* Eye Outline */}
          <path d="M25 68 C35 51, 65 51, 75 68 C65 85, 35 85, 25 68 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Iris and Pupil */}
          <circle cx="50" cy="68" r="9" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="68" r="4" fill="currentColor" />
          
          {/* Mystical Rays emitting from capstone */}
          <path d="M50 30 L50 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
          <path d="M43 33 L38 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
          <path d="M57 33 L62 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
        </svg>
      </div>
      
      <span className="text-[#8B5A2B] font-display font-black text-xl tracking-[10px] uppercase group-hover:text-[#D2B48C] transition-colors duration-500 drop-shadow-[0_0_8px_rgba(139,90,43,0.5)]">
        Aurora
      </span>
    </div>
  );
};

export default Logo;
