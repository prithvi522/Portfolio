import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";

function App() {
  return (
    <>
      <Navbar />

      <main className="portfolio">

        {/* =========================================
            HERO — STAYS BEHIND
        ========================================= */}
        <div className="hero-sticky">
          <Hero />
        </div>


        {/* =========================================
            SKILLS — SLIDES OVER HERO
        ========================================= */}
        <div className="skills-overlap">
          <Skills />
        </div>


        {/* =========================================
            FUTURE SECTIONS
        ========================================= */}

        {/* 
        <div className="section-overlap">
          <Projects />
        </div>
        */}

      </main>
    </>
  );
}

export default App;