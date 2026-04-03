import { motion } from "framer-motion";
import { ChevronRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import introData from "../data/introductionData.json";

export const Introduction = () => {
  return (
    /* py-48 -> when mobile: py-10 */
    <section id="intro" className="relative py-10 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-full bg-red/[0.01] skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
      
            <h2 className="text-[clamp(4rem,10vw,9rem)] font-eurostile-black italic leading-[0.85] tracking-tighter">
              <span className="text-yellow drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] block">
                Legacy of
              </span>
              <span className="text-red drop-shadow-[0_0_35px_rgba(189,33,38,0.8)] ml-4 md:ml-12 lg:ml-16 block relative z-10">
                Exploration
              </span>
            </h2>
            <div className="w-full max-w-lg mt-10 md:mt-5 flex items-center gap-4">
              <div className="w-24 md:w-32 h-[3px] bg-red shadow-[0_0_15px_rgba(189,33,38,0.9)] rounded-full" />
              <div className="w-4 h-[3px] bg-yellow shadow-[0_0_15px_rgba(255,222,23,0.9)] rounded-full" />
              <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan/60 to-transparent" />
            </div>
          </motion.div>
        </header>

        <div className="flex flex-col gap-24 mt-16 md:gap-32">
          {introData.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-10"
            >
              {section.images && section.images.length > 0 && (
                <div className="flex flex-col gap-6">
                  {section.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                      <img
                        src={imgSrc}
                        alt={`${section.title} - ${imgIdx + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="w-full space-y-8 md:space-y-12 mt-6">
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 flex justify-center"
        >
          <motion.div
            className="bg-transparent"
            animate={{ y: [0, -16, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Link
              to="/phase/1"
              className="group flex items-center gap-4 bg-red text-white px-6 py-3 md:px-10 md:py-5 lg:px-15 lg:py-7 rounded-full font-serif text-lg hover:bg-white hover:text-black transition-colors duration-500 shadow-xl hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
            >
              <Globe2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
              <span>Explore Interactive Timeline</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
