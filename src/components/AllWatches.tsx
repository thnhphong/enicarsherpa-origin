import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { productsData } from "../data/productsData";


export const AllWatches = () => {
    const [selectedFamily, setSelectedFamily] = useState<string>("All Watches");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100dvh] bg-[#050505] text-white pt-32 pb-16 font-sans relative overflow-hidden">
            {/* Background ambiance */}
            <div className="absolute top-0 right-0 w-[40rem] h-[30rem] bg-red/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50rem] h-[30rem] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="mb-12">
                   <h1 className="text-4xl md:text-5xl font-eurostile-black italic text-red uppercase text-center tracking-widest drop-shadow-[0_0_20px_rgba(189,33,38,0.5)]">
                       Sherpa Collection
                   </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-48 shrink-0">
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs font-eurostile-black tracking-widest uppercase text-gray-400 mb-6 font-bold pb-2 border-b border-white/10">Collections</h3>
                                <ul className="space-y-5 text-sm font-sans">
                                    {["All Watches", "Chronograph", "Dive", "GMT"].map(family => (
                                        <li key={family}>
                                            <button 
                                                onClick={() => setSelectedFamily(family)}
                                                className={`hover:text-yellow transition-colors duration-300 uppercase tracking-widest font-eurostile-black text-xs ${selectedFamily === family ? "text-red drop-shadow-[0_0_10px_rgba(189,33,38,0.5)]" : "text-gray-500"}`}
                                            >
                                                {family}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-1">
                        <div className="mb-8 text-xs font-eurostile-black text-red tracking-widest font-bold">
                            {productsData.filter(p => selectedFamily === "All Watches" || p.family === selectedFamily).length} WATCHES
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 cl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-12">
                            {productsData
                                .filter(product => selectedFamily === "All Watches" || product.family === selectedFamily)
                                .map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link to={`/product/${product.id}`} className="block group cursor-pointer h-full">
                                        {/* Product Image Card Minimal Flat */}
                                        <div className="bg-[#f8f8f8] border border-[#dcdcdc] aspect-[4/5] flex items-center justify-center p-6 mb-4 relative overflow-hidden transition-colors duration-500 group-hover:bg-[#e8e8e8] group-hover:border-[#b0b0b0] rounded-sm">
                                            <img 
                                                src={product.images[0]} 
                                                alt={product.name} 
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-contain filter drop-shadow-md mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                                            />
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="text-center sm:text-left flex-1 flex flex-col">
                                            <h3 className="font-sans text-[11px] sm:text-[12px] md:text-sm tracking-[0.1em] uppercase text-gray-400 group-hover:text-white transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-[13px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-gray-600 font-sans mt-1 group-hover:text-gray-300 transition-colors">
                                                {product.family}
                                            </p>
                                            <div className="flex items-center justify-center sm:justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                                                <span className="w-8 h-px bg-red"></span>
                                                <span className="text-[9px] font-eurostile-black tracking-widest uppercase text-red font-bold">Discover</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
