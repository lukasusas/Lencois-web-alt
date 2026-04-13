import Link from "next/link";

import { Reveal } from "@/components/site/Reveal";
import type { LotPlanPage } from "@/content/types";

import { LotPlanViewer } from "./LotPlanViewer";
import styles from "./LotPlanPageView.module.css";

type LotPlanPageViewProps = {
  page: LotPlanPage;
};

export function LotPlanPageView({ page }: LotPlanPageViewProps) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <section className={styles.heroGrid}>
          <Reveal className={styles.hero}>
            <span className={styles.eyebrow}>{page.hero.eyebrow}</span>
            <h1 className={styles.title}>{page.hero.title}</h1>
            <p className={styles.intro}>{page.hero.intro}</p>
            <div className={styles.actions}>
              <Link href={page.cta.href} className="buttonPrimary">
                {page.cta.label}
              </Link>
              <Link href="/#lotes" className="buttonSecondary">
                Voltar ao site
              </Link>
            </div>
          </Reveal>

          <Reveal className={styles.viewer} delay={0.08}>
            <LotPlanViewer asset={page.hero.media} title={page.hero.title} />
          </Reveal>
        </section>

        <section className={styles.notes} aria-label="Leitura da planta">
          {page.body.map((paragraph) => (
            <div key={paragraph} className={styles.note}>
              <p className={styles.noteBody}>{paragraph}</p>
            </div>
          ))}
          <div className={styles.note}>
            <p className={styles.noteTitle}>Observação</p>
            <p className={styles.noteBody}>{page.note}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
