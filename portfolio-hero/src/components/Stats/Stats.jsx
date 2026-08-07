import CountUp from "react-countup";

import "./Stats.css";

const stats = [
  {
    value: 3,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 25,
    suffix: "+",
    label: "Projects Built",
  },
  {
    value: 12,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 8,
    suffix: "+",
    label: "Tech Stacks",
  },
];

function Stats() {
  return (
    <section className="stats" id="stats">
      <div className="stats-card">
        {stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong>
              <CountUp end={item.value} duration={2.4} enableScrollSpy scrollSpyOnce />
              {item.suffix}
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
