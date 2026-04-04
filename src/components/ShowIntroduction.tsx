import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import introData from "../data/introductionData.json";

export const ShowIntroduction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black text-white px-4 sm:px-6 py-24 md:py-32 overflow-x-hidden font-sans">
      {/* Navigation Top Bar */}
      <div className="absolute top-0 left-0 w-full px-4 sm:px-8 py-6 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-eurostile-black font-bold text-red hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="uppercase tracking-widest text-xs">Home</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32">
        <header className="mt-16 md:mt-24 mb-8 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[clamp(3.5rem,10vw,8rem)] font-eurostile-black italic leading-[0.85] tracking-tighter"
          >
            <span className="text-yellow drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] block">
              Legacy of
            </span>
            <span className="text-red drop-shadow-[0_0_35px_rgba(189,33,38,0.8)] ml-4 md:ml-12 lg:ml-16 block relative z-10">
              Exploration
            </span>
          </motion.h1>
          <div className="w-full max-w-lg mt-10 md:mt-14 flex items-center gap-4">
            <div className="w-24 md:w-32 h-[3px] bg-red shadow-[0_0_15px_rgba(189,33,38,0.9)] rounded-full" />
            <div className="w-4 h-[3px] bg-yellow shadow-[0_0_15px_rgba(255,222,23,0.9)] rounded-full" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan/60 to-transparent" />
          </div>
        </header>

        {introData.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12 md:gap-16"
          >
            {/* Text First */}
            <div className="w-full space-y-8 md:space-y-12">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-eurostile-black italic text-red tracking-wider drop-shadow-[0_0_25px_rgba(189,33,38,0.6)] leading-tight">
                {section.title}
              </h3>
              <div className="space-y-8">
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-gray-200 font-light leading-[1.8] text-lg sm:text-xl md:text-2xl lg:text-[1.4rem]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Images Second */}
            {section.images && section.images.length > 0 && (
              <div className={`grid grid-cols-1 ${section.images.length > 1 ? "md:grid-cols-2" : ""} gap-6`}>
                {section.images.map((imgSrc, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  >
                    <img
                      src={imgSrc}
                      alt={`${section.title} - ${imgIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
