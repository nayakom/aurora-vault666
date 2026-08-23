"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { products } from '../../data/products';
import ProductCard from './ProductCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const ProductGrid: React.FC = () => {
  const [bloggerProducts, setBloggerProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('q');

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setBloggerProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    let result = bloggerProducts;
    
    // Filter by Category
    if (category) {
      result = result.filter(product => 
        product.labels?.some((label: string) => label.toLowerCase() === category.toLowerCase())
      );
    }
    
    // Filter by Search Query (Multi-word)
    if (query) {
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      result = result.filter(product => {
        const productString = `${product.name} ${product.description} ${product.labels?.join(' ')}`.toLowerCase();
        // Product must match ALL search terms to be included
        return searchTerms.every(term => productString.includes(term));
      });
    }
    
    return result;
  }, [bloggerProducts, category, query]);

  return (
    <div id="vault" className="relative py-32 px-4 max-w-7xl mx-auto min-h-screen overflow-hidden">
      
      {/* Vault Title */}
      <motion.div 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-black text-[#D2B48C] uppercase tracking-[1rem] font-display">
          {query ? `Search: ${query}` : (category ? category : "The Vault")}
        </h2>
        <div className="w-24 h-1 bg-[#8B5A2B]/50 mx-auto mt-6"></div>
      </motion.div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#8B5A2B]/30 border-t-[#8B5A2B] rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <p className="text-[#D2B48C] font-display text-xl">
            {query || category ? "no product available click on the " : "No exclusive products found in the vault yet."}
            {(query || category) && (
              <a href="#footer" className="text-[#8B5A2B] hover:text-white underline underline-offset-4 transition-colors font-bold uppercase tracking-widest">
                contact us
              </a>
            )}
            {(query || category) && " page"}
          </p>
        </div>
      ) : (
        <motion.div 
          key={query || category || 'all'}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className="w-full flex justify-center">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductGrid;
