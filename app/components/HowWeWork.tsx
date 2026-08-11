"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HowWeWork.module.css";

interface Stage {
  num: string;
  title: string;
  description: string;
}

const stages: Stage[] = [
  {
    num: "01",
    title: "Discover",
    description: "Understand the problem, users, business objectives, and technical requirements before writing unnecessary code."
  },
  {
    num: "02",
    title: "Design",
    description: "Shape the product experience, system architecture, and technical direction around what actually needs to be built."
  },
  {
    num: "03",
    title: "Build",
    description: "Engineer the product with clean architecture, thoughtful interfaces, and the technology required to make it reliable."
  },
  {
    num: "04",
    title: "Scale",
    description: "Launch, learn, and continuously improve the product as users, requirements, and opportunities evolve."
  }
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const visual = visualRef.current;
    const timeline = timelineRef.current;
    const lineProgress = lineProgressRef.current;

    if (!section || !visual || !timeline || !lineProgress) return;

    const nodes = timeline.querySelectorAll(`.${styles.stageNode}`);

    const updateLinePositions = () => {
      const firstDot = nodes[0]?.querySelector(`.${styles.stageNodeDot}`) as HTMLElement;
      const lastDot = nodes[nodes.length - 1]?.querySelector(`.${styles.stageNodeDot}`) as HTMLElement;
      if (firstDot && lastDot) {
        const firstDotRect = firstDot.getBoundingClientRect();
        const lastDotRect = lastDot.getBoundingClientRect();
        const containerRect = timeline.getBoundingClientRect();

        const topOffset = firstDotRect.top - containerRect.top + (firstDotRect.height / 2);
        const bottomOffset = containerRect.bottom - lastDotRect.top - (lastDotRect.height / 2);

        const line = lineProgress.parentElement;
        if (line) {
          line.style.top = `${topOffset}px`;
          line.style.bottom = `${bottomOffset}px`;
        }
      }
    };

    updateLinePositions();
    window.addEventListener("resize", updateLinePositions);

    const ctx = gsap.context(() => {
      // 1. Animate the vertical timeline line drawing down on scroll
      gsap.fromTo(
        lineProgress,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.3,
            onUpdate: (self) => {
              const line = lineProgress.parentElement;
              if (line) {
                if (self.progress > 0.95) {
                  line.classList.add(styles.timelineLineActive);
                } else {
                  line.classList.remove(styles.timelineLineActive);
                }
              }
            }
          },
        }
      );

      // 2. Animate the left-side visual container entry
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onEnter: () => {
          visual.classList.add(styles.visualContainerActive);
        },
        onLeaveBack: () => {
          visual.classList.remove(styles.visualContainerActive);
        },
      });

      // 3. Stagger-reveal process nodes as they scroll into view
      nodes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 78%",
          onEnter: () => {
            node.classList.add(styles.stageNodeActive);
            const dot = node.querySelector(`.${styles.stageNodeDot}`);
            if (dot) dot.classList.add(styles.nodeDotActive);
          },
          onLeaveBack: () => {
            node.classList.remove(styles.stageNodeActive);
            const dot = node.querySelector(`.${styles.stageNodeDot}`);
            if (dot) dot.classList.remove(styles.nodeDotActive);
          },
        });
      });
    }, section);

    return () => {
      window.removeEventListener("resize", updateLinePositions);
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.howWeWorkSection} id="approach" ref={sectionRef}>
      <div className={`${styles.grid} globalContainer`}>
        {/* Left Column Sticky Text & Abstract Visual Asset */}
        <div className={styles.leftColumn}>
          <span className={styles.eyebrow}>How We Work</span>
          <h2 className={styles.headline}>From idea to impact.</h2>
          <p className={styles.description}>
            Every product starts with a problem worth solving. We bring product thinking, design and engineering together to turn that problem into software built for the real world.
          </p>

          {/* Abstract System Animation Asset */}
          <div className={styles.visualContainer} ref={visualRef} aria-hidden="true">
            <div className={styles.visualGrid} />
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "relative", zIndex: 2 }}
            >
              {/* Central Concentric Architectural Rings */}
              <circle cx="200" cy="120" r="70" stroke="rgba(39, 39, 42, 0.3)" strokeWidth="1" />
              <circle cx="200" cy="120" r="72" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 9" strokeOpacity="0.5" />
              <circle cx="200" cy="120" r="35" stroke="rgba(39, 39, 42, 0.4)" strokeWidth="1" />
              
              {/* Crosshair Lines */}
              <line x1="200" y1="20" x2="200" y2="220" stroke="rgba(39, 39, 42, 0.25)" strokeWidth="1" />
              <line x1="80" y1="120" x2="320" y2="120" stroke="rgba(39, 39, 42, 0.25)" strokeWidth="1" />
              
              {/* Outer Diagonal Connecting Lines */}
              <line x1="120" y1="40" x2="280" y2="200" stroke="rgba(108, 99, 255, 0.15)" strokeWidth="1" />
              <line x1="280" y1="40" x2="120" y2="200" stroke="rgba(108, 99, 255, 0.15)" strokeWidth="1" />

              {/* Data Node Indicators (Interactive Precision Nodes) */}
              <circle cx="200" cy="50" r="3" fill="var(--accent)" />
              <circle cx="200" cy="190" r="3" fill="var(--accent)" />
              <circle cx="130" cy="120" r="3" fill="#A1A1AA" />
              <circle cx="270" cy="120" r="3" fill="#A1A1AA" />

              {/* Bounding box outline */}
              <rect x="50" y="30" width="300" height="180" stroke="rgba(39, 39, 42, 0.2)" strokeWidth="1" />
              <rect x="46" y="26" width="308" height="188" stroke="rgba(108, 99, 255, 0.1)" strokeWidth="1" strokeDasharray="2 12" />

              {/* Micro technical labels in corners */}
              <text x="56" y="44" fill="rgba(161, 161, 170, 0.4)" fontSize="7" fontFamily="var(--font-logo)" letterSpacing="0.05em">OPOPSIS.SYS_NODE</text>
              <text x="295" y="44" fill="rgba(161, 161, 170, 0.4)" fontSize="7" fontFamily="var(--font-logo)" letterSpacing="0.05em">v1.0.4_B</text>
              <text x="56" y="202" fill="rgba(161, 161, 170, 0.4)" fontSize="7" fontFamily="var(--font-logo)" letterSpacing="0.05em">COORDS // 47.92</text>
              <text x="280" y="202" fill="rgba(108, 99, 255, 0.5)" fontSize="7" fontFamily="var(--font-logo)" letterSpacing="0.05em">SYS_STABLE</text>
            </svg>
          </div>
        </div>

        {/* Right Column Process Timeline */}
        <div className={styles.timelineContainer} ref={timelineRef}>
          {/* Vertical progress line */}
          <div className={styles.timelineLine}>
            <div className={styles.timelineLineProgress} ref={lineProgressRef} />
          </div>

          {stages.map((stage, index) => (
            <div
              key={index}
              className={styles.stageNode}
              role="group"
              aria-label={`Stage ${stage.num}: ${stage.title}`}
            >
              {/* Dot indicator or feedback loop cycle */}
              {index === 3 ? (
                <div className={`${styles.loopContainer} ${styles.stageNodeDot}`}>
                  <svg className={styles.loopSvg} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="12" stroke="var(--border)" strokeWidth="2" strokeDasharray="2 3" />
                    <path d="M 8 20 L 5 16 L 11 16 Z" fill="var(--border)" />
                  </svg>
                </div>
              ) : (
                <div className={`${styles.nodeDot} ${styles.stageNodeDot}`} />
              )}

              <div className={styles.stageHeader}>
                <span className={styles.stageNum}>{stage.num}</span>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
              </div>
              <p className={styles.stageDesc}>{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
