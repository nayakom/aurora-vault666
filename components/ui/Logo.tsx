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
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-500 relative z-10"
        >
          <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="14" r="0.5" fill="currentColor" />
          {/* Subtle rays */}
          <path d="M12 7V9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-50" />
          <path d="M9 10L10.5 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-50" />
          <path d="M15 10L13.5 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-50" />
        </svg>
      </div>
      
      <span className="text-[#8B5A2B] font-display font-black text-xl tracking-[10px] uppercase group-hover:text-[#D2B48C] transition-colors duration-500 drop-shadow-[0_0_8px_rgba(139,90,43,0.5)]">
        Aurora
      </span>
    </div>
  );
};

export default Logo;
