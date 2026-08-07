import "./Navbar.css";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container navbar-container">
        <a href="#" className="logo">
          <span className="logo-white">PG</span>
          <span className="logo-dot">.</span>
        </a>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          {navLinks.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={index === 0 ? "active" : ""}
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="cta-btn">
          Let's Work Together
          <ArrowRight size={18} />
        </button>

        <button
          className="mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  );
}

export default Navbar;