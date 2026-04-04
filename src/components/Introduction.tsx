import { motion } from "framer-motion";
import { ChevronRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

export const IntroSlideOne = () => {
  return (
    <section className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image: Full width, object-cover to avoid breaking pixels */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/images/Introdcution/Background Problem.webp"
          alt="Legacy background"
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: 1.2 }}
           className="space-y-6"
        >
          <h2 className="text-[clamp(3.5rem,10vw,8rem)] md:text-[clamp(4.5rem,12vw,10rem)] font-eurostile-black italic leading-[0.85] tracking-tighter uppercase">
            <span className="text-yellow block drop-shadow-[0_0_15px_rgba(255,222,23,0.3)]">
              Legacy of
            </span>
            <span className="text-red block drop-shadow-[0_0_35px_rgba(189,33,38,0.6)] ml-12 md:ml-24">
              Exploration
            </span>
          </h2>
          
          <div className="max-w-2xl mx-auto mt-12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed">
                  In the 1960s, the Enicar Sherpa was more than a watch; it was a trusted instrument for pioneers, climbers, and racers alike. 
                  A legacy forged in the most extreme conditions known to man.
              </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link
              to="/show-introduction"
              className="inline-flex items-center gap-4 px-8 py-4 bg-red text-white rounded-full font-eurostile text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all group shadow-[0_0_20px_rgba(189,33,38,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
            >
              <span className="italic">Explore The Legacy</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const TimelinePreview = () => {
  return (
    <section className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/images/Products/Sherpa Graph/Alberto Cervetti.JPG"
          alt="Timeline preview"
          className="w-full h-full object-cover opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(0,188,242,0.1),transparent_70%)" />
      </div>

      <div className="relative z-10 text-center px-6 space-y-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="text-[clamp(2.5rem,8vw,6.5rem)] font-eurostile-black italic text-cyan tracking-wider drop-shadow-[0_0_20px_rgba(0,188,242,0.4)] uppercase"
        >
          Discover The Timeline
        </motion.h1>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link
            to="/phase/1"
            className="group relative inline-flex items-center gap-6 bg-red px-10 py-5 rounded-full text-white font-eurostile text-xl tracking-widest hover:bg-white hover:text-black transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(189,33,38,0.35)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Globe2 className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-180" />
            <span className="uppercase italic">Open Interactive Map</span>
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 group-hover:translate-x-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
