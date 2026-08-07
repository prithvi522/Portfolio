import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import Scene from "../../scene/Scene";
import "./Hero.css";

const socialLinks = [
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <FaGithub />,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <FaTwitter />,
  },
  {
    href: "mailto:example@gmail.com",
    label: "Email",
    icon: <FaEnvelope />,
  },
];

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -42 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-kicker">HELLO</p>

          <h1 className="hero-title">
            Prithviraj
            <span>Gavali</span>
          </h1>

          <div className="hero-rule" />

          <h2 className="hero-role">
            Frontend Developer
            <span> & Creative Technologist</span>
          </h2>

          <p className="hero-copy">
            I craft exceptional digital experiences with clean code, beautiful
            user interfaces, smooth animations, immersive web experiences and
            modern technologies.
          </p>

          <div className="hero-socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 36, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Scene />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
