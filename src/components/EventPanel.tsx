import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GlobeEvent } from "../data/globeEventsData";
import { useEffect } from "react";

interface EventPanelProps {
  event: GlobeEvent | null;
  onClose: () => void;
}

export const EventPanel = ({ event, onClose }: EventPanelProps) => {
  // Prevent scrolling when panel is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [event]);

  const getImagePath = (path: string | undefined) => {
    if (!path) return "";
    return `/images/Timeline/${path
        .replace(/\\/g, "/")
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/")}`;
  };

  return (
    <AnimatePresence>
      {event && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden flex flex-col text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Content Container (Scrollable) */}
            <div className="overflow-y-auto flex-1 p-6 md:p-10 custom-scrollbar">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                
                {/* Info Section */}
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 mb-4 rounded-full border border-white/30 text-yellow font-sans font-bold text-sm tracking-widest uppercase bg-white/5">
                      {event.year} {event.month && `• ${event.month}`}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-2">
                      {event.title}
                    </h2>
                    <p className="text-white/60 font-sans tracking-wide uppercase text-sm flex items-center gap-2">
                      📍 {event.location}, {event.country}
                    </p>
                  </div>

                  <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                    {event.description}
                  </p>

                  {/* Related Products placeholder */}
                  {event.products && event.products.length > 0 && (
                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-sm uppercase tracking-widest text-white/50 mb-4">Related Models</h4>
                      <div className="flex gap-4">
                        {event.products.map(prod => (
                           <span key={prod} className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm">{prod}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Images Section */}
                <div className="flex-1">
                  {event.images && event.images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.images.map((img, i) => (
                        <div key={i} className={`rounded-xl overflow-hidden shadow-lg ${i === 0 ? 'sm:col-span-2' : ''}`}>
                          <img 
                            src={getImagePath(img)} 
                            alt="" 
                            className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-64 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <span className="text-white/30 italic font-serif">No images available</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
