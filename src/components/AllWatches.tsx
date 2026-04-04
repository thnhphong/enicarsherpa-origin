import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { productsData } from "../data/productsData";


export const AllWatches = () => {
    const [selectedFamily, setSelectedFamily] = useState<string>("All Watches");

    return (
        <div className="min-h-screen bg-white text-black pt-32 pb-16">
            <div className="max-w-[1400px] mx-auto px-6">
                
                {/* Header */}
                <div className="mb-12">
                   <div className="text-xs font-sans tracking-widest text-gray-500 uppercase mb-8">
                       <Link to="/" className="hover:text-black transition-colors">Home</Link> / Watch Finder
                   </div>
                   <h1 className="text-4xl md:text-5xl font-eurostile-black italic text-red uppercase text-center tracking-widest">
                       Watch Finder
                   </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-48 shrink-0">
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs font-eurostile-black tracking-widest uppercase text-gray-500 mb-6 font-bold">Collections</h3>
                                <ul className="space-y-5 text-sm font-sans">
                                    <li>
                                        <button 
                                            onClick={() => setSelectedFamily("All Watches")}
                                            className={`hover:text-red transition-colors ${selectedFamily === "All Watches" ? "text-red" : "text-black"}`}
                                        >
                                            All Watches
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => setSelectedFamily("Chronograph")}
                                            className={`hover:text-red transition-colors ${selectedFamily === "Chronograph" ? "text-red" : "text-black"}`}
                                        >
                                            Chronograph
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => setSelectedFamily("Dive")}
                                            className={`hover:text-red transition-colors ${selectedFamily === "Dive" ? "text-red" : "text-black"}`}
                                        >
                                            Dive
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => setSelectedFamily("GMT")}
                                            className={`hover:text-red transition-colors ${selectedFamily === "GMT" ? "text-red" : "text-black"}`}
                                        >
                                            GMT
                                        </button>
                                    </li>
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
                                        {/* Product Image Card */}
                                        <div className="bg-[#f8f8f8] aspect-[3/4] flex items-center justify-center p-8 mb-6 relative overflow-hidden group-hover:bg-[#f2f2f2] transition-colors rounded-sm shadow-sm group-hover:shadow-md">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-contain filter drop-shadow-xl mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                                            />
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="text-center px-4">
                                            <h3 className="font-eurostile-black text-xs tracking-widest uppercase text-gray-800 mb-3 font-bold group-hover:text-red transition-colors">
                                                {product.collection}
                                            </h3>
                                            <p className="text-[11px] text-gray-500 font-sans leading-relaxed mb-6 group-hover:text-black transition-colors">
                                                {product.name}
                                            </p>
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="w-8 h-px bg-red"></span>
                                                <span className="text-[9px] font-eurostile-black tracking-widest uppercase text-red font-bold">Discover</span>
                                                <span className="w-8 h-px bg-red"></span>
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
