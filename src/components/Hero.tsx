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
  "relative z-10 mb-10 text-[10px] font-eurostile-black uppercase tracking-[0.24em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:mb-8 sm:text-xs sm:tracking-[0.32em] md:mb-15 md:text-sm md:tracking-[0.45em] lg:tracking-[0.6em]";
const enicarTitleClasses =
  "text-[clamp(3.5rem,18vw,13rem)] font-eurostile-black italic leading-[0.78] text-red drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)] drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]";
const sherpaTitleClasses =
  "-mt-3 text-[clamp(2.75rem,13vw,10rem)] font-script italic leading-[0.82] text-yellow drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)] drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)] sm:-mt-4 md:-mt-8 lg:-mt-10";
const chronicleTitleClasses =
  "text-[clamp(2rem,8vw,8rem)] text-cyan font-eurostile italic leading-tight tracking-[0.02em] drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)] drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]";
const descriptionClasses =
  "mt-10 max-w-[34ch] text-base leading-relaxed text-gray-300 drop-shadow-md sm:mt-14 sm:max-w-[44ch] sm:text-lg md:mt-16 md:max-w-[60ch] md:text-xl lg:max-w-[65ch] lg:text-2xl";

const HeroFrame = ({ children }: { children: ReactNode }) => {
  return (
    <section className={heroSectionClasses}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(237,32,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,188,242,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_45%)]" />

      <div className={heroGradientClasses} />
      {children}

      {/* Decorative refined accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] tracking-[0.4em] uppercase font-light">
          Scroll Discovery
        </span>
      </div>
    </section>
  );
};

const HeroShell = () => {
  return (
    <HeroFrame>
      <div aria-hidden="true" className="relative z-20 w-full">
        <div className={heroContentClasses}>
          <div className="relative inline-block">
            <p className={heroSubtitleClasses}>The Stories Untold</p>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <h1
                  className={`${enicarTitleClasses} opacity-10 blur-[10px] absolute inset-0 translate-y-4 scale-95`}
                >
                  ENICAR
                </h1>
                <h1 className={enicarTitleClasses}>ENICAR</h1>
              </div>
              <h2 className={sherpaTitleClasses}>Sherpa</h2>

              <div className="relative mt-4 inline-block md:mt-6">
                <h1 className={chronicleTitleClasses}>ORIGINS</h1>
                <div className="absolute inset-x-0 -bottom-2 h-[1px] bg-gradient-to-r from-transparent via-red/50 to-transparent" />
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="relative z-20 w-full"
      >
        <div className={heroContentClasses}>
          <div className="relative inline-block">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className={`${heroSubtitleClasses} transition-all duration-700 hover:tracking-[0.3em] sm:hover:tracking-[0.4em] md:hover:tracking-[0.6em] lg:hover:tracking-[0.8em]`}
            >
              The Stories Untold
            </motion.p>

            <div className="relative z-10 flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={enicarTitleClasses}
              >
                ENICAR
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 1.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={sherpaTitleClasses}
              >
                Sherpa
              </motion.h2>

              <div className="relative mt-2 inline-block md:mt-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={chronicleTitleClasses}
                >
                  ORIGINS
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    delay: 2.8,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-x-0 -bottom-1 h-[2px] origin-left rounded-full bg-red shadow-[0_0_15px_rgba(237,32,36,0.6)] md:-bottom-0 md:h-[4px] lg:h-[6px]"
                />
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={descriptionClasses}
          >
            A legacy of Swiss precision and exploration. Discover the storied
            history of the watches that conquered Everest, challenged speed and
            mastered the depths.
          </motion.p>
        </div>
      </motion.div>
    </HeroFrame>
  );
};
