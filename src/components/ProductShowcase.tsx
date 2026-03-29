import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { productsData } from "../data/productsData";
import type { Product } from "../data/productsData";
import timelineData from "../Timeline.json";
import { ChevronRight } from "lucide-react";

const getImagePath = (path: string | undefined) => {
  if (!path) return "";
  return `/images/Timeline/${path
    .replace(/\\/g, "/")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const BrandContext = () => {
  return (
    <div className="w-full bg-black text-white py-24 md:py-32 rounded-3xl overflow-hidden my-32">
      <div className="max-w-6xl mx-auto px-2 md:px-12 px-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="font-yellowtail text-6xl italic text-red mb-6 block">
                The Idea
              </span>
              <div className="space-y-4">
                <span className="font-eurostile-black text-xl md:text-2xl lg:text-3xl tracking-[0.4em] uppercase text-red block">
                  THE GOLDEN ERA
                </span>
                <div className="font-light text-gray-300 leading-relaxed text-base md:text-xl space-y-3 md:space-y-6">
                  <p>
                    Enicar earned a reputation in the mid-20th century for
                    producing high-quality tool watches that combined technical
                    reliability with bold design at prices well below those of
                    luxury competitors such as Rolex and Blancpain.
                  </p>
                  <p>
                    Models like the Sherpa Graph, Sherpa Jet, and Sherpa
                    Super-Dive featured in-house movements, robust EPSA
                    compressor cases, and real-world testing by climbers,
                    racers, and military divers.
                  </p>
                  <p>
                    Despite this engineering credibility, Enicar remained
                    remarkably affordable, making professional-grade Swiss
                    watches accessible to a wider global audience, especially in
                    Asia, where the brand built a strong following. This
                    value-driven approach helped position Enicar as a brand for
                    doers, not just collectors.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-16 h-[2px] bg-red/30 my-8"
            />

            <motion.div variants={itemVariants} className="space-y-4">
              <span className="font-eurostile-black text-xl md:text-2xl lg:text-3xl tracking-[0.4em] uppercase text-red block">
                THE BIG PROBLEM
              </span>
              <div className="font-light text-gray-300 leading-relaxed text-base md:text-xl space-y-3 md:space-y-6">
                <p>
                  Enicar was slow to invest in quartz development compared to
                  Japanese and some Swiss rivals, making it vulnerable when
                  consumer demand shifted rapidly in the 1970s. Despite
                  supplying high-performance watches (e.g., Sherpa Dive, Graph),
                  Enicar lacked the marketing clarity and documentation to
                  establish mainstream professional credibility like Rolex or
                  Omega.
                </p>
                <p>
                  After acquired by Wah Ming Hong in 1987, the brand under new
                  ownership did not preserve or invest in the original archives,
                  making it difficult to build continuity with collectors or use
                  historical storytelling in branding. Without clear design
                  direction or mechanical credibility, modern Enicar watches
                  were largely ignored by serious watch communities, further
                  eroding the brand's value in the long term.
                </p>
                <p>
                  After going bankrupt after the Quartz crisis in 1987, the
                  brand became a zombie entity under new ownership, ignoring its
                  rich history of exploration and racing to produce generic,
                  mass-market dress watches that rely on the logo's recognition
                  rather than horological innovation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="font-eurostile-black text-lg tracking-[0.4em] uppercase text-red block">
                PROJECT AIM
              </span>
              <h2 className="font-eurostile-black text-xl md:text-2xl lg:text-4xl text-white uppercase leading-none">
                PREVENT THE BRAND FROM BEING OBSOLETE
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-16 h-[2px] bg-red/30 my-8"
            />

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <span className="font-eurostile-black text-xl md:text-2xl lg:text-3xl tracking-[0.4em] uppercase text-red/60 block">
                  AIM JUSTIFICATION
                </span>
                <ul className="space-y-4">
                  {[
                    "The design can't be replicated by other brands.",
                    "There are still past customers and a loyal fanbase.",
                    "There are seasoned watch collectors who are open to learn about the brand.",
                    "There are brands that are on the verge of becoming obsolete that might benefit from this project.",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red mt-3 shrink-0" />
                      <span className="font-light text-gray-300 text-lg leading-relaxed md:text-xl">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-4 pt-8"
              >
                <span className="font-eurostile-black text-lg tracking-[0.4em] uppercase text-red/60 block">
                  RESEARCH QUESTION
                </span>
                <p className="font-serif italic text-2xl md:text-3xl text-gray-300 leading-relaxed border-l-2 border-red/30 pl-6">
                  "How can archive-based, human-factors storytelling
                  reintroduce Enicar Sherpa to contemporary audiences and
                  measurably increase comprehension, engagement, and purchase
                  intent?"
                </p>
              </motion.div>

              <div className="space-y-4 pt-8">
                <span className="font-eurostile-black text-lg tracking-[0.4em] uppercase text-red/60 block">
                  TARGET AUDIENCES
                </span>
                <ul className="space-y-4">
                  {[
                    "Brand's fanbase",
                    "Seasoned collectors",
                    "Young collectors/enthusiasts",
                    "Other similar brands that went out of business during the Quartz crisis",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red mt-2 shrink-0" />
                      <span className="font-light text-gray-300 text-lg md:text-xl">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const SolutionBlock = () => {
  return (
    <div className="w-full bg-white text-black py-24 border-t border-b border-black/10 my-32">
      <div className="max-w-6xl mx-auto px-6">
        <header className="space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="font-eurostile-black text-xl md:text-2xl lg:text-4xl tracking-[0.4em] uppercase text-red text-center block">
              SOLUTION
            </span>
            <h2 className="font-serif italic text-2xl md:text-4xl lg:text-6xl max-w-4xl mx-auto text-center leading-tight">
              Presenting the brand's history through an exhibition that shows
              the important achievements and milestones of the brand.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-light text-gray-500 text-center text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mt-8"
          >
            Using the existing and the remaining materials of the former brand.
            Staying strictly to the former brand's personality and identity.
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-50 md:w-100 lg:w-150 h-[2px] bg-red/30 mx-auto my-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* FOR VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <span className="font-eurostile-black text-sm md:text-base lg:text-xl tracking-[0.4em] uppercase text-red block">
              FOR VISUAL
            </span>
            <div className="font-light text-gray-600 leading-relaxed text-lg md:text-xl lg:text-2xl space-y-4">
              <p>
                Printing archives of important events alongside with the
                products and description to emphasize the significance of the
                event. (Racing, mountain expedition, dive, sky)
              </p>
              <p>
                Concept wall explaining the problem and the history with
                prominent events, figures and products.
              </p>
            </div>
          </motion.div>

          {/* FOR PHYSICAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <span className="font-eurostile-black text-sm md:text-lg lg:text-xl tracking-[0.4em] uppercase text-red block">
              FOR PHYSICAL
            </span>
            <div className="font-light text-gray-600 leading-relaxed text-lg md:text-xl lg:text-2xl">
              <p>
                Display watches: <span className="font-bold">1 land</span>,{" "}
                <span className="font-bold">1 dive</span>,{" "}
                <span className="font-bold">1 racing</span>,{" "}
                <span className="font-bold">1 sky</span>
              </p>
            </div>
          </motion.div>

          {/* FOR DIGITAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <span className="font-eurostile-black text-sm md:text-lg lg:text-xl tracking-[0.4em] uppercase text-red block">
              FOR DIGITAL
            </span>
            <div className="font-light text-gray-600 leading-relaxed text-lg md:text-xl lg:text-2xl">
              <p>
                Instagram and Website that contains everything from the project
                (concept, design process, brand timeline, product collection
                and image library)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface CollectionCardProps {
  product: Product;
  index: number;
}

const CollectionCard = ({ product, index }: CollectionCardProps) => {
  const relatedEvents = product.timelineIds
    .map((id) => timelineData.find((item) => item.id === id))
    .filter((event): event is (typeof timelineData)[0] => !!event);

  const heroEvent = relatedEvents[0];
  const subEvents = relatedEvents.slice(1).slice(0, 2);

  const isEven = index % 2 === 0;

  const moodAccents = {
    LAND: "bg-yellow/[0.02]",
    RACING: "bg-red/[0.02]",
    DIVE: "bg-cyan/[0.02]",
    SKY: "bg-black/[0.02]",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className={`w-full py-24 md:py-32 rounded-3xl ${moodAccents[product.collection]} group border border-black/5`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex flex-col md:flex-row gap-16 md:gap-24 items-center ${
            !isEven ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Images */}
          <div className="flex-1 w-full space-y-4">
            <div
              className={`${
                heroEvent.images.length >= 2 ? "columns-2" : "columns-1"
              } gap-3 space-y-3`}
            >
              {heroEvent.images.slice(0, 3).map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="rounded-xl overflow-hidden border border-red/5 transition-all duration-700 grayscale group-hover:grayscale-0 hover:scale-[1.02] shadow-sm"
                >
                  <img
                    src={getImagePath(img)}
                    alt={heroEvent.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-10 relative">
            {/* Ghost Year */}
            <span className="absolute font-serif text-[10rem] md:text-[14rem] leading-none pointer-events-none select-none text-red/[0.05] -top-8 left-0 z-0">
              {heroEvent.year.substring(0, 4)}
            </span>

            <div className="relative z-10 space-y-8">
              {/* Collection Label */}
              <span className="font-eurostile-black text-lg md:text-2xl lg:text-3xl tracking-[0.4em] uppercase text-red block mb-2">
                {product.collection}
              </span>

              {/* Story Headline */}
              <h3 className="font-serif font-bold italic text-3xl md:text-6xl uppercase leading-[0.9] text-black">
                {heroEvent.title}
              </h3>

              {/* Archive Story Text */}
              <p className="font-light text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                {heroEvent.description}
              </p>

              {/* Sub Events */}
              {subEvents.length > 0 && (
                <div className="space-y-6 pt-4">
                  {subEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-2 border-red/20 pl-4 space-y-1"
                    >
                      <h4 className="font-eurostile-black text-sm md:text-base lg:text-lg tracking-[0.2em] text-red/60 uppercase">
                        {event.title}
                      </h4>
                      <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Model Tags */}
              <div className="flex flex-wrap gap-3 pt-6">
                {product.models.map((model) => (
                  <span
                    key={model}
                    className="inline-flex items-center gap-2 text-base md:text-lg lg:text-xl border border-red/20 px-3 py-1 rounded-full font-eurostile text-black/60 hover:border-red hover:text-red transition-colors duration-300 cursor-default"
                  >
                    {model}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 10 }}
                className="group flex items-center gap-2 text-red font-eurostile italic text-lg md:text-xl lg:text-2xl border-b border-red/30 hover:border-red transition-all duration-300 pt-8 pb-1"
              >
                Explore Reference Details{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-32 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* 1. SECTION HEADER */}
        <header className="text-center mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-eurostile-black text-xl md:text-2xl lg:text-3xl tracking-[0.4em] uppercase text-red block"
            >
              The Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-eurostile-black italic text-5xl md:text-8xl text-black leading-tight"
            >
              Four Tools.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-eurostile-black italic text-5xl md:text-8xl text-black leading-tight"
            >
              Four Domains.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-eurostile text-xl md:text-2xl lg:text-3xl text-black opacity-90 max-w-3xl mx-auto"
            >
              Each Sherpa was built for a specific extreme. Land, Racing, Dive,
              or Sky.
            </motion.p>
          </motion.div>
        </header>

        {/* 2. BRAND CONTEXT BLOCK */}
        <BrandContext />

        {/* 3. SOLUTION BLOCK */}
        <SolutionBlock />

        {/* 4. FOUR COLLECTION CARDS */}
        <div className="space-y-64 md:space-y-96">
          {productsData.map((product, i) => (
            <CollectionCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* 5. SECTION FOOTER */}
        <footer className="mt-32 pt-16 border-t border-black/10 text-center space-y-8">
          <div className="w-16 h-[2px] bg-red/30 mx-auto" />

          <p className="font-yellowtail text-xl md:text-3xl lg:text-5xl text-black/30 italic">
            Each watch was a tool. Each tool had a story.
          </p>

          <div className="text-gray-600 text-xs md:text-sm lg:text-base uppercase tracking-[0.5em] font-sans pb-4">
            © 2026 ENICAR CHRONICLE • SWISS PRECISION SINCE 1913
          </div>
        </footer>
      </div>
    </section>
  );
};
