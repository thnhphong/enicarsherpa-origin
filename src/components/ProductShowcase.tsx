import { motion } from 'framer-motion';
import { productsData } from '../data/productsData';
import { ChevronRight } from 'lucide-react';

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-32 bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-24 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif font-bold italic text-gold"
          >
            The Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-silver/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Our most iconic complications, designed for performance in the most extreme conditions.
          </motion.p>
        </header>

        <div className="space-y-48">
          {productsData.map((product, i) => (
            <div
              key={product.id}
              className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Product Visual Area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full h-[400px] md:h-[600px] bg-white/5 rounded-3xl relative overflow-hidden group shadow-2xl flex items-center justify-center border border-white/10"
              >
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
                <div className="w-full h-full flex items-center justify-center p-12 relative z-10 transition-transform duration-700 group-hover:scale-105">
                  {/* Placeholder for Product Image */}
                  <div className="text-gold/20 font-serif text-[10rem] font-black opacity-20 pointer-events-none select-none uppercase">
                    {product.name.split(' ')[0]}
                  </div>
                  {/* 
                  Since we don't have actual images, I'm using a beautiful placeholder approach.
                  In production, replace this with: <img src={product.image} alt={product.name} className="object-contain drop-shadow-2xl" />
                  */}
                </div>
              </motion.div>

              {/* Product Info Area */}
              <div className="flex-1 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 1 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <span className="text-gold tracking-[0.3em] uppercase text-sm font-semibold">{product.tagline}</span>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold italic decoration-gold/30">{product.name}</h3>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-silver/80 font-light leading-relaxed"
                >
                  {product.description}
                </motion.p>

                <div className="space-y-4">
                  <h4 className="text-gold text-xs uppercase tracking-widest font-semibold font-sans underline decoration-gold/50 underline-offset-4">Technical Highlights</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-silver">
                        <ChevronRight className="w-4 h-4 text-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-2 text-gold font-serif italic text-xl border-b border-gold/30 hover:border-gold transition-colors pt-4 pb-1"
                >
                  Explore Reference Details <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
