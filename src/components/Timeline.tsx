import { motion, useScroll, useSpring } from 'framer-motion';
import timelineData from '../Timeline.json';
import { useState, useEffect, useRef } from 'react';

const YearCounter = ({ targetYear }: { targetYear: string }) => {
  const [displayYear, setDisplayYear] = useState(targetYear);

  useEffect(() => {
    const startValue = parseInt(displayYear) || 1955;
    const endValue = parseInt(targetYear) || 1955;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayYear(current.toString());

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetYear]);

  return <>{displayYear}</>;
};

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const getImagePath = (path: string | undefined) => {
    if (!path) return '';
    return `/src/assets/images/Timeline/${path.replace(/\\/g, '/')}`;
  };

  return (
    <section ref={containerRef} id="timeline" className="py-32 bg-charcoal text-ivory relative overflow-hidden">
      {/* Background Progressive Line */}
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-red/10 -translate-x-1/2 z-0">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-red shadow-[0_0_15px_rgba(139,29,29,0.5)]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-32 text-center md:text-left md:pl-[50%]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-red tracking-[0.4em] uppercase text-sm font-semibold text-red">The Journey</span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold italic tracking-tight text-ivory">Our History</h2>
          </motion.div>
        </header>

        <div className="space-y-64">
          {timelineData.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.year}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Year Marker on Line (Count Effect) */}
              <div className="absolute left-[-26px] md:left-1/2 top-0 md:top-1/2 w-20 h-20 bg-charcoal border-2 border-red rounded-full -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(139,29,29,0.2)]">
                <span className="text-sm font-bold text-red">
                  <YearCounter targetYear={item.year.split('-')[0]} />
                </span>
              </div>

              {/* Content Side */}
              <div className="flex-1 text-center md:text-left w-full md:w-auto">
                <div className="space-y-6">
                  <div className="relative">
                    {/* Ghost Background Year */}
                    <span className="absolute -top-16 left-0 text-red/5 font-serif text-9xl md:text-[12rem] font-black pointer-events-none select-none">
                      {item.year}
                    </span>
                    <span className="text-red tracking-[0.3em] font-semibold text-sm uppercase block mb-2">{item.month || 'HISTORIC MOMENT'}</span>
                    <h3 className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-ivory uppercase">{item.title}</h3>
                  </div>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-silver max-w-xl mx-auto md:mx-0">
                    {item.description}
                  </p>
                  <div className="w-12 h-[2px] bg-red/50 mx-auto md:mx-0" />
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full grid grid-cols-2 gap-4 aspect-video md:aspect-[4/3]">
                {item.image1 ? (
                  <div className="relative overflow-hidden rounded-3xl group border border-red/10">
                    <img 
                      src={getImagePath(item.image1)} 
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-red/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                  </div>
                ) : (
                   <div className="bg-red/5 border border-red/10 rounded-3xl flex items-center justify-center">
                      <span className="text-red/10 font-serif text-6xl italic">{item.year}</span>
                   </div>
                )}
                
                {item.image2 ? (
                  <div className="relative overflow-hidden rounded-3xl group border border-red/10 mt-8">
                    <img 
                      src={getImagePath(item.image2)} 
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-red/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                  </div>
                ) : (
                   <div className="bg-red/5 border border-red/10 rounded-3xl flex items-center justify-center mt-8">
                      <span className="text-red/10 font-serif text-6xl italic">{item.year}</span>
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
