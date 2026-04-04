import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../data/productsData";

export const CollectionSlide = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>("All Watches");

  // Determine the filtered list of products
  const filteredProducts = productsData.filter(
    (product) => selectedFamily === "All Watches" || product.family === selectedFamily
  ).slice(0, 10); // Limit to 10 products

  return (
    <section id="products" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-black text-white py-24">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none w-full h-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-eurostile-black italic tracking-tighter text-white uppercase select-none">
              Tools
          </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full h-full flex flex-col gap-16">
        
        {/* Header and Families */}
        <div className="flex flex-col gap-10">
          <header className="space-y-4 text-center">
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="font-eurostile-black italic text-5xl md:text-7xl lg:text-8xl leading-tight uppercase text-red drop-shadow-[0_0_25px_rgba(189,33,38,0.6)]"
            >
              Enicar Sherpas
            </motion.h2>
          </header>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["All Watches", "Chronograph", "Dive", "GMT"].map(family => (
                <button
                    key={family}
                    onClick={() => setSelectedFamily(family)}
                    className={`px-6 py-2 rounded-full text-xs font-eurostile-black uppercase tracking-widest transition-colors ${
                        selectedFamily === family 
                        ? "bg-red text-white shadow-[0_0_15px_rgba(189,33,38,0.5)]" 
                        : "bg-white/10 text-gray-400 hover:bg-white/20"
                    }`}
                >
                    {family}
                </button>
            ))}
        </div>

        {/* Product Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-8 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link to={`/product/${product.id}`} className="block group cursor-pointer flex-col h-full">
                        {/* Product Image Card Minimal Flat */}
                        <div className="bg-[#f8f8f8] border border-[#dcdcdc] aspect-[4/5] flex items-center justify-center p-6 mb-4 relative overflow-hidden transition-colors duration-500 group-hover:bg-[#e8e8e8] group-hover:border-[#b0b0b0] rounded-sm">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-contain filter drop-shadow-md mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                            />
                        </div>
                        <div className="text-center sm:text-left flex-1 flex flex-col">
                            <h3 className="font-sans text-[11px] sm:text-[12px] md:text-sm tracking-[0.1em] uppercase text-gray-400 group-hover:text-red transition-colors">
                                {product.collection}
                            </h3>
                            <p className="text-[13px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-gray-600 font-sans mt-1 group-hover:text-red-300 transition-colors">
                                {product.name}
                            </p>
                        </div>
                    </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* All Watches CTA */}
        <div className="flex justify-center mt-4">
            <Link 
              to="/all-watches"
              className="px-10 py-5 bg-red text-white font-eurostile-black uppercase tracking-[0.2em] hover:bg-yellow hover:text-black transition-colors duration-300 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(189,33,38,0.4)] hover:shadow-[0_0_30px_rgba(255,222,23,0.6)]"
            >
              View Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
        </div>

        <footer className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center w-full text-xs text-gray-500/50 tracking-[0.4em] uppercase">
            <span>© 2026 ENICAR CHRONICLE</span>
            <span className="md:block hidden">Swiss Precision Since 1913</span>
        </footer>
      </div>
    </section>
  );
};
