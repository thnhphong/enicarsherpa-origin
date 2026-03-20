import { motion } from "framer-motion";
import { Lightbulb, Settings, Award } from "lucide-react";

const introSections = [
  {
    id: "idea",
    title: "The Visionary Idea",
    description:
      "Ariste Racine set out to create more than just watches. He wanted a movement—a name that stood for the reversed thinking of traditional Swiss horology. From Racine to ENICAR, every piece was designed to challenge the status quo.",
    icon: <Lightbulb className="w-12 h-12 text-red" />,
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
    icon: <Settings className="w-12 h-12 text-red" />,
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
    icon: <Award className="w-12 h-12 text-red" />,
    bullets: [
      "Iconic Sherpa Graph",
      "Explorer Choice for Everest",
      "Racing heritage with Jim Clark",
    ],
  },
];

export const Introduction = () => {
  return (
    <section id="intro" className="py-32 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {introSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i, duration: 0.8 }}
              className="space-y-6 group"
            >
              <div className="p-4 bg-black/5 inline-block rounded-2xl group-hover:bg-black/10 transition-colors border border-black/10 group-hover:border-red">
                {section.icon}
              </div>
              <h3 className="text-3xl font-serif font-bold group-hover:text-red transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-500/70 font-light leading-relaxed">
                {section.description}
              </p>
              <ul className="space-y-3 pt-4">
                {section.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-500"
                  >
                    <div className="w-1 h-1 bg-cyan rounded-full" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
