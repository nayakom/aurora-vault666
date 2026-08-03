"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const IlluminatiEye: React.FC = () => {
  const eyeRef = useRef<SVGSVGElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;

        const maxOffset = 25;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX);

        const offsetDistance = Math.min(distance * 0.05, maxOffset);

        mouseX.set(Math.cos(angle) * offsetDistance);
        mouseY.set(Math.sin(angle) * offsetDistance);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-30 select-none">
      <div className="absolute w-[600px] h-[600px] bg-[#8B5A2B]/10 blur-[100px] rounded-full animate-pulse" style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}></div>
      
      <svg
        ref={eyeRef}
        viewBox="0 0 400 400"
        className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] text-[#8B5A2B] filter drop-shadow-[0_0_20px_rgba(210,180,140,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="eyeClip">
            <motion.path
              d="M100 200 C150 140, 250 140, 300 200 C250 260, 150 260, 100 200 Z"
              style={{ transformOrigin: "200px 200px" }}
              animate={{ scaleY: [1, 0.05, 1] }}
              transition={{ 
                duration: 0.3, 
                times: [0, 0.5, 1], 
                repeat: Infinity, 
                repeatDelay: 5, 
                ease: "easeInOut" 
              }}
            />
          </clipPath>
        </defs>

        {/* Eyelid Outline (Backing) */}
        <motion.path
          d="M100 200 C150 140, 250 140, 300 200 C250 260, 150 260, 100 200 Z"
          stroke="currentColor"
          strokeWidth="6"
          fill="rgba(10,10,10,0.9)"
          style={{ transformOrigin: "200px 200px" }}
          animate={{ scaleY: [1, 0.05, 1] }}
          transition={{ 
            duration: 0.3, 
            times: [0, 0.5, 1], 
            repeat: Infinity, 
            repeatDelay: 5, 
            ease: "easeInOut" 
          }}
        />

        <motion.g
          clipPath="url(#eyeClip)"
          style={{ x: springX, y: springY }}
        >
          <circle cx="200" cy="200" r="35" stroke="currentColor" strokeWidth="3" fill="rgba(139,90,43,0.3)" />
          <circle cx="200" cy="200" r="28" stroke="currentColor" strokeWidth="1" className="opacity-50" />
          <circle cx="200" cy="200" r="21" stroke="currentColor" strokeWidth="1" className="opacity-50" />
          <circle cx="200" cy="200" r="14" stroke="currentColor" strokeWidth="1" className="opacity-50" />
          <circle cx="200" cy="200" r="10" fill="#030303" stroke="currentColor" strokeWidth="2" />
          <circle cx="192" cy="192" r="4" fill="#D2B48C" className="opacity-90" />
          <circle cx="208" cy="208" r="1.5" fill="#D2B48C" className="opacity-60" />
        </motion.g>
      </svg>
    </div>
  );
};

export default IlluminatiEye;
