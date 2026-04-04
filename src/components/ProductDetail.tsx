import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { productsData } from "../data/productsData";


export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = productsData.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="w-full min-h-screen bg-white flex items-center justify-center text-black font-eurostile">
                <h1 className="text-2xl tracking-widest uppercase">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col pt-32 pb-24 selection:bg-red selection:text-white">

            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm font-eurostile-black tracking-[0.2em] uppercase text-gray-500 mb-16">
                    <Link to="/" className="hover:text-red transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/all-watches" className="hover:text-red transition-colors">All Watches</Link>
                    <span>/</span>
                    <span className="text-red drop-shadow-[0_0_10px_rgba(189,33,38,0.3)]">{product.collection.toUpperCase()}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full h-full">
                    {/* Left side: Image */}
                    <div className="w-full lg:w-[55%] flex-shrink-0 flex items-center justify-center bg-[#f8f8f8] py-16 md:py-24 rounded-sm border border-[#e0e0e0] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[50vh] md:max-h-[60vh] object-contain drop-shadow-2xl mix-blend-multiply"
                        />
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
                            <h2 className="font-eurostile-black uppercase text-3xl md:text-4xl tracking-widest mb-4 font-bold text-red drop-shadow-[0_0_15px_rgba(189,33,38,0.4)]">Enicar</h2>
                            <h1 className="font-sans text-gray-300 font-light text-2xl md:text-3xl lg:text-4xl leading-tight">{product.name}</h1>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10 mb-12"></div>

                        {/* Description Section */}
                        <div className="mb-12 space-y-6">
                            <h3 className="font-eurostile-black text-red text-sm md:text-base tracking-[0.2em] uppercase font-bold border-b border-red/20 pb-2 inline-block">
                                Description
                            </h3>
                            <p className="font-sans text-sm md:text-lg text-gray-400 font-light leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Technical Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {/* Technical Data Section */}
                            <div className="space-y-6">
                                <h3 className="font-eurostile-black text-red text-sm md:text-base tracking-[0.2em] uppercase font-bold border-b border-red/20 pb-2 inline-block">
                                    Technical Data
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="font-sans text-[11px] uppercase tracking-widest text-gray-500 mb-1">Reference</span>
                                        <span className="font-sans text-base md:text-lg text-white">{product.reference}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-sans text-[11px] uppercase tracking-widest text-gray-500 mb-1">Case</span>
                                        <span className="font-sans text-base md:text-lg text-white">{product.details}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Movement Section */}
                            <div className="space-y-6">
                                <h3 className="font-eurostile-black text-red text-sm md:text-base tracking-[0.2em] uppercase font-bold border-b border-red/20 pb-2 inline-block">
                                    Movement
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="font-sans text-[11px] uppercase tracking-widest text-gray-500 mb-1">Caliber number</span>
                                        <span className="font-sans text-base md:text-lg text-white">{product.caliber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
