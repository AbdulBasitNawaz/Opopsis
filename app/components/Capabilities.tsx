"use client";

import styles from "./Capabilities.module.css";

interface CapabilityItem {
  num: string;
  title: string;
  description: string;
}

const capabilities: CapabilityItem[] = [
  {
    num: "01",
    title: "Web Applications",
    description: "Complex platforms, dashboards, and business applications built for performance."
  },
  {
    num: "02",
    title: "Mobile Products",
    description: "Thoughtful, native mobile experiences built for real-world reliability."
  },
  {
    num: "03",
    title: "SaaS Platforms",
    description: "Scalable software architectures designed from MVP creation to growth stage."
  },
  {
    num: "04",
    title: "AI & Intelligent Systems",
    description: "AI-powered products, custom model integrations, and intelligent agentic workflows."
  },
  {
    num: "05",
    title: "Automation",
    description: "Custom software integrations that eliminate repetitive work and connect disparate systems."
  },
  {
    num: "06",
    title: "Product Engineering",
    description: "Technical architecture designs and engineering systems built for long-term endurance."
  }
];

export default function Capabilities() {
  return (
    <section className={styles.capabilitiesSection} id="services">
      <div className={styles.grid}>
        {/* Left Side Position/Content */}
        <div className={styles.leftColumn}>
          <span className={styles.eyebrow}>What We Build</span>
          <h2 className={styles.headline}>
            Digital products built to move businesses forward.
          </h2>
          <p className={styles.description}>
            From web applications and SaaS platforms to AI-powered systems and intelligent automation, Opopsis turns complex ideas into reliable software.
          </p>
        </div>

        {/* Right Side Capability List */}
        <div className={styles.capabilitiesList}>
          {capabilities.map((item, index) => (
            <a
              key={index}
              href="#contact"
              className={styles.capabilityRow}
              role="button"
              tabIndex={0}
              aria-label={`Capability: ${item.title}. ${item.description}`}
            >
              <div className={styles.rowHeader}>
                <div className={styles.titleBlock}>
                  <span className={styles.number}>{item.num}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </div>
              <p className={styles.desc}>{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
