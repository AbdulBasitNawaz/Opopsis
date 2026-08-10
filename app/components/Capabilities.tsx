"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const list = listRef.current;
    const inner = innerRef.current;

    if (!section || !list || !inner) return;

    const rows = inner.querySelectorAll(`.${styles.capabilityRow}`);
    const totalStates = capabilities.length - 2; // 4 states
    let stateIndex = 0;

    const getRowHeight = () => {
      const firstRow = rows[0] as HTMLElement;
      return firstRow ? firstRow.getBoundingClientRect().height : 0;
    };

    const updateViewportHeight = () => {
      const rowHeight = getRowHeight();
      list.style.height = `${rowHeight * 3}px`;
      gsap.set(inner, { y: -stateIndex * rowHeight });
    };

    // Initialize layout heights
    updateViewportHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateViewportHeight();
    });
    resizeObserver.observe(inner);

    const goToState = (index: number) => {
      const rowHeight = getRowHeight();
      gsap.to(inner, {
        y: -index * rowHeight,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });

      rows.forEach((row, i) => {
        if (i === index) {
          row.classList.add(styles.activeRow);
        } else {
          row.classList.remove(styles.activeRow);
        }
      });
    };

    const mm = gsap.matchMedia();

    // Standard ScrollTrigger Snapping on desktop viewports
    mm.add("(min-width: 951px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top+=80",
        end: `+=${totalStates * 20}%`, // Snappy scroll duration
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        snap: {
          snapTo: 1 / (totalStates - 1),
          duration: { min: 0.2, max: 0.4 },
          delay: 0.05,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          stateIndex = Math.min(
            Math.floor(progress * totalStates),
            totalStates - 1
          );

          goToState(stateIndex);
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => {
      resizeObserver.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section className={styles.capabilitiesSection} id="services" ref={sectionRef}>
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

        {/* Right Side Capability Viewport Mask */}
        <div className={styles.capabilitiesList} ref={listRef}>
          <div className={styles.innerList} ref={innerRef}>
            {capabilities.map((item, index) => (
              <a
                key={index}
                href="#contact"
                className={`${styles.capabilityRow} ${index === 0 ? styles.activeRow : ""}`}
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
      </div>
    </section>
  );
}
