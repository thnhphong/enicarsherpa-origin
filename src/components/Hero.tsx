import { motion } from "framer-motion";

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
          {/* Subtitle */}
          <h2 className="relative z-10 text-red tracking-[0.6em] uppercase text-xs md:text-sm font-eurostile-black hover:tracking-[1em] transition-all duration-700 mb-10 drop-shadow-sm">
            The Stories Untold
          </h2>

          {/* Main Title wrapper */}
          <div className="relative z-10 flex flex-col items-center">
            {/* ENICAR - Massive size, drop shadow */}
            <h1 className="text-7xl md:text-[10rem] lg:text-[13rem] font-eurostile-black italic leading-[0.7] text-black drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]">
              ENICAR
            </h1>
            <h2 className="text-5xl md:text-[8rem] lg:text-[10rem] font-yellowtail italic leading-[0.8] text-black drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] -mt-6 md:-mt-10 ">
              SHERPA
            </h2>
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
                className="absolute -bottom-2 md:-bottom-0 left-0 right-0 h-[3px] md:h-[6px] bg-red origin-left rounded-full shadow-[0_0_15px_rgba(237,32,36,0.6)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl mx-auto text-gray-600 text-lg md:text-2xl font-eurostile font-light leading-relaxed mt-16 drop-shadow-sm"
        >
          A legacy of Swiss precision and exploration. Discover the storied
          history of the watches that conquered Everest and mastered the depths.
        </motion.p>
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border-[2px] border-red/30  bg-red/[0.02] rounded-full pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.05)]"
      />
    </section>
  );
};
