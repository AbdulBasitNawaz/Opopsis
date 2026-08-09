"use client";

import GeometricCanvas from "./GeometricCanvas";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Interactive Engineering Canvas */}
      <GeometricCanvas />

      {/* Hero Content */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.headline}>
          Software,<br />
          engineered for<br />
          <span className={styles.headlineAccent}>what's next</span>
        </h1>

        <p className={styles.description}>
          We design and build digital products, software systems, and intelligent experiences for ambitious businesses.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={`${styles.primaryBtn} transition-all`}>
            Start a project <span className={styles.btnArrow}>→</span>
          </a>
          <a href="#work" className={styles.secondaryBtn}>
            Explore our work
          </a>
        </div>
      </div>
    </section>
  );
}
