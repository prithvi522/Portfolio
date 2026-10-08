import "./Skills.css";
import SkillSphere from "../../scene/SkillSphere";

export default function Skills() {
  return (
    <section className="skills-section">

      
      {/* OVERLAY */}
      <div className="skills-overlay" />

      {/* CONTENT */}
      <div className="skills-content">

        <div className="skills-label">
          MY EXPERTISE
        </div>

        <h2 className="skills-title">
          <span className="skills-first">
            Skills &
          </span>

          <span className="skills-second">
            Technologies
          </span>
        </h2>

        <p className="skills-description">
          I build modern digital experiences using
          frontend, backend, database, and AI technologies.
        </p>

        <div className="skills-line">
          <span />
        </div>

      </div>

    </section>
  );
}