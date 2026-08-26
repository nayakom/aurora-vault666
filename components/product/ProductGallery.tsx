"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images?.[0] || '/images/products/placeholder.jpg');

  React.useEffect(() => {
    // Ensure we start at the top of the page when navigating to a new product
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[3/4] md:aspect-square min-h-[300px] border border-[#8B5A2B]/30 overflow-hidden bg-[#030303] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt={productName}
            className="w-full h-auto max-h-[70vh] object-contain p-2"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent pointer-events-none" />
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
    </div>
  );
}
