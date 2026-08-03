"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/products';
import { FaAmazon, FaShoppingBag, FaStore, FaTshirt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IlluminatiEye from '../layout/IlluminatiEye';
import { createPortal } from 'react-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    router.prefetch(`/blog/${product.id}`);
    setTimeout(() => {
      router.push(`/blog/${product.id}`);
    }, 3000); // 3 second animation before route change
  };

  return (
    <motion.div
      className="relative w-full max-w-sm rounded-none overflow-hidden glass-card transition-all duration-500 group"
      style={{ perspective: 1000 }}
      onHoverStart={() => {
        setIsHovered(true);
        router.prefetch(`/blog/${product.id}`);
      }}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -15, rotateX: 2, rotateY: -2, scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
        {isNavigating && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030303]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ 
                scale: [0.8, 1, 1, 8], 
                opacity: [0, 1, 1, 0], 
                filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(30px)"] 
              }}
              transition={{ duration: 3, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
              className="relative flex flex-col items-center justify-center w-64 h-64"
            >
              {/* Illuminati Pyramid */}
              <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#8B5A2B] drop-shadow-[0_0_20px_rgba(139,90,43,0.5)] z-10">
                <polygon points="50,10 10,90 90,90" fill="none" stroke="currentColor" strokeWidth="2" />
                <polygon points="50,10 30,50 70,50" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Capstone separation */}
                <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="3" />
                {/* Sunrays */}
                <line x1="50" y1="8" x2="50" y2="-10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="50" y1="10" x2="30" y2="-5" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="50" y1="10" x2="70" y2="-5" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                {/* Eye */}
                <path d="M 35 35 Q 50 25 65 35 Q 50 45 35 35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="35" r="3" fill="currentColor" />
                {/* Bricks */}
                <line x1="23" y1="65" x2="77" y2="65" stroke="currentColor" strokeWidth="1" />
                <line x1="16" y1="80" x2="84" y2="80" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="50" x2="50" y2="65" stroke="currentColor" strokeWidth="1" />
                <line x1="35" y1="65" x2="35" y2="80" stroke="currentColor" strokeWidth="1" />
                <line x1="65" y1="65" x2="65" y2="80" stroke="currentColor" strokeWidth="1" />
                <line x1="25" y1="80" x2="25" y2="90" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="80" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
                <line x1="75" y1="80" x2="75" y2="90" stroke="currentColor" strokeWidth="1" />
              </svg>

              {/* Glowing Pulse Background */}
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.9, 1.3, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#8B5A2B]/20 rounded-full blur-[50px] pointer-events-none"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                y: [10, 0, 0, 50],
                scale: [0.9, 1, 1, 2],
                filter: ["blur(5px)", "blur(0px)", "blur(0px)", "blur(20px)"]
              }}
              transition={{ duration: 3, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
              className="mt-16 flex flex-col items-center gap-4 z-10"
            >
              <h2 className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D2B48C] via-[#8B5A2B] to-[#D2B48C] uppercase font-display tracking-[0.2em] text-center drop-shadow-[0_0_15px_rgba(139,90,43,0.3)]">
                Welcome to Dark Society
              </h2>
              <div className="flex gap-2 mt-4">
                <span className="w-1 h-1 bg-[#8B5A2B] animate-ping" />
                <span className="w-1 h-1 bg-[#8B5A2B] animate-ping" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-1 bg-[#8B5A2B] animate-ping" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}

      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-[#8B5A2B]/10 to-transparent opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''} pointer-events-none z-10`} />

      {/* Image Container */}
      <a href={`/blog/${product.id}`} onClick={handleNavigate} className="block relative h-80 overflow-hidden border-b border-[#8B5A2B]/20 cursor-pointer bg-[#050505] flex items-center justify-center">
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 z-10"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-20 pointer-events-none" />


      </a>

      {/* Content */}
      <div className="relative p-6 bg-transparent z-10">
        <a href={`/blog/${product.id}`} onClick={handleNavigate} className="block cursor-pointer">
          <h3 className="text-xl font-bold text-[#D2B48C] mb-2 uppercase tracking-wide font-display hover:text-white transition-colors">{product.name}</h3>
        </a>
        <p className="text-[#808080] text-sm mb-6 line-clamp-2 font-light tracking-wide">{product.description}</p>

        {/* Explore Button */}
        <div className="mt-8">
          <a href={`/blog/${product.id}`} onClick={handleNavigate} className="block w-full py-3 text-center border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs uppercase tracking-[4px] font-bold hover:bg-[#8B5A2B] hover:text-[#030303] transition-all duration-300 relative overflow-hidden group/btn cursor-pointer">
            <span className="relative z-10">UNVEIL THE SECRET</span>
            <div className="absolute inset-0 bg-[#8B5A2B] transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
