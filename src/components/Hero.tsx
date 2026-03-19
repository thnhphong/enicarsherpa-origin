import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-charcoal text-ivory overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,29,29,0.03),transparent_70%)]" />
      
      <div className="relative z-10 text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-4"
        >
          <h2 className="text-red tracking-[0.5em] uppercase text-sm font-semibold hover:tracking-[0.8em] transition-all duration-700">The Legend Reborn</h2>
          <h1 className="text-6xl md:text-9xl font-serif font-bold italic leading-tight text-ivory">
            ENICAR <br /> CHRONICLE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl mx-auto text-silver/80 text-lg md:text-xl font-light leading-relaxed"
        >
          A legacy of Swiss precision and exploration. Discover the storied history of the watches that conquered Everest and mastered the depths.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center pt-10 gap-4"
        >
          <a
            href="#intro"
            className="group flex flex-col items-center gap-2 text-gold/60 hover:text-gold transition-colors"
          >
            <span className="text-[10px] uppercase tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">Explore the Story</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Decorative lines/circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-gold/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-gold/10 rounded-full" />
    </section>
  );
};
