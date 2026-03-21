import { motion, useScroll, useSpring } from "framer-motion";
import timelineData from "../Timeline.json";
import { useState, useEffect, useRef } from "react";

interface YearCounterProps {
  targetYear: string;
}

const YearCounter = ({ targetYear }: YearCounterProps) => {
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

      const current = Math.floor(
        startValue + (endValue - startValue) * easeProgress,
      );
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
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getImagePath = (path: string | undefined) => {
    if (!path) return "";
    return `/images/Timeline/${path
      .replace(/\\/g, "/")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")}`;
  };

  const handleScrollTo = (id: number) => {
    const element = document.getElementById(`year-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="py-32 bg-white text-black relative z-0"
    >
      {/* Central Progress Line */}
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-red/5 -translate-x-1/2 z-0 hidden md:block">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-red shadow-[0_0_15px_rgba(189,33,38,0.3)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-48 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:pl-[50%]"
          >
            <span className="text-red tracking-[0.4em] uppercase text-sm font-semibold block">
              The Journey
            </span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold italic tracking-tight text-black">
              Our History
            </h2>
          </motion.div>
        </header>

        <div className="space-y-64 md:space-y-96">
          {timelineData.map((item, index) => {
            const hasMultipleImages = item.images.length > 1;
            // 65/35 split for asymmetric gallery feel
            const splitPoint = Math.ceil(item.images.length * 0.65);
            const firstBatch = hasMultipleImages
              ? item.images.slice(0, splitPoint)
              : item.images;
            const secondBatch = hasMultipleImages
              ? item.images.slice(splitPoint)
              : [];

            return (
              <motion.div
                key={`${item.id}-${item.year}`}
                id={`year-${item.id}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className={`relative flex flex-col md:flex-row gap-12 md:gap-24 items-start ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-42px] md:left-1/2 top-12 w-20 h-20 bg-white border-2 border-red rounded-full -translate-x-1/2 flex items-center justify-center z-20 shadow-xl hidden md:flex">
                  <span className="text-sm font-eurostile-black text-red">
                    <YearCounter targetYear={item.year.split("-")[0]} />
                  </span>
                </div>

                {/* Side A: Text + Large Images (Batch 2) */}
                <div className="flex-1 space-y-12">
                  <div className="space-y-8">
                    <div className="relative">
                      <span className="absolute -top-16 md:-top-32 left-0 text-red/[0.06] font-serif text-8xl md:text-[14rem] font-black pointer-events-none select-none whitespace-nowrap">
                        {item.year}
                      </span>
                      <div className="relative z-10 space-y-4">
                        <span className="text-red tracking-[0.3em] font-semibold text-xs md:text-sm uppercase block">
                          {item.month || "HISTORIC MOMENT"}
                        </span>
                        <h3 className="text-3xl md:text-7xl font-serif font-bold tracking-tight text-black uppercase leading-[0.9]">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-base md:text-xl font-light leading-relaxed text-gray-600 max-w-xl">
                      {item.description}
                    </p>
                    <div className="w-16 h-[2px] bg-red/30" />

                    {/* Mobile Year Badge */}
                    <div className="md:hidden inline-block px-4 py-1 bg-red text-white text-sm font-bold rounded-full">
                      {item.year}
                    </div>
                  </div>

                  {/* Second batch of images on text side (Desktop Only) */}
                  {secondBatch.length > 0 && (
                    <div className="hidden md:block columns-1 gap-4 space-y-4">
                      {secondBatch.map((img, imgIndex) => (
                        <motion.div
                          key={img}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (splitPoint + imgIndex) * 0.1 }}
                          className="break-inside-avoid relative overflow-hidden rounded-2xl group border border-red/5"
                        >
                          <img
                            src={getImagePath(img)}
                            alt=""
                            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Image Side (Batch 1 of images on desktop, ALL on mobile) */}
                <div className="flex-1 w-full">
                  {/* Container for Desktop (First Batch) */}
                  <div
                    className={`hidden md:block columns-1 ${hasMultipleImages ? "sm:columns-2" : ""} gap-4 space-y-4`}
                  >
                    {firstBatch.map((img, imgIndex) => (
                      <motion.div
                        key={`desktop-${img}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: imgIndex * 0.1 }}
                        className="break-inside-avoid relative overflow-hidden rounded-2xl group border border-red/5"
                      >
                        <img
                          src={getImagePath(img)}
                          alt={`${item.title} - ${imgIndex}`}
                          className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Container for Mobile (All Images) */}
                  <div className="md:hidden columns-2 sm:columns-2 gap-4 space-y-4">
                    {item.images.map((img, imgIndex) => (
                      <motion.div
                        key={`mobile-${img}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: imgIndex * 0.1 }}
                        className="break-inside-avoid relative overflow-hidden rounded-2xl group border border-red/5"
                      >
                        <img
                          src={getImagePath(img)}
                          alt={`${item.title} - ${imgIndex}`}
                          className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {item.images.length === 0 && (
                    <div className="aspect-video bg-red/5 rounded-3xl flex items-center justify-center border border-red/10">
                      <span className="text-red/10 font-serif text-4xl italic">
                        {item.year}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fixed Navigation Scrubber (Horizontal Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Progress Bar Top Edge */}
        <motion.div
          className="h-[2px] bg-red shadow-[0_0_10px_rgba(189,33,38,0.5)]"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        <nav className="h-24 bg-white/95 backdrop-blur-sm border-t border-black/5 px-4 md:px-12 flex items-center overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-12 md:gap-24 min-w-max mx-auto h-full">
            {timelineData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="group flex flex-col items-center gap-1 transition-all"
              >
                <span className="text-red text-xs md:text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                  {item.year.split("-")[0]}
                </span>
                <div className="w-[1px] h-3 bg-black/10 group-hover:h-6 group-hover:bg-red transition-all" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 group-hover:text-black font-bold hidden md:block max-w-[120px] truncate">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};
