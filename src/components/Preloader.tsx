import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    const subtextTimer = setTimeout(() => {
      setShowSubtext(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(subtextTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#bd2126] flex items-center justify-center overflow-hidden"
    >
      {/* LỚP PHỦ SẦN DA MẠNH (HEAVY LEATHER TEXTURE) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
        <svg width="100%" height="100%">
          <filter id="leatherHeavy">
            {/* Tạo vân thô hơn bằng cách giảm baseFrequency xuống 0.45 */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.45"
              numOctaves="4"
              stitchTiles="stitch"
            />
            {/* Tạo hiệu ứng dập nổi 3D (Bump Map) */}
            <feDiffuseLighting surfaceScale="2" diffuseConstant="1.5">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
          </filter>
          <rect width="100%" height="100%" filter="url(#leatherHeavy)" />
        </svg>
      </div>

      {/* LỚP PHỦ BÓNG (VIGNETTE) - GIÚP TẬP TRUNG VÀO GIỮA VÀ LÀM NỀN SANG HƠN */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute border border-dashed border-white/40 rounded-full w-[350px] h-[350px] md:w-[600px] md:h-[600px]"
        />
        {/* Vòng trong: Dấu chấm (Dotted) với khoảng cách xa */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="white"
              strokeWidth="0.8" /* Độ lớn của chấm */
              strokeOpacity="0.2"
              strokeLinecap="round"
              /* 0.1 là để tạo thành chấm tròn, 20 là khoảng cách. Tăng 20 lên để các chấm xa nhau hơn nữa */
              strokeDasharray="0.1 6"
            />
          </svg>
        </motion.div>

        <div className="relative text-center z-10 space-y-2">
          <motion.h1
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            animate={{
              opacity: [0, 1, 1, 0.5],
              filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(100px)"],
              scale: [1.1, 1, 1, 1.2],
            }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="text-7xl md:text-[10rem] font-eurostile-black tracking-[0.1em] text-white uppercase"
          >
            ENICAR
          </motion.h1>

          <AnimatePresence>
            {showSubtext && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-white tracking-[0.6em] uppercase text-[10px] md:text-sm font-eurostile-black italic mt-4"
              >
                The Story of Legendary
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
