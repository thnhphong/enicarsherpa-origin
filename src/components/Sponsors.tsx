import { motion } from "framer-motion";

const sponsors = [
  {
    name: "Vintage Eye Watches",
    imageSrc: "/images/vintage-eye-watches-logo.webp",
    backgroundClassName: "bg-yellow",
    imageClassName: "scale-[1.65]",
  },
  {
    name: "Enicar Org",
    imageSrc: "/images/enicar-org-logo.webp",
    backgroundClassName: "bg-cyan",
    imageClassName: "scale-[1.65]",
  },
  {
    name: "Enicar 101",
    imageSrc: "/images/enicar-101-logo.webp",
    backgroundClassName: "bg-red",
    imageClassName: "scale-[1.95]",
  },
] as const;

export const Sponsors = () => {
  return (
    <section className="min-h-[100dvh] bg-black text-white py-16 flex items-center justify-center overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="font-eurostile-black uppercase tracking-[0.12em] text-xl sm:text-4xl md:text-5xl">
            OUR SPONSORS
          </div>
          <div className="mt-4 text-white/65 text-sm sm:text-base max-w-xl mx-auto">
            Thank you to the incredible people who made this project possible. We
            are deeply appreciated by your kindness and dedication.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center">
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.name}
              href="https://enicar.org/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              className={[
                sponsor.backgroundClassName,
                "w-full h-28 sm:h-32 rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer block",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              ].join(" ")}
            >
              <img
                src={sponsor.imageSrc}
                alt={sponsor.name}
                className={[
                  "w-full h-[150%] max-w-none object-contain transition-transform duration-500 hover:scale-110",
                  sponsor.imageClassName,
                ].join(" ")}
                loading="lazy"
                decoding="async"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

