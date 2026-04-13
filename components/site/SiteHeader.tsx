"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { mediaAssets } from "@/content/media";
import type { NavItem } from "@/content/types";

import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  nav: NavItem[];
  lotPlanHref: string;
};

export function SiteHeader({ nav, lotPlanHref }: SiteHeaderProps) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Lençóis Condomínio de Lotes"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={mediaAssets.logoWordmarkDark.src}
            alt={mediaAssets.logoWordmarkDark.alt}
            width={mediaAssets.logoWordmarkDark.width}
            height={mediaAssets.logoWordmarkDark.height}
            className={styles.wordmark}
            priority
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href={lotPlanHref} className={`buttonSecondary ${styles.desktopCta}`}>
            Planta dos lotes
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-site-nav"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="srOnly">Abrir menu</span>
            <span className={styles.toggleLine} />
            <span className={styles.toggleLine} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            id="mobile-site-nav"
            className={styles.mobilePanel}
            aria-label="Navegação móvel"
            initial={reduceMotion ? false : { opacity: 0, y: -16 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                {item.description ? <small>{item.description}</small> : null}
              </Link>
            ))}
            <Link
              href={lotPlanHref}
              className={`buttonPrimary ${styles.mobileCta}`}
              onClick={() => setIsOpen(false)}
            >
              Planta dos lotes
            </Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
