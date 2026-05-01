import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logos/Logo BIGG@4x.png";

type NavLink = {
  name: string;
  href: string;
  onClick?: () => void;
};

const navLinks: NavLink[] = [
  { name: "HOME", href: "/", onClick: () => window.scrollTo(0, 0) },
  { name: "INTRODUCTION", href: "/show-introduction" },
  { name: "TIMELINE", href: "/phase/1" },
  { name: "PRODUCTS", href: "/all-watches" },
  { name: "SPONSORS", href: "/sponsors" },
  { name: "CONTACT", href: "/#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-[9999] bg-black border-b border-white/10 md:bg-black/80 backdrop-blur-md"
      style={{ zIndex: 9999, top: 0, left: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-16 md:h-24 object-contain invert"
          />
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                to={link.href}
                onClick={link.onClick}
                className="text-2xl font-eurostile tracking-wide text-red hover:text-yellow transition-colors duration-300"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          className="md:hidden text-red hover:text-yellow transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 px-6 py-6 space-y-4 text-center"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => {
                setIsOpen(false);
                link.onClick?.();
              }}
              className="block text-lg text-red hover:text-yellow transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
