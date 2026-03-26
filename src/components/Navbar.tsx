import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logos/Logo BIGG@4x.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Introduction", href: "/#intro" },
  { name: "Timeline", href: "/phase/1" },
  { name: "Products", href: "/products#products" },
  { name: "Contact", href: "/products#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-2 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <img src={logo} alt="Logo" className="h-24" />
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
                className="text-2xl font-eurostile tracking-wide hover:text-red transition-colors duration-300"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-black/10 px-6 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg hover:text-cyan transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
