import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { Reveal } from "@/components/site/Reveal";
import type { SectionBlock } from "@/content/types";

import styles from "./PageTemplate.module.css";

type SectionBlockViewProps = {
  block: SectionBlock;
};

export function SectionBlockView({ block }: SectionBlockViewProps) {
  if (block.type === "essay") {
    return (
      <section className={styles.section}>
        <div
          className={styles.sectionEssay}
          data-media-position={block.mediaPosition ?? "end"}
        >
          <Reveal className={styles.sectionText}>
            <span className="sectionEyebrow">{block.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{block.title}</h2>
            <div className={styles.paragraphs}>
              {block.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {block.quote ? <p className={styles.quote}>{block.quote}</p> : null}
          </Reveal>

          <Reveal className={styles.sectionMediaWrap} delay={0.08}>
            <ParallaxMedia asset={block.media} sizes="(max-width: 980px) 100vw, 45vw" />
          </Reveal>
        </div>
      </section>
    );
  }

  if (block.type === "facts") {
    return (
      <section className={styles.section}>
        <div className={styles.sectionFacts}>
          <Reveal className={styles.sectionText}>
            <span className="sectionEyebrow">{block.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{block.title}</h2>
            <p className={styles.sectionIntro}>{block.intro}</p>
            <dl className={styles.factsGrid}>
              {block.items.map((item) => (
                <div key={item.label} className={styles.factRow}>
                  <dt className={styles.factLabel}>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {block.media ? (
            <Reveal className={styles.sectionMediaWrap} delay={0.08}>
              <ParallaxMedia asset={block.media} sizes="(max-width: 980px) 100vw, 45vw" />
            </Reveal>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionFacts}>
        <Reveal className={styles.sectionText}>
          <span className="sectionEyebrow">{block.eyebrow}</span>
          <h2 className={styles.sectionTitle}>{block.title}</h2>
          <p className={styles.sectionIntro}>{block.intro}</p>
          <div className={styles.featureList}>
            {block.items.map((item) => (
              <div key={item.title} className={styles.featureItem}>
                <strong className={styles.featureTitle}>{item.title}</strong>
                <p className={styles.featureBody}>{item.body}</p>
                {item.meta ? <p className={styles.featureMeta}>{item.meta}</p> : null}
              </div>
            ))}
          </div>
        </Reveal>

        {block.media ? (
          <Reveal className={styles.sectionMediaWrap} delay={0.08}>
            <ParallaxMedia asset={block.media} sizes="(max-width: 980px) 100vw, 45vw" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
