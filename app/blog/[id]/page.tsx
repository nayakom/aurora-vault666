import React from 'react';
import Link from "next/link";
import { FaAmazon, FaShoppingBag, FaStore, FaTshirt, FaStar, FaStarHalfAlt, FaStar as FaStarFull } from 'react-icons/fa';
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { getProductsFromBlogger } from "@/lib/blogger";
import ProductGallery from "@/components/product/ProductGallery";
import IlluminatiEye from "@/components/layout/IlluminatiEye";
import Navbar from "@/components/layout/Navbar";
import Accordion from "@/components/ui/Accordion";
import { motion, AnimatePresence } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const products = await getProductsFromBlogger();
  const product = products.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  // We can't use useState in an async server component.
  // So we will pass the product to a Client Component wrapper for the gallery, 
  // or we can make the whole page a Client Component and fetch via useEffect.
  // Wait, in Next.js App Router, we can just split the interactive gallery into a client component.
  // But for simplicity, since the layout is already built here, let's just make a small inline client component for the gallery.

  // Helper to render stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-[#8B5A2B]">
        {[...Array(fullStars)].map((_, i) => <FaStarFull key={`f-${i}`} />)}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => <FaStar key={`e-${i}`} className="opacity-30" />)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#D2B48C] font-sans selection:bg-[#8B5A2B]/40 relative">
      <Navbar />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_center,_#8B5A2B_0%,_transparent_100%)]"></div>

      {/* Massive Faint Illuminati Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] scale-[2.5] z-0 mix-blend-overlay">
        <IlluminatiEye />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B5A2B]/50 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 lg:pt-48 pb-24">
        
        {/* Premium Breadcrumb / Section Header */}
        <div className="flex items-center gap-4 mb-12 opacity-80">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#8B5A2B]"></div>
          <span className="text-[10px] font-mono text-[#D2B48C] tracking-[0.4em] uppercase">Vault Data / Artifact File</span>
          <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-[#8B5A2B]/30 to-[#8B5A2B]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          
          {/* Left Column: Image Gallery & Specifications */}
          <div className="flex flex-col gap-16 w-full max-w-md mx-auto lg:mx-0">
            <ProductGallery images={product.images} productName={product.name} />
            
            {/* Specifications Accordion */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Accordion title="Product Details" defaultOpen={true}>
                <div className="divide-y divide-[#8B5A2B]/10">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row py-4 px-6 hover:bg-[#8B5A2B]/5 transition-colors gap-2 sm:gap-6">
                      <span className="w-full sm:w-1/3 text-[#808080] font-bold text-sm tracking-wide capitalize">{key}</span>
                      <span className="w-full sm:w-2/3 text-[#D2B48C] font-light text-sm">{value as string}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D2B48C] via-[#8B5A2B] to-[#D2B48C] leading-tight mb-6 tracking-[0.1em] font-display uppercase drop-shadow-[0_0_15px_rgba(139,90,43,0.3)]">
              {product.name}
            </h1>
            
            {/* Aurora Internal Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-8 border-b border-[#8B5A2B]/20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B5A2B]/10 border border-[#8B5A2B]/40 text-[#8B5A2B] font-bold text-xs tracking-[0.3em] uppercase w-max">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Level 4 Artifact
              </div>
              <div className="flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-white font-mono text-sm tracking-widest">{product.rating} / 5.0</span>
              </div>
            </div>

            {/* Description & Usage */}
            <div className="mb-10 relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B5A2B]/50 to-transparent hidden md:block"></div>
              <h3 className="text-[10px] font-mono text-[#8B5A2B] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                <span>[ PURPOSE ]</span>
                <span className="h-px bg-[#8B5A2B]/30 flex-grow"></span>
              </h3>
              <div 
                className="text-[#808080] text-sm font-light leading-relaxed mb-6 prose prose-invert prose-p:mb-4 prose-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {product.usage && (
                <div 
                  className="text-[#D2B48C] text-sm leading-relaxed prose prose-invert italic border-l border-[#8B5A2B]/30 pl-4 py-2 bg-[#8B5A2B]/5"
                  dangerouslySetInnerHTML={{ __html: product.usage }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Affiliate Links Section */}
        {product.affiliates && (Object.keys(product.affiliates).length > 0) && (
          <div className="mt-24 pt-16 border-t border-[#8B5A2B]/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#030303] px-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#8B5A2B]/50">
                <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D2B48C] via-[#8B5A2B] to-[#D2B48C] mb-12 tracking-[0.3em] uppercase font-display text-center">
              Initiate Transfer Protocol
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {product.affiliates.amazon && (
                <a href={product.affiliates.amazon.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-[#0a0a0a] border border-[#8B5A2B]/30 hover:border-[#8B5A2B] hover:shadow-[0_0_30px_rgba(139,90,43,0.15)] transition-all duration-300 relative overflow-hidden text-center sm:text-left gap-6 sm:gap-4">
                  <div className="absolute inset-0 bg-[#8B5A2B]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-[#8B5A2B]/10 rounded-full border border-[#8B5A2B]/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <FaAmazon className="text-3xl text-[#8B5A2B]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-[0.1em] mb-1 uppercase font-display">Amazon</h4>
                      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs tracking-widest">
                        {renderStars(product.affiliates.amazon.rating)}
                        <span className="text-[#808080] ml-2">({product.affiliates.amazon.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] text-[#030303] group-hover:from-[#D2B48C] group-hover:to-[#8B5A2B] group-hover:shadow-[0_0_20px_rgba(210,180,140,0.4)] transition-all duration-500 tracking-[0.3em] font-bold uppercase text-[10px] sm:text-xs overflow-hidden border border-[#D2B48C]/50 rounded-sm">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <span className="relative z-10 drop-shadow-sm">Procure</span>
                  </div>
                </a>
              )}

              {product.affiliates.flipkart && (
                <a href={product.affiliates.flipkart.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-[#0a0a0a] border border-[#8B5A2B]/30 hover:border-[#8B5A2B] hover:shadow-[0_0_30px_rgba(139,90,43,0.15)] transition-all duration-300 relative overflow-hidden text-center sm:text-left gap-6 sm:gap-4">
                  <div className="absolute inset-0 bg-[#8B5A2B]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-[#8B5A2B]/10 rounded-full border border-[#8B5A2B]/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <FaShoppingBag className="text-3xl text-[#8B5A2B]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-[0.1em] mb-1 uppercase font-display">Flipkart</h4>
                      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs tracking-widest">
                        {renderStars(product.affiliates.flipkart.rating)}
                        <span className="text-[#808080] ml-2">({product.affiliates.flipkart.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] text-[#030303] group-hover:from-[#D2B48C] group-hover:to-[#8B5A2B] group-hover:shadow-[0_0_20px_rgba(210,180,140,0.4)] transition-all duration-500 tracking-[0.3em] font-bold uppercase text-[10px] sm:text-xs overflow-hidden border border-[#D2B48C]/50 rounded-sm">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <span className="relative z-10 drop-shadow-sm">Procure</span>
                  </div>
                </a>
              )}

              {product.affiliates.myntra && (
                <a href={product.affiliates.myntra.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-[#0a0a0a] border border-[#8B5A2B]/30 hover:border-[#8B5A2B] hover:shadow-[0_0_30px_rgba(139,90,43,0.15)] transition-all duration-300 relative overflow-hidden text-center sm:text-left gap-6 sm:gap-4">
                  <div className="absolute inset-0 bg-[#8B5A2B]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-[#8B5A2B]/10 rounded-full border border-[#8B5A2B]/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <FaTshirt className="text-3xl text-[#8B5A2B]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-[0.1em] mb-1 uppercase font-display">Myntra</h4>
                      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs tracking-widest">
                        {renderStars(product.affiliates.myntra.rating)}
                        <span className="text-[#808080] ml-2">({product.affiliates.myntra.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] text-[#030303] group-hover:from-[#D2B48C] group-hover:to-[#8B5A2B] group-hover:shadow-[0_0_20px_rgba(210,180,140,0.4)] transition-all duration-500 tracking-[0.3em] font-bold uppercase text-[10px] sm:text-xs overflow-hidden border border-[#D2B48C]/50 rounded-sm">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <span className="relative z-10 drop-shadow-sm">Procure</span>
                  </div>
                </a>
              )}

              {product.affiliates.meesho && (
                <a href={product.affiliates.meesho.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-[#0a0a0a] border border-[#8B5A2B]/30 hover:border-[#8B5A2B] hover:shadow-[0_0_30px_rgba(139,90,43,0.15)] transition-all duration-300 relative overflow-hidden text-center sm:text-left gap-6 sm:gap-4">
                  <div className="absolute inset-0 bg-[#8B5A2B]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-[#8B5A2B]/10 rounded-full border border-[#8B5A2B]/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <FaStore className="text-3xl text-[#8B5A2B]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-[0.1em] mb-1 uppercase font-display">Meesho</h4>
                      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs tracking-widest">
                        {renderStars(product.affiliates.meesho.rating)}
                        <span className="text-[#808080] ml-2">({product.affiliates.meesho.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] text-[#030303] group-hover:from-[#D2B48C] group-hover:to-[#8B5A2B] group-hover:shadow-[0_0_20px_rgba(210,180,140,0.4)] transition-all duration-500 tracking-[0.3em] font-bold uppercase text-[10px] sm:text-xs overflow-hidden border border-[#D2B48C]/50 rounded-sm">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <span className="relative z-10 drop-shadow-sm">Procure</span>
                  </div>
                </a>
              )}

            </div>
          </div>
        )}
        
      </div>
      
      {/* Include Compact Footer at the bottom */}
      <Footer compact />
    </div>
  );
}
