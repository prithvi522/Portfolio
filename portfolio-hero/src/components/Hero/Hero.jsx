import { motion, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

import "./Hero.css";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const heroSequence = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.08 },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={`${import.meta.env.BASE_URL}portfolio-hero.mp4`} type="video/mp4" />
      </video>

      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-atmosphere" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={heroSequence}
        initial={initial}
        animate="visible"
      >
        <motion.div className="hero-greeting" variants={reveal}>
          HELLO, I'M
        </motion.div>

        <motion.h1 className="hero-name" id="hero-title" variants={reveal}>
          <span className="hero-name-white">Prithviraj</span>
          <span className="hero-name-gradient">Gavali</span>
        </motion.h1>

        <motion.div className="hero-divider" variants={reveal} aria-hidden="true">
          <span />
        </motion.div>

        <motion.h2 className="hero-role" variants={reveal}>
          Frontend Developer &amp; Creative Technologist
        </motion.h2>

        <motion.p className="hero-description" variants={reveal}>
          I craft exceptional digital experiences with clean code,
          smooth animations, and <span>modern design.</span>
        </motion.p>

        <motion.div className="hero-socials" variants={reveal}>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="mailto:your@email.com" aria-label="Email"><FaEnvelope /></a>
        </motion.div>
      </motion.div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line"><div className="scroll-dot" /></div>
        <span>SCROLL</span>
        <span>DOWN</span>
      </div>
    </section>
  );
}
