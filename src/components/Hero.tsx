import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-white text-black overflow-hidden">
      {/* Background gradients and glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,32,36,0.04),transparent_40%)]" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 text-center space-y-8 px-6 w-full max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Handwritten Tagline using Yellowtail font */}
          <motion.span
            initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="absolute -top-10 -left-8 md:-top-16 md:-left-20 text-4xl md:text-6xl text-yellow font-script z-0 drop-shadow-md select-none"
          >
            Since 1914
          </motion.span>

          {/* Subtitle */}
          <h2 className="relative z-10 text-red tracking-[0.6em] uppercase text-xs md:text-sm font-eurostile-black hover:tracking-[1em] transition-all duration-700 mb-6 drop-shadow-sm">
            The Legend Reborn
          </h2>

          {/* Main Title wrapper */}
          <div className="relative z-10 flex flex-col items-center">
            {/* ENICAR - Massive size, drop shadow */}
            <h1 className="text-7xl md:text-[10rem] lg:text-[13rem] font-eurostile-black italic leading-[0.8] text-black drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]">
              ENICAR
            </h1>

            {/* CHRONICLE - Gradient text, underline effect */}
            <div className="relative inline-block mt-2 md:mt-4">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-eurostile italic leading-tight text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-700 to-black drop-shadow-lg">
                CHRONICLE
              </h1>

              {/* Animated Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
                className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-[3px] md:h-[6px] bg-red origin-left rounded-full shadow-[0_0_15px_rgba(237,32,36,0.6)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl mx-auto text-gray-600 text-lg md:text-2xl font-eurostile font-light leading-relaxed mt-16 drop-shadow-sm"
        >
          A legacy of Swiss precision and exploration. Discover the storied
          history of the watches that conquered Everest and mastered the depths.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center pt-16 gap-4"
        >
          <a
            href="#timeline"
            className="group flex flex-col items-center gap-4 text-black/40 hover:text-red transition-all duration-300"
          >
            <span className="text-xs uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500 font-eurostile-black">
              Explore the Story
            </span>
            <div className="p-3 rounded-full border border-black/10 group-hover:border-red group-hover:bg-red/5 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(237,32,36,0.2)]">
              <ArrowDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Decorative Background Elements - Made more visible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border-[7px] border-cyan/20 bg-cyan/[0.01] rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border-[5px] border-yellow/30 bg-yellow/[0.02] rounded-full pointer-events-none shadow-[inset_0_0_100px_rgba(255,222,23,0.1)]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border-[2px] border-black/10 bg-black/[0.02] rounded-full pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.05)]"
      />
    </section>
  );
};
