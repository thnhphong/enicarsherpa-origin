import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CollectionSlide = () => {
  return (
    <section id="products" className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/images/Products/Sherpa Jet Graph/Kibble Watches.webp"
          alt="Enicar Sherpas"
          className="w-full h-full object-cover opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(189,33,38,0.1),transparent_70%)" />
      </div>

      <div className="relative z-10 text-center px-6 space-y-12 w-full">
        <motion.h2
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false }}
           transition={{ duration: 1 }}
           className="text-[clamp(3rem,8vw,8rem)] italic leading-tight uppercase font-eurostile-black text-red drop-shadow-[0_0_25px_rgba(189,33,38,0.6)]"
        >
          Enicar Sherpas
        </motion.h2>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            to="/all-watches"
            className="group relative inline-flex items-center gap-4 md:gap-6 bg-red px-10 py-5 rounded-full text-white font-eurostile text-lg md:text-xl tracking-widest hover:bg-white hover:text-black transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(189,33,38,0.35)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="uppercase italic">View Full Collection</span>
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 group-hover:translate-x-4" />
          </Link>
        </motion.div>
      </div>

   
    </section>
  );
};
