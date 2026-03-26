import { motion } from "framer-motion";

interface HeroProps {
  shouldAnimate: boolean;
}

export const Hero = ({ shouldAnimate }: HeroProps) => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-white text-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,32,36,0.04),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white via-white/80 to-transparent sm:h-32 md:h-40 lg:h-48" />

      <div className="relative z-20 w-full">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-28 pb-10 text-center sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-36 md:pb-16 lg:px-12">
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldAnimate ? 1 : 0 }}
              transition={{
                duration: shouldAnimate ? 0.6 : 0,
                delay: shouldAnimate ? 0.1 : 0,
                ease: "easeOut",
              }}
              className="relative z-10 mb-6 text-[10px] font-eurostile-black uppercase tracking-[0.24em] text-red drop-shadow-sm transition-all duration-700 hover:tracking-[0.3em] sm:mb-8 sm:text-xs sm:tracking-[0.32em] sm:hover:tracking-[0.4em] md:mb-10 md:text-sm md:tracking-[0.45em] md:hover:tracking-[0.6em] lg:tracking-[0.6em] lg:hover:tracking-[0.8em]"
            >
              The Stories Untold
            </motion.h2>

            <div className="relative z-10 flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: shouldAnimate ? 1 : 0 }}
                transition={{
                  duration: shouldAnimate ? 0.7 : 0,
                  delay: shouldAnimate ? 0.35 : 0,
                  ease: "easeOut",
                }}
                className="text-[clamp(3.5rem,18vw,13rem)] font-eurostile-black italic leading-[0.78] text-black drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
              >
                ENICAR
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: shouldAnimate ? 1 : 0 }}
                transition={{
                  duration: shouldAnimate ? 0.7 : 0,
                  delay: shouldAnimate ? 0.6 : 0,
                  ease: "easeOut",
                }}
                className="-mt-3 text-[clamp(2.75rem,13vw,10rem)] font-script italic leading-[0.82] text-black drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] sm:-mt-4 md:-mt-8 lg:-mt-10"
              >
                SHERPA
              </motion.h2>

              <div className="relative mt-2 inline-block md:mt-4">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: shouldAnimate ? 1 : 0 }}
                  transition={{
                    duration: shouldAnimate ? 0.75 : 0,
                    delay: shouldAnimate ? 0.9 : 0,
                    ease: "easeOut",
                  }}
                  className="text-[clamp(2rem,8vw,8rem)] font-eurostile italic leading-tight tracking-[0.02em] text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-700 to-black drop-shadow-lg"
                >
                  CHRONICLE
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: shouldAnimate ? 1 : 0 }}
                  transition={{
                    delay: shouldAnimate ? 1.75 : 0,
                    duration: shouldAnimate ? 1.55 : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-x-0 -bottom-1 h-[2px] origin-left rounded-full bg-red shadow-[0_0_10px_rgba(237,32,36,0.45)] md:-bottom-0 md:h-[4px] lg:h-[6px] lg:shadow-[0_0_15px_rgba(237,32,36,0.6)]"
                />
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{
              delay: shouldAnimate ? 1.2 : 0,
              duration: shouldAnimate ? 0.8 : 0,
              ease: "easeOut",
            }}
            className="mt-8 max-w-[34ch] text-base leading-relaxed text-gray-600 drop-shadow-sm sm:mt-10 sm:max-w-[44ch] sm:text-lg md:mt-12 md:max-w-[60ch] md:text-xl lg:max-w-[65ch] lg:text-2xl"
          >
            A legacy of Swiss precision and exploration. Discover the storied
            history of the watches that conquered Everest and mastered the
            depths.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: shouldAnimate ? 1 : 0,
          scale: shouldAnimate ? 1 : 0.8,
        }}
        transition={{
          duration: shouldAnimate ? 2.6 : 0,
          delay: shouldAnimate ? 1.55 : 0,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(94vw,94vh)] w-[min(94vw,94vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cyan/12 bg-cyan/[0.008] sm:h-[min(92vw,92vh)] sm:w-[min(92vw,92vh)] sm:border-[4px] sm:border-cyan/16 md:border-[5px] lg:border-[7px] lg:border-cyan/20 lg:bg-cyan/[0.01]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: shouldAnimate ? 1 : 0,
          scale: shouldAnimate ? 1 : 0.8,
        }}
        transition={{
          duration: shouldAnimate ? 2.6 : 0,
          delay: shouldAnimate ? 1.75 : 0,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(76vw,76vh)] w-[min(76vw,76vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-yellow/20 bg-yellow/[0.015] shadow-[inset_0_0_36px_rgba(255,222,23,0.08)] sm:h-[min(74vw,74vh)] sm:w-[min(74vw,74vh)] sm:border-[3px] sm:border-yellow/24 sm:shadow-[inset_0_0_52px_rgba(255,222,23,0.09)] md:border-[4px] md:shadow-[inset_0_0_68px_rgba(255,222,23,0.1)] lg:border-[5px] lg:border-yellow/30 lg:bg-yellow/[0.02] lg:shadow-[inset_0_0_100px_rgba(255,222,23,0.1)]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: shouldAnimate ? 1 : 0,
          scale: shouldAnimate ? 1 : 0.8,
        }}
        transition={{
          duration: shouldAnimate ? 2.6 : 0,
          delay: shouldAnimate ? 1.95 : 0,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(58vw,58vh)] w-[min(58vw,58vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-red/20 bg-red/[0.015] shadow-[0_0_24px_rgba(0,0,0,0.03)] sm:h-[min(56vw,56vh)] sm:w-[min(56vw,56vh)] sm:border-red/24 sm:shadow-[0_0_28px_rgba(0,0,0,0.04)] lg:border-red/30 lg:bg-red/[0.02] lg:shadow-[0_0_50px_rgba(0,0,0,0.05)]"
      />
    </section>
  );
};
