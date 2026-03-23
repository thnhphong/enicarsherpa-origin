import { motion } from "framer-motion";
import { Lightbulb, Settings, Award, ChevronRight } from "lucide-react";

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
    <section id="intro" className="relative py-48 bg-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-red/[0.01] skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-red tracking-[0.5em] font-eurostile-black text-sm uppercase block mb-4">
              The Engine of Innovation
            </span>
            <h2 className="text-6xl md:text-9xl font-serif font-black italic text-black leading-none tracking-tighter">
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
              <div className="glass h-full p-10 rounded-[2.5rem] border border-black/[0.03] hover:border-red/10 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(189,33,38,0.05)] flex flex-col">
                <div className="w-16 h-16 bg-black/[0.03] flex items-center justify-center rounded-2xl mb-8 group-hover:bg-red group-hover:text-white group-hover:scale-110 transition-all duration-500 border border-black/[0.05]">
                  {section.icon}
                </div>
                
                <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-red transition-colors duration-500">
                  {section.title}
                </h3>
                
                <p className="text-gray-500/80 font-light leading-relaxed text-lg mb-8 flex-grow">
                  {section.description}
                </p>

                <ul className="space-y-4 pt-6 border-t border-black/[0.05]">
                  {section.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-4 text-sm font-medium text-black/60 group-hover:text-black transition-colors duration-500"
                    >
                      <div className="w-1.5 h-1.5 bg-red/30 rounded-full group-hover:bg-red group-hover:scale-150 transition-all" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 5 }}
                    className="mt-8 flex items-center gap-2 text-red text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                    Learn More <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

