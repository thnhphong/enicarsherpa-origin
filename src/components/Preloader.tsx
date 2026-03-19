import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // Total duration of preloader
    
    const subtextTimer = setTimeout(() => {
      setShowSubtext(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(subtextTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#8B1D1D] flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Rotating Dotted Circles - Absolute Centered */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute border border-dashed border-gold/40 rounded-full w-[350px] h-[350px] md:w-[600px] md:h-[600px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute border border-dotted border-gold/20 rounded-full w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        />

        {/* Text Animation Content - Centered */}
        <div className="relative text-center z-10 space-y-2">
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            animate={{ 
              opacity: [0, 1, 1, 0.5], 
              filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(100px)'],
              scale: [1.1, 1, 1, 1.2],
            }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="text-7xl md:text-[10rem] font-serif font-black tracking-[0.1em] text-ivory uppercase"
          >
            ENICAR
          </motion.h1>
          
          <AnimatePresence>
            {showSubtext && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-gold tracking-[0.6em] uppercase text-[10px] md:text-sm font-semibold italic mt-4"
              >
                The Story of Legendary
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
