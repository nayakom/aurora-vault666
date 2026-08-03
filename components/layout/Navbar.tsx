"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from '../ui/Logo';

interface NavbarProps {
  onHomeClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const categoriesData = [
    { name: 'Women', items: ['Kurtis', 'Dresses', 'Tops', 'Sarees', 'Bottom Wear'] },
    { name: 'Men', items: ['Shirts', 'T-Shirts', 'Jeans', 'Footwear'] },
    { name: 'Accessories', items: ['Watches', 'Bags'] },
    { name: 'Electronics', items: ['Laptops', 'PC', 'Keyboard', 'Mouse', 'Phones'] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    if (window.scrollY > 50) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onHomeClick) onHomeClick();
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#030303]/90 backdrop-blur-md border-[#8B5A2B]/20 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Logo onClick={handleHomeClick} />

        {/* Links */}
        <div className="hidden md:flex gap-8 items-center mt-2">

          <Link href="/" onClick={handleHomeClick} className="text-[#808080] hover:text-[#8B5A2B] text-sm uppercase tracking-widest font-bold transition-all duration-300">
            HOME
          </Link>

          {/* WOMEN Menu */}
          <div className="relative group">
            <a
              href="#"
              className="text-[#808080] group-hover:text-[#8B5A2B] text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1 py-4"
            >
              WOMEN <span className="text-[10px]">▼</span>
            </a>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white rounded-xl p-6 w-48 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100">
                <ul className="flex flex-col gap-6">
                  {['Kurtis', 'Dresses', 'Tops', 'Sarees', 'Bottom Wear'].map((cat) => (
                    <li key={cat}>
                      <Link href={`/?category=${cat}`} scroll={false} className="text-gray-800 hover:text-[#8B5A2B] text-[15px] font-medium tracking-wide transition-colors block">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* MEN Menu */}
          <div className="relative group">
            <a
              href="#"
              className="text-[#808080] group-hover:text-[#8B5A2B] text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1 py-4"
            >
              MEN <span className="text-[10px]">▼</span>
            </a>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white rounded-xl p-6 w-48 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100">
                <ul className="flex flex-col gap-6">
                  {['Shirts', 'T-Shirts', 'Jeans', 'Footwear'].map((cat) => (
                    <li key={cat}>
                      <Link href={`/?category=${cat}`} scroll={false} className="text-gray-800 hover:text-[#8B5A2B] text-[15px] font-medium tracking-wide transition-colors block">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* GYM & SPORTS Menu */}
          <div className="relative group">
            <a
              href="#"
              className="text-[#808080] group-hover:text-[#8B5A2B] text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1 py-4"
            >
              GYM & SPORTS <span className="text-[10px]">▼</span>
            </a>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white rounded-xl p-6 w-56 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100">
                <ul className="flex flex-col gap-6">
                  {['Men\'s Gym Wear', 'Women\'s Gym Wear', 'Equipments'].map((cat) => (
                    <li key={cat}>
                      <Link href={`/?category=${cat}`} scroll={false} className="text-gray-800 hover:text-[#8B5A2B] text-[15px] font-medium tracking-wide transition-colors block">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ACCESSORIES Menu */}
          <div className="relative group">
            <a
              href="#"
              className="text-[#808080] group-hover:text-[#8B5A2B] text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1 py-4"
            >
              ACCESSORIES <span className="text-[10px]">▼</span>
            </a>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white rounded-xl p-6 w-48 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100">
                <ul className="flex flex-col gap-6">
                  {['Watches', 'Bags'].map((cat) => (
                    <li key={cat}>
                      <Link href={`/?category=${cat}`} scroll={false} className="text-gray-800 hover:text-[#8B5A2B] text-[15px] font-medium tracking-wide transition-colors block">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ELECTRONICS Menu */}
          <div className="relative group">
            <a
              href="#"
              className="text-[#808080] group-hover:text-[#8B5A2B] text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1 py-4"
            >
              ELECTRONICS <span className="text-[10px]">▼</span>
            </a>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white rounded-xl p-6 w-56 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100">
                <ul className="flex flex-col gap-6">
                  {['Laptops', 'PC', 'Keyboard', 'Mouse', 'TV', 'Phones', 'Smart Phones'].map((cat) => (
                    <li key={cat}>
                      <Link href={`/?category=${cat}`} scroll={false} className="text-gray-800 hover:text-[#8B5A2B] text-[15px] font-medium tracking-wide transition-colors block">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`h-[2px] w-6 bg-[#8B5A2B] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`h-[2px] w-6 bg-[#8B5A2B] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-[2px] w-6 bg-[#8B5A2B] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>

      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[70px] bg-[#030303]/95 backdrop-blur-xl z-40 flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#D2B48C] uppercase tracking-widest border-b border-[#8B5A2B]/20 pb-4">
                HOME
              </Link>
              
              {categoriesData.map((category) => (
                <div key={category.name} className="flex flex-col border-b border-[#8B5A2B]/20">
                  <button 
                    onClick={() => setExpandedMobileCategory(expandedMobileCategory === category.name ? null : category.name)}
                    className="flex justify-between items-center w-full py-4 text-left group"
                  >
                    <h4 className="text-sm font-bold text-[#8B5A2B] group-hover:text-white transition-colors uppercase tracking-widest">{category.name}</h4>
                    <span className="text-[#8B5A2B] text-xs transition-transform duration-300" style={{ transform: expandedMobileCategory === category.name ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                  </button>
                  <AnimatePresence>
                    {expandedMobileCategory === category.name && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-3 pb-6 pt-2">
                          {category.items.map(item => (
                            <Link key={item} href={`/?category=${item}`} scroll={false} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 bg-[#8B5A2B]/10 text-[#808080] border border-[#8B5A2B]/20 rounded hover:text-[#030303] hover:bg-[#8B5A2B] transition-all text-sm font-medium tracking-wide">
                              {item}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
