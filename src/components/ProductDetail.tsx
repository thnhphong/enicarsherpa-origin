import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { productsData } from "../data/productsData";


export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = productsData.find((p) => p.id === id);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="w-full min-h-screen bg-white flex items-center justify-center text-black font-eurostile">
                <h1 className="text-2xl tracking-widest uppercase">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div key={id} className="w-full min-h-screen bg-[#050505] text-white flex flex-col pt-32 pb-24 selection:bg-red selection:text-white">

            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm font-eurostile-black tracking-[0.2em] uppercase text-gray-500 mb-16">
                    <Link to="/" className="hover:text-red transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/all-watches" className="hover:text-red transition-colors">All Watches</Link>
                    <span>/</span>
                    <span className="text-red drop-shadow-[0_0_10px_rgba(189,33,38,0.3)]">{product.name.toUpperCase()}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full h-full mb-16">
                    {/* Left side: Image and Thumbnails */}
                    <div className="w-full lg:w-[55%] flex-shrink-0 flex flex-col gap-8">
                        {/* Main Image Viewport */}
                        <div className="w-full aspect-[4/3] md:aspect-[5/4] flex items-center justify-center bg-[#f8f8f8] p-12 rounded-sm border border-[#e0e0e0] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImgIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={product.images[activeImgIndex]}
                                    alt={product.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-full max-w-full object-contain drop-shadow-2xl mix-blend-multiply"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnail Row */}
                        <div ref={scrollRef} className="relative group overflow-hidden">
                            <motion.div 
                                drag="x"
                                dragConstraints={scrollRef}
                                className="flex gap-4 pb-6 scrollbar-hide no-scrollbar select-none cursor-grab active:cursor-grabbing w-max"
                            >
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-2">
                                        <motion.div 
                                            onTap={() => setActiveImgIndex(idx)}
                                            className={`w-20 h-24 md:w-24 md:h-28 bg-[#f8f8f8] p-3 rounded-sm border transition-all duration-300 flex items-center justify-center cursor-pointer ${activeImgIndex === idx ? "border-red shadow-[0_0_15px_rgba(189,33,38,0.3)]" : "border-white/10 hover:border-white/30"}`}
                                        >
                                            <motion.img 
                                                src={img} 
                                                className="w-full h-full object-contain mix-blend-multiply pointer-events-none" 
                                                alt={`${product.name} variant ${idx}`}
                                                whileHover={{ scale: 1.05 }}
                                            />
                                        </motion.div>
                                        {/* Active indicator dot */}
                                        <motion.div 
                                            animate={{ 
                                                opacity: activeImgIndex === idx ? 1 : 0,
                                                scale: activeImgIndex === idx ? 1 : 0 
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="w-1.5 h-1.5 rounded-full bg-red shadow-[0_0_5px_#bd2126]"
                                        />
                                    </div>
                                ))}

                                {/* Optional ending padding for better scroll feel */}
                                <div className="w-10 flex-shrink-0"></div>
                            </motion.div>
                            
                            {/* Scroll Indicator Gradient */}
                            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Right side: Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="w-full lg:w-[45%] flex flex-col"
                    >
                        {/* Title Block */}
                        <div className="mb-12">
                            <h2 className="font-eurostile-black uppercase text-xl md:text-2xl tracking-[0.3em] mb-4 font-bold text-red drop-shadow-[0_0_15px_rgba(189,33,38,0.4)]">Enicar</h2>
                            <h1 className="font-sans text-gray-300 font-light text-3xl md:text-4xl lg:text-5xl leading-tight">{product.name}</h1>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10 mb-12"></div>

                        {/* Description Section */}
                        <div className="mb-12 space-y-6">
                            <h3 className="font-eurostile-black text-red text-base md:text-lg tracking-[0.2em] uppercase font-bold border-b border-red/20 pb-2 inline-block">
                                Description
                            </h3>
                            <p className="font-sans text-base md:text-xl text-gray-400 font-light leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Technical Specs Grid */}
                        <div className="space-y-6">
                            <h3 className="font-eurostile-black text-red text-base md:text-lg tracking-[0.2em] uppercase font-bold border-b border-red/20 pb-2 inline-block">
                                Technical Data
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="flex flex-col">
                                    <span className="font-sans text-xs md:text-[13px] uppercase tracking-widest text-gray-500 mb-2">Model</span>
                                    <span className="font-sans text-lg md:text-xl text-white">{product.reference}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-sans text-xs md:text-[13px] uppercase tracking-widest text-gray-500 mb-2">Movement</span>
                                    <span className="font-sans text-lg md:text-xl text-white">{product.caliber}</span>
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <span className="font-sans text-xs md:text-[13px] uppercase tracking-widest text-gray-500 mb-2">Case</span>
                                    <span className="font-sans text-lg md:text-xl text-white leading-relaxed">{product.details}</span>
                                </div>
                            </div>
                        </div>
                        
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
