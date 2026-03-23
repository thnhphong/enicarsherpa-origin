import { motion, useScroll, useSpring } from "framer-motion";
import timelineData from "../Timeline.json";
import { useRef, useCallback } from "react";
import { TimelineGlobe } from "./TimelineGlobe";

// Year circle button component for the vertical timeline
const YearBadge = ({ year }: { year: string }) => (
    <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="relative z-30 flex items-center justify-center mx-auto my-8"
    >
        <div className="w-20 h-20 rounded-full border-2 border-red bg-white flex items-center justify-center shadow-lg">
            <span className="text-red font-serif font-bold text-lg tracking-tight">{year}</span>
        </div>
    </motion.div>
);

export const Timeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const part2Ref = useRef<HTMLDivElement>(null);

    // Filter parts from Timeline.json
    const part1Data = timelineData.filter((item) => item.year === "1955");
    const part2Data = timelineData.filter((item) => {
        const y = parseInt(item.year);
        return y >= 1956 && y <= 1971;
    });
    const part3Data = timelineData.filter((item) => item.id === 26);

    // Global scroll for the progress line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Section specific scroll for the globe
    const { scrollYProgress: part2ScrollProgress } = useScroll({
        target: part2Ref,
        offset: ["start center", "end center"]
    });

    const getImagePath = (path: string | undefined) => {
        if (!path) return "";
        return `/images/Timeline/${path
            .replace(/\\/g, "/")
            .split("/")
            .map((segment) => encodeURIComponent(segment))
            .join("/")}`;
    };

    // When a globe marker is clicked, scroll to that event card
    const handleMarkerClick = useCallback((eventId: number) => {
        const el = document.getElementById(`timeline-event-${eventId}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("ring-2", "ring-red", "ring-offset-4", "ring-offset-white");
            setTimeout(() => {
                el.classList.remove("ring-2", "ring-red", "ring-offset-4", "ring-offset-white");
            }, 2000);
        }
    }, []);

    // Get unique years for Phase 2 year badges
    const part2Years = [...new Set(part2Data.map((item) => item.year))];

    return (
        <div ref={containerRef} id="timeline" className="bg-white relative">
            {/* CENTRAL VERTICAL LINE — spans the entire timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-20 hidden md:block">
                <div className="w-full h-full bg-red/10" />
                <motion.div
                    style={{ scaleY, originY: 0 }}
                    className="absolute inset-0 w-full bg-red shadow-[0_0_12px_rgba(189,33,38,0.4)]"
                />
            </div>

            {/* ══════════════ PART 1: THE PRECURSOR (1955) ══════════════ */}
            <section className="py-32 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-16 text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-red tracking-[0.6em] uppercase text-xs font-bold block mb-4"
                        >
                            Phase 01
                        </motion.span>
                        <h2 className="text-6xl md:text-9xl font-serif font-black italic tracking-tighter">
                            The Precursor
                        </h2>
                    </header>

                    {/* Year badge on the vertical line */}
                    <YearBadge year="1955" />

                    <div className="space-y-48 mt-16">
                        {part1Data.map((item) => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                                <div className="space-y-8 z-10 md:pr-12 md:text-right">
                                    <h3 className="text-4xl md:text-7xl font-serif font-bold uppercase leading-none">{item.title}</h3>
                                    <p className="text-xl text-gray-500 font-light leading-relaxed">{item.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {item.images.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="rounded-2xl overflow-hidden shadow-2xl"
                                        >
                                            <img src={getImagePath(img)} alt="" className="w-full h-auto" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════ PART 2: THE GOLDEN ERA (1956-1971) ══════════════ */}
            {/* White background — vertical line continues but the globe section uses a side layout */}
            <section ref={part2Ref} className="pt-16 pb-32 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-8 text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-red tracking-[0.6em] uppercase text-xs font-bold block mb-4"
                        >
                            Phase 02
                        </motion.span>
                        <h2 className="text-6xl md:text-9xl font-serif font-black italic tracking-tighter">
                            The Golden Era
                        </h2>
                        <p className="text-gray-400 text-lg mt-4 font-light">1956 – 1971 • Around the World</p>
                    </header>

                    {/* Year badge: start of golden era */}
                    <YearBadge year="1956" />
                </div>

                {/* Two-column layout: Globe left, Timeline right */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 relative">
                    
                    {/* LEFT: STICKY GLOBE — circular */}
                    <div className="md:col-span-5 sticky top-20 h-[80vh] flex flex-col items-center justify-center self-start">
                        <div className="w-full max-w-[380px] aspect-square relative rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.15)] border-2 border-black/5">
                            <TimelineGlobe progress={part2ScrollProgress} onMarkerClick={handleMarkerClick} />
                        </div>
                        <p className="text-[10px] text-black/30 tracking-[0.3em] uppercase mt-5">Drag globe • Click pins • Scroll timeline</p>
                    </div>

                    {/* RIGHT: VERTICAL TIMELINE EVENTS */}
                    <div className="md:col-span-7 space-y-32 py-8 relative">
                        {/* Thin vertical connector on the right side */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red/10 hidden md:block" />

                        {part2Data.map((item) => {
                            const isNewYear = part2Years.indexOf(item.year) === part2Data.indexOf(item);
                            return (
                                <motion.div 
                                    key={item.id}
                                    id={`timeline-event-${item.id}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-10% 0px -10% 0px" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="relative pl-8 md:pl-10 rounded-xl transition-all duration-500"
                                >
                                    {/* Dot on the connector line */}
                                    <div className="absolute left-[-4px] top-6 w-[9px] h-[9px] rounded-full bg-red shadow-[0_0_8px_rgba(189,33,38,0.4)] hidden md:block" />

                                    {/* Year badge inline if first event of that year */}
                                    {isNewYear && (
                                        <div className="mb-4">
                                            <span className="inline-block px-4 py-1.5 rounded-full border border-red/20 text-red font-serif font-bold text-sm bg-red/5">
                                                {item.year}
                                            </span>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <h3 className="text-2xl md:text-4xl font-serif font-bold uppercase italic tracking-tight leading-tight text-black">{item.title}</h3>
                                        <p className="text-base text-gray-500 font-light leading-relaxed max-w-xl">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        {item.images.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.03 }}
                                                transition={{ duration: 0.3 }}
                                                className="rounded-xl overflow-hidden border border-black/5 shadow-md group"
                                            >
                                                <img 
                                                    src={getImagePath(img)} 
                                                    alt="" 
                                                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500" 
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Closing year badge */}
                <div className="max-w-7xl mx-auto px-6 mt-16">
                    <YearBadge year="1971" />
                </div>
            </section>

            {/* ══════════════ PART 3: THE DOWNFALL (1977-1987) ══════════════ */}
            <section className="py-48 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-16 text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-red tracking-[0.6em] uppercase text-xs font-bold block mb-4"
                        >
                            Phase 03
                        </motion.span>
                        <h2 className="text-6xl md:text-9xl font-serif font-black italic tracking-tighter">
                            The Downfall
                        </h2>
                    </header>

                    {/* Year badge */}
                    <YearBadge year="1977" />

                    <div className="space-y-64 mt-16">
                        {part3Data.map((item) => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                                <div className="order-2 md:order-1 flex flex-col gap-6 md:pr-12">
                                    {item.images.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, filter: "grayscale(1)" }}
                                            whileInView={{ opacity: 0.5, filter: "grayscale(1)" }}
                                            whileHover={{ opacity: 1, filter: "grayscale(0)" }}
                                            className="rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000"
                                        >
                                            <img src={getImagePath(img)} alt="" className="w-full h-auto" />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="space-y-8 order-1 md:order-2 z-10">
                                    <h3 className="text-4xl md:text-7xl font-serif font-bold uppercase leading-none">{item.title}</h3>
                                    <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
