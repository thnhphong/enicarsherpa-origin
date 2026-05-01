import { motion } from "framer-motion";
import {
  
  Mail,
  Phone,
  Watch,
  Instagram,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export const ProviderContact = () => {
  return (
    <section id="contact" className="py-32 bg-[#050505] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-red/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[40rem] h-[20rem] bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-12 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            <div className="space-y-6">
              <Watch className="w-10 h-10 text-red mb-6 drop-shadow-[0_0_15px_rgba(189,33,38,0.5)]" />
              <h2 className="text-4xl md:text-5xl font-eurostile-black italic tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Thank You
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed">
                Our legacy continues through the passion of collectors and
                explorers. We invite you to explore more of our current
                collections through our official partner network.
              </p>
            </div>

            <MotionLink
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              to="/sponsors"
              className="group flex items-center justify-between p-6 bg-red rounded-2xl text-white font-serif font-bold text-xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(189,33,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <span className="italic font-eurostile-black tracking-wider uppercase text-sm md:text-lg">Visit Our Sponsors</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MotionLink>
          </motion.div>

          <div className="space-y-16">
            <header className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-eurostile-black italic text-red tracking-wider drop-shadow-[0_0_25px_rgba(189,33,38,0.6)] uppercase">
                Get in Touch
              </h2>
              <p className="text-gray-300 font-light text-base md:text-xl lg:text-2xl leading-relaxed">
                For inquiries regarding vintage Enicar models, restoration, or
                chronicles, please contact our historian network.
              </p>
            </header>

            <div className="space-y-8 font-sans">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-red/10 transition-colors border border-white/5">
                  <Mail className="w-6 h-6 text-red" />
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 text-sm md:text-base lg:text-lg uppercase tracking-widest font-eurostile block">
                    Email
                  </span>
                  <a href="mailto:nattanan.boonyachai1122@gmail.com" className="text-sm md:text-base lg:text-lg text-white font-light hover:text-red transition-colors underline-offset-4 decoration-red/30 hover:underline">
                    nattanan.boonyachai1122@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-red/10 transition-colors border border-white/5">
                  <Phone className="w-6 h-6 text-red" />
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 text-sm md:text-base lg:text-lg uppercase tracking-widest font-eurostile block">
                    Phone
                  </span>
                  <p className="text-sm md:text-base lg:text-lg text-white font-light">
                    (+66) 0655809210
                  </p>
                </div>
              </div>
        
              <a 
                href="https://www.instagram.com/enicarsherpa_origins/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-6 group hover:cursor-pointer"
              >
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-red/10 transition-colors border border-white/5">
                  <Instagram className="w-6 h-6 text-red" />
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 text-sm md:text-base lg:text-lg uppercase tracking-widest font-eurostile block">
                    Instagram
                  </span>
                  <p className="text-sm md:text-base lg:text-lg text-white font-light leading-relaxed hover:text-red transition-colors">
                    enicarsherpa_origins
                  </p>
                </div>
              </a>
            </div>

          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 text-center text-gray-500/50 text-xs uppercase tracking-[0.5em] font-eurostile font-bold">
          © {new Date().getFullYear()} ENICAR CHRONICLE • SWISS PRECISION SINCE 1913
        </div>
      </div>
    </section>
  );
};
