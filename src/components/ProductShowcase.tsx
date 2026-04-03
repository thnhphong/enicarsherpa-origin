import { motion } from "framer-motion";
import { productsData } from "../data/productsData";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CollectionSlide = () => {
  return (
    <section id="products" className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-eurostile-black italic tracking-tighter text-black uppercase select-none">
              Tools
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col pt-32 pb-16">
        <header className="mb-12 space-y-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-eurostile-black text-xl tracking-[0.4em] uppercase text-red block"
          >
            The Collection
          </motion.span>
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="font-eurostile-black italic text-5xl md:text-7xl lg:text-8xl leading-tight uppercase"
          >
            Four Domains.
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1">
          {productsData.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="group relative bg-[#f8f8f8] border border-black/5 rounded-3xl p-8 flex flex-col justify-between overflow-hidden hover:bg-black transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] h-full"
            >
                {/* Mood circle background on hover */}
                <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-red/10 rounded-full blur-[80px] group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
                
                <div className="space-y-6 relative z-10">
                    <span className="font-eurostile-black text-sm tracking-[0.3em] uppercase text-red/60 group-hover:text-red transition-colors">
                        {product.collection}
                    </span>
                    <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-black group-hover:text-white transition-colors leading-none">
                        {product.name}
                    </h3>
                </div>

                <div className="space-y-6 relative z-10">
                     <p className="text-gray-500 group-hover:text-gray-400 transition-colors font-light text-lg">
                        {product.models.join(" • ")}
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-red font-eurostile italic text-lg uppercase tracking-widest pt-4 border-b border-transparent hover:border-red transition-all"
                    >
                        Explore <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </motion.div>
          ))}
        </div>
        
        <footer className="mt-12 pt-8 border-t border-black/10 flex justify-between items-center text-xs text-gray-500 tracking-[0.4em] uppercase">
            <span>© 2026 ENICAR CHRONICLE</span>
            <span className="md:block hidden">Swiss Precision Since 1913</span>
        </footer>
      </div>
    </section>
  );
};
