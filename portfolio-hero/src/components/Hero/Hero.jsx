import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

import Scene from "../../scene/Scene";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      {/* =========================================
          THREE.JS BACKGROUND
      ========================================= */}
      <div className="hero-scene">
        <Scene />
      </div>


      {/* =========================================
          DARK LEFT OVERLAY
      ========================================= */}
      <div className="hero-left-glow" />


      {/* =========================================
          HERO CONTENT
      ========================================= */}
      <div className="hero-content">

        {/* Greeting */}
        <div className="hero-greeting">
          HELLO, I'M
        </div>


        {/* Name */}
        <h1 className="hero-name">

          <span className="hero-name-white">
            Prithviraj
          </span>

          <span className="hero-name-gradient">
            Gavali
          </span>

        </h1>


        {/* Divider */}
        <div className="hero-divider">
          <span />
        </div>


        {/* Role */}
        <h2 className="hero-role">
          Frontend Developer &amp; Creative Technologist
        </h2>


        {/* Description */}
        <p className="hero-description">
          I craft exceptional digital experiences with clean code,
          smooth animations, and <span>modern design.</span>
        </p>


        {/* Social Icons */}
        <div className="hero-socials">

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>


          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>


          <a
            href="#"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>


          <a
            href="mailto:your@email.com"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>

        </div>

      </div>


      {/* =========================================
          SCROLL INDICATOR
      ========================================= */}
      <div className="hero-scroll">

        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>

        <span>SCROLL</span>
        <span>DOWN</span>

      </div>

    </section>
  );
}