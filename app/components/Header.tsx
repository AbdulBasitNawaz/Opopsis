"use client";

import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Brand Logo */}
      <a href="#" className={styles.logo} onClick={closeMenu}>
        Opopsis
      </a>

      {/* Desktop Navigation */}
      <nav className={styles.nav}>
        <a href="#work" className={styles.navLink}>Work</a>
        <a href="#services" className={styles.navLink}>Services</a>
        <a href="#approach" className={styles.navLink}>Approach</a>
        <a href="#about" className={styles.navLink}>About</a>
        <a href="#contact" className={`${styles.cta} transition-all`}>
          Let's talk <span className={styles.ctaIcon}>→</span>
        </a>
      </nav>

      {/* Mobile Burger Toggle */}
      <button 
        className={styles.mobileToggle} 
        onClick={toggleMenu} 
        aria-label="Toggle Navigation Menu"
        aria-expanded={isMenuOpen}
      >
        <div className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ""}`} />
      </button>

      {/* Mobile Fullscreen Drawer */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.mobileDrawerOpen : ""}`}>
        <a href="#work" className={styles.mobileNavLink} onClick={closeMenu}>Work</a>
        <a href="#services" className={styles.mobileNavLink} onClick={closeMenu}>Services</a>
        <a href="#approach" className={styles.mobileNavLink} onClick={closeMenu}>Approach</a>
        <a href="#about" className={styles.mobileNavLink} onClick={closeMenu}>About</a>
        <a href="#contact" className={`${styles.cta} ${styles.mobileCta}`} onClick={closeMenu}>
          Let's talk <span className={styles.ctaIcon}>→</span>
        </a>
      </div>
    </header>
  );
}
