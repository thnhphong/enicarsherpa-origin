import { motion } from 'framer-motion';
import { ExternalLink, Mail, Phone, MapPin, Linkedin, Github, Watch } from 'lucide-react';

export const ProviderContact = () => {
  return (
    <section id="contact" className="py-32 bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* Provider Link Page Part */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-12"
          >
            <div className="space-y-6">
              <Watch className="w-10 h-10 text-gold mb-6" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tight underline-offset-8 decoration-gold/30">Thank You</h2>
              <p className="text-xl text-silver/80 font-light leading-relaxed">
                Our legacy continues through the passion of collectors and explorers. We invite you to explore more of our current collections through our official partner network.
              </p>
            </div>
            
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.enicar.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-gold rounded-2xl text-charcoal font-serif font-bold text-xl hover:bg-gold/90 transition-all duration-300"
            >
              <span>Visit Official Provider Website</span>
              <ExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Contact Page Part */}
          <div className="space-y-16">
            <header className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-gold">Get in Touch</h2>
              <p className="text-silver/60 font-light">
                For inquiries regarding vintage Enicar models, restoration, or chronicles, please contact our historian network.
              </p>
            </header>

            <div className="space-y-8 font-sans">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-gold/10 transition-colors">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div className="space-y-1">
                  <span className="text-silver/40 text-xs uppercase tracking-widest font-semibold block">Email</span>
                  <p className="text-xl font-light hover:text-gold transition-colors underline-offset-4 decoration-gold/20">chronicle@enicar-vintage.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-gold/10 transition-colors">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div className="space-y-1">
                  <span className="text-silver/40 text-xs uppercase tracking-widest font-semibold block">Phone</span>
                  <p className="text-xl font-light hover:text-gold transition-colors underline-offset-4 decoration-gold/20">+41 (0) 32 322 00 00</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-gold/10 transition-colors">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div className="space-y-1">
                  <span className="text-silver/40 text-xs uppercase tracking-widest font-semibold block">Archive Headquarters</span>
                  <p className="text-xl font-light leading-relaxed">Rue de la Gare, 2502 <br />Lengnau, Switzerland</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-10">
              <Github className="w-6 h-6 text-silver/40 hover:text-gold transition-colors cursor-pointer" />
              <Linkedin className="w-6 h-6 text-silver/40 hover:text-gold transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
        
        {/* Footer Text */}
        <div className="mt-32 pt-12 border-t border-white/5 text-center text-silver/20 text-xs uppercase tracking-[0.5em] font-sans">
          © 2026 ENICAR CHRONICLE • SWISS PRECISION SINCE 1913
        </div>
      </div>
    </section>
  );
};
