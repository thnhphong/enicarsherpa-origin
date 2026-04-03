import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  shouldAnimate: boolean;
}

const heroSectionClasses =
  "relative flex h-screen items-center justify-center overflow-hidden bg-black text-white";
const heroGradientClasses =
  "pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black via-black/80 to-transparent sm:h-32 md:h-40 lg:h-48";
const heroContentClasses =
  "mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-28 pb-10 text-center sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-36 md:pb-16 lg:px-12";
const heroSubtitleClasses =
  "relative z-10 mb-6 text-[10px] font-eurostile-black uppercase tracking-[0.24em] text-white drop-shadow-sm sm:mb-8 sm:text-xs sm:tracking-[0.32em] md:mb-10 md:text-sm md:tracking-[0.45em] lg:tracking-[0.6em]";
const enicarTitleClasses =
  "text-[clamp(3.5rem,18vw,13rem)] font-eurostile-black italic leading-[0.78] text-red drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]";
const sherpaTitleClasses =
  "-mt-3 text-[clamp(2.75rem,13vw,10rem)] font-script italic leading-[0.82] text-yellow drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] sm:-mt-4 md:-mt-8 lg:-mt-10";
const chronicleTitleClasses =
  "text-[clamp(2rem,8vw,8rem)] text-cyan font-eurostile italic leading-tight tracking-[0.02em] drop-shadow-lg";
const descriptionClasses =
  "mt-8 max-w-[34ch] text-base leading-relaxed text-gray-300 drop-shadow-sm sm:mt-10 sm:max-w-[44ch] sm:text-lg md:mt-12 md:max-w-[60ch] md:text-xl lg:max-w-[65ch] lg:text-2xl";

const HeroFrame = ({ children }: { children: ReactNode }) => {
  return (
    <section className={heroSectionClasses}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,32,36,0.04),transparent_40%)]" />
      <div className={heroGradientClasses} />
      {children}
    </section>
  );
};

const HeroShell = () => {
  return (
    <HeroFrame>
      <div aria-hidden="true" className="relative z-20 w-full">
        <div className={heroContentClasses}>
          <div className="relative inline-block">
            <p className={`${heroSubtitleClasses} text-red/70`}>
              The Stories Untold
            </p>

            <div className="relative z-10 flex flex-col items-center">
              <h1 className={enicarTitleClasses}>ENICAR</h1>
              <h2 className={sherpaTitleClasses}>Sherpa</h2>

              <div className="relative mt-2 inline-block md:mt-4">
                <h1 className={chronicleTitleClasses} >CHRONICLE</h1>
                <div className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-red/35 md:-bottom-0 md:h-[4px] lg:h-[6px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
};

export const Hero = ({ shouldAnimate }: HeroProps) => {
  if (!shouldAnimate) {
    return <HeroShell />;
  }

  return (
    <HeroFrame>
      <div className="relative z-20 w-full">
        <div className={heroContentClasses}>
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className={`${heroSubtitleClasses} transition-all duration-700 hover:tracking-[0.3em] sm:hover:tracking-[0.4em] md:hover:tracking-[0.6em] lg:hover:tracking-[0.8em]`}
            >
              The Stories Untold
            </motion.h2>

            <div className="relative z-10 flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className={enicarTitleClasses}
              >
                ENICAR
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                className={sherpaTitleClasses}
              >
                Sherpa
              </motion.h2>

              <div className="relative mt-2 inline-block md:mt-4">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.9, ease: "easeOut" }}
                  className={chronicleTitleClasses}
                >
                  CHRONICLE
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 1.75,
                    duration: 1.55,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-x-0 -bottom-1 h-[2px] origin-left rounded-full bg-red shadow-[0_0_10px_rgba(237,32,36,0.45)] md:-bottom-0 md:h-[4px] lg:h-[6px] lg:shadow-[0_0_15px_rgba(237,32,36,0.6)]"
                />
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className={descriptionClasses}
          >
            A legacy of Swiss precision and exploration. Discover the storied history of the watches that conquered Everest, challenged the speed and mastered the depths.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, delay: 1.55, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(94vw,94vh)] w-[min(94vw,94vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cyan/20 bg-cyan/[0.01] shadow-[inset_0_0_40px_rgba(0,188,242,0.3)] sm:h-[min(92vw,92vh)] sm:w-[min(92vw,92vh)] sm:border-[4px] sm:border-cyan/30 sm:shadow-[inset_0_0_60px_rgba(0,188,242,0.35)] md:border-[5px] md:shadow-[inset_0_0_80px_rgba(0,188,242,0.4)] lg:border-[7px] lg:border-cyan/40 lg:bg-cyan/[0.02] lg:shadow-[inset_0_0_120px_rgba(0,188,242,0.5)]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, delay: 1.75, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(76vw,76vh)] w-[min(76vw,76vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-yellow/30 bg-yellow/[0.01] shadow-[inset_0_0_40px_rgba(255,222,23,0.3)] sm:h-[min(74vw,74vh)] sm:w-[min(74vw,74vh)] sm:border-[3px] sm:border-yellow/40 sm:shadow-[inset_0_0_60px_rgba(255,222,23,0.35)] md:border-[4px] md:shadow-[inset_0_0_80px_rgba(255,222,23,0.4)] lg:border-[5px] lg:border-yellow/50 lg:bg-yellow/[0.02] lg:shadow-[inset_0_0_120px_rgba(255,222,23,0.5)]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, delay: 1.95, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(58vw,58vh)] w-[min(58vw,58vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-red/30 bg-red/[0.01] shadow-[inset_0_0_40px_rgba(189,33,38,0.3)] sm:h-[min(56vw,56vh)] sm:w-[min(56vw,56vh)] sm:border-[3px] sm:border-red/40 sm:shadow-[inset_0_0_60px_rgba(189,33,38,0.35)] md:border-[4px] md:shadow-[inset_0_0_80px_rgba(189,33,38,0.4)] lg:border-[5px] lg:border-red/50 lg:bg-red/[0.02] lg:shadow-[inset_0_0_120px_rgba(189,33,38,0.5)]"
      />
    </HeroFrame>
  );
};
