import Link from "next/link";

import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { Reveal } from "@/components/site/Reveal";
import { SectionBlockView } from "@/components/site/templates/SectionBlockView";
import type { StructuredPage } from "@/content/types";

import styles from "./PageTemplate.module.css";

type StructuredPageTemplateProps = {
  page: StructuredPage;
};

export function StructuredPageTemplate({ page }: StructuredPageTemplateProps) {
  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <span className="sectionEyebrow">{page.hero.eyebrow}</span>
              <h1 className={styles.heroTitle}>{page.hero.title}</h1>
              <p className={styles.heroIntro}>{page.hero.intro}</p>
            </Reveal>

            <Reveal className={styles.heroMedia} delay={0.08}>
              <ParallaxMedia asset={page.hero.media} sizes="(max-width: 980px) 100vw, 52vw" />
            </Reveal>
          </div>

          <Reveal className={styles.highlights}>
            {page.highlights.map((highlight) => (
              <div key={highlight.label} className={styles.highlight}>
                <span className={styles.highlightLabel}>{highlight.label}</span>
                <strong className={styles.highlightValue}>{highlight.value}</strong>
              </div>
            ))}
          </Reveal>
        </section>

        <div className={styles.sections}>
          {page.sections.map((section) => (
            <SectionBlockView key={section.id} block={section} />
          ))}
        </div>

        <Reveal className={styles.pageEnd}>
          <p>Esta estrutura foi desenhada para receber conteúdo novo sem alterar o sistema visual.</p>
          <div>
            <Link href={page.cta.href} className="buttonPrimary">
              {page.cta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
