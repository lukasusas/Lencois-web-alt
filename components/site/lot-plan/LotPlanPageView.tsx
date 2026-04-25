import Link from "next/link";

import { Reveal } from "@/components/site/Reveal";
import { mediaAssets } from "@/content/media";
import type { CTA, LotPlanPage } from "@/content/types";

import { LotPlanViewer } from "./LotPlanViewer";
import styles from "./LotPlanPageView.module.css";

type LotPlanPageViewProps = {
  page: LotPlanPage;
};

function CtaLink({ cta, className }: { cta: CTA; className: string }) {
  return (
    <Link
      href={cta.href}
      className={className}
      target={cta.external ? "_blank" : undefined}
      rel={cta.external ? "noreferrer" : undefined}
    >
      {cta.label}
    </Link>
  );
}

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
              <CtaLink cta={page.cta} className="buttonPrimary" />
              <Link href="/#lotes" className="buttonSecondary">
                Voltar ao site
              </Link>
            </div>
          </Reveal>

          <Reveal className={styles.viewer} delay={0.08}>
            <LotPlanViewer asset={page.hero.media} fullAsset={mediaAssets.lotsPlanSvg} title={page.hero.title} />
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

        <section className={styles.guidance} aria-label="Como escolher um lote">
          <Reveal className={styles.guidanceCopy}>
            <span className={styles.eyebrow}>{page.guidance.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{page.guidance.title}</h2>
            <p className={styles.intro}>{page.guidance.intro}</p>
          </Reveal>
          <div className={styles.guidanceGrid}>
            {page.guidance.items.map((item, index) => (
              <Reveal key={item.label} className={styles.guidanceItem} delay={index * 0.04}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.conversion} aria-label="Consultar disponibilidade">
          <Reveal className={styles.conversionCopy}>
            <h2 className={styles.sectionTitle}>{page.conversion.title}</h2>
            <p>{page.conversion.body}</p>
            <div className={styles.actions}>
              <CtaLink cta={page.conversion.cta} className="buttonPrimary" />
              <CtaLink cta={page.conversion.secondaryCta} className="buttonSecondary" />
            </div>
          </Reveal>
        </section>

        <section className={styles.brokerActions} aria-label="Ações para corretores">
          {page.brokerActions.map((action, index) => (
            <Reveal key={action.title} className={styles.actionCard} delay={index * 0.04}>
              <h3>{action.title}</h3>
              <p>{action.body}</p>
              <CtaLink cta={action.cta} className="buttonSecondary" />
            </Reveal>
          ))}
        </section>
      </div>
    </div>
  );
}
