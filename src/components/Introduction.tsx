import { motion } from "framer-motion";
import { Lightbulb, Settings, Award, ChevronRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

const introSections = [
  {
    id: "idea",
    title: "The Visionary Idea",
    description:
      "Ariste Racine set out to create more than just watches. He wanted a movement—a name that stood for the reversed thinking of traditional Swiss horology. From Racine to ENICAR, every piece was designed to challenge the status quo.",
    icon: <Lightbulb className="w-8 h-8" />,
    bullets: [
      'Breaking tradition with "Enicar"',
      "Chasing ultimate durability",
      "A legacy born in 1913",
    ],
  },
  {
    id: "process",
    title: "Precision in Every Gear",
    description:
      "Moving to Lengnau in 1934 allowed Enicar to become a true manufacture. Every component was refined to meet the rigors of extreme exploration—whether at the top of the world or the bottom of the sea.",
    icon: <Settings className="w-8 h-8" />,
    bullets: [
      "In-house movement manufacturing",
      "Testing in extreme climates",
      "Innovating the compressor case",
    ],
  },
  {
    id: "product",
    title: "The Final Masterpiece",
    description:
      "The marriage of rugged engineering and sophisticated design resulted in the legendary Sherpa line. These are not just timepieces; they are companions for the boldest adventurers in history.",
    icon: <Award className="w-8 h-8" />,
    bullets: [
      "Iconic Sherpa Graph",
      "Explorer Choice for Everest",
      "Racing heritage with Jim Clark",
    ],
  },
];

export const Introduction = () => {
  return (
    /* py-48 -> when mobile: py-10 */
    <section id="intro" className="relative py-10 md:py-48 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-full bg-red/[0.01] skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-red tracking-[0.5em] font-eurostile-black text-xl md:text-4xl lg:text-5xl uppercase block mb-4 ">
              The Engine of Innovation
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black italic text-black leading-none tracking-tighter">
              Legacy of <br />
              <span className="text-red">Exploration</span>
            </h2>
            <div className="w-24 h-[1px] bg-red/30 mt-8" />
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {introSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.8 }}
              className="group relative"
            >
              <div className="glass h-full py-5 px-5 rounded-[2.5rem] border border-black/[0.03] hover:border-red/10 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(189,33,38,0.05)] flex flex-col">
                <div className="w-10 h-10 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-black/[0.03] flex items-center justify-center rounded-2xl mb-8 group-hover:bg-red group-hover:text-white group-hover:scale-110 transition-all duration-500 border border-black/[0.05]">
                  {section.icon}
                </div>

                <h3 className="text-base md:text-2xl lg:text-3xl font-serif font-bold mb-6 group-hover:text-red transition-colors duration-500">
                  {section.title}
                </h3>

                <p className="text-gray-500/80 hover:text-gray-800 transition-colors duration-500 font-light leading-relaxed text-base md:text-lg lg:text-xl mb-2 md:mb-6 flex-grow">
                  {section.description}
                </p>

                <ul className="space-y-4 pt-6 border-t border-black/[0.05]">
                  {section.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-4 md:text-md sm:text-base font-medium text-black/60 group-hover:text-black transition-colors duration-500"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 bg-red/30 rounded-full group-hover:bg-red group-hover:scale-150 transition-all" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1, x: 5 }}
                  className="mt-8 flex items-center gap-2 text-red text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  View More <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 flex justify-center"
        >
          <motion.div
            className="bg-transparent"
            animate={{ y: [0, -16, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Link
              to="/phase/1"
              className="group flex items-center gap-4 bg-red text-white px-6 py-3 md:px-10 md:py-5 lg:px-15 lg:py-7 rounded-full font-serif text-lg hover:bg-black transition-colors duration-500 shadow-xl hover:shadow-[0_10px_40px_rgba(189,33,38,0.4)]"
            >
              <Globe2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
              <span>Explore Interactive Timeline</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
