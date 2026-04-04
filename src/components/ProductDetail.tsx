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
        <div className="w-full min-h-screen bg-white text-black flex flex-col pt-32 pb-24 selection:bg-red selection:text-white">

            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] md:text-xs font-eurostile-black tracking-[0.2em] uppercase text-gray-400 mb-16">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/all-watches" className="hover:text-black transition-colors">All Watches</Link>
                    <span>/</span>
                    <span className="text-red">{product.collection.toUpperCase()}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 w-full h-full">
                    {/* Left side: Image */}
                    <div className="w-full lg:w-3/5 flex-shrink-0 flex items-center justify-center bg-[#f8f8f8] py-24 rounded-sm border border-black/5">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="max-h-[60vh] object-contain drop-shadow-2xl mix-blend-multiply"
                        />
                    </div>

                    {/* Right side: Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="w-full lg:w-2/5 flex flex-col"
                    >
                        {/* Title Block */}
                        <div className="mb-12">
                            <h2 className="font-eurostile-black uppercase text-xl md:text-2xl tracking-widest mb-2 font-bold">Enicar</h2>
                            <h1 className="font-sans text-gray-500 font-light text-xl md:text-2xl">{product.name}</h1>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-black/10 mb-12"></div>

                        {/* Description Section */}
                        <div className="mb-12 space-y-6">
                            <h3 className="font-eurostile-black text-red text-xs md:text-sm tracking-[0.2em] uppercase font-bold">
                                Description
                            </h3>
                            <p className="font-sans text-xs md:text-sm text-gray-600 leading-loose">
                                {product.description}
                            </p>
                        </div>

                        {/* Technical Data Section */}
                        <div className="mb-12 space-y-6">
                            <h3 className="font-eurostile-black text-red text-xs md:text-sm tracking-[0.2em] uppercase font-bold">
                                Technical Data
                            </h3>
                            <div className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4">
                                <span className="font-sans text-xs md:text-sm text-gray-500">Reference</span>
                                <span className="font-sans text-xs md:text-sm text-gray-800">{product.reference}</span>
                            </div>
                        </div>

                        {/* Movement Section */}
                        <div className="mb-12 space-y-6">
                            <h3 className="font-eurostile-black text-red text-xs md:text-sm tracking-[0.2em] uppercase font-bold">
                                Movement
                            </h3>
                            <div className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4">
                                <span className="font-sans text-xs md:text-sm text-gray-500">Caliber number</span>
                                <span className="font-sans text-xs md:text-sm text-gray-800">{product.caliber}</span>
                            </div>
                        </div>
                        
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
