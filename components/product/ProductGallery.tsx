"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images?.[0] || '/images/products/placeholder.jpg');
  const [isFullscreen, setIsFullscreen] = useState(false);

  React.useEffect(() => {
    // Ensure we start at the top of the page when navigating to a new product
    window.scrollTo({ top: 0, behavior: 'instant' });

  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative w-full aspect-[3/4] md:aspect-square min-h-[300px] border border-[#8B5A2B]/30 overflow-hidden bg-[#030303] flex items-center justify-center cursor-pointer group"
        onClick={() => setIsFullscreen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt={productName}
            className="w-full h-auto max-h-[70vh] object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Expand Icon Hint */}
        <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D2B48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </div>
      </div>
      
      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative aspect-square border overflow-hidden bg-[#030303] transition-all duration-300 ${mainImage === img ? 'border-[#8B5A2B] opacity-100 scale-95' : 'border-[#8B5A2B]/20 opacity-50 hover:opacity-100'}`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-[#D2B48C] hover:text-white transition-colors p-2 bg-black/50 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
            >
              <FaTimes size={24} />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={mainImage}
              alt={productName}
              className="max-w-full max-h-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
