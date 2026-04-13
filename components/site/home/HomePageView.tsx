import Image from "next/image";
import Link from "next/link";

import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { Reveal } from "@/components/site/Reveal";
import { mediaAssets } from "@/content/media";
import type { HomePage } from "@/content/types";

import styles from "./HomePageView.module.css";

type HomePageViewProps = {
  page: HomePage;
};

export function HomePageView({ page }: HomePageViewProps) {
  return (
    <div className={styles.page}>
      <section className={styles.hero} id="inicio">
        <div className={styles.heroMedia}>
          <Image
            src={page.hero.media.src}
            alt={page.hero.media.alt}
            fill
            sizes="100vw"
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroShade} />

        <div className={styles.heroInner}>
          <Reveal className={styles.heroLead}>
            <Image
              src={mediaAssets.logoMarkLight.src}
              alt=""
              width={mediaAssets.logoMarkLight.width}
              height={mediaAssets.logoMarkLight.height}
              className={styles.heroMark}
              aria-hidden="true"
              priority
            />
            <span className={`${styles.heroEyebrow} sectionEyebrow`}>{page.hero.eyebrow}</span>
            <h1 className={styles.heroTitle}>{page.hero.headline}</h1>
            <p className={styles.heroBody}>{page.hero.subheadline}</p>
            <div className={styles.heroActions}>
              <Link href={page.hero.primaryCta.href} className="buttonPrimary">
                {page.hero.primaryCta.label}
              </Link>
              <Link href={page.hero.secondaryCta.href} className="buttonSecondary">
                {page.hero.secondaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal className={styles.heroMeta} delay={0.12}>
            <p>{page.hero.location}</p>
            <span>Lagoa natural · dunas · lotes privativos</span>
          </Reveal>
        </div>
      </section>

      <div className={styles.sectionShell}>
        <section className={styles.features} id="features">
          <Reveal className={styles.sectionHeader}>
            <span className="sectionEyebrow">{page.features.eyebrow}</span>
            <div className={styles.sectionHeaderCopy}>
              <h2 className={styles.sectionTitle}>{page.features.title}</h2>
              <p className={styles.sectionIntro}>{page.features.intro}</p>
            </div>
          </Reveal>

          <div className={styles.featureRows}>
            {page.features.items.map((item, index) => (
              <article key={item.id} className={styles.featureRow} data-align={item.align}>
                <Reveal className={styles.featureText} delay={index * 0.04}>
                  <span className="sectionEyebrow">{item.eyebrow}</span>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                  <div className={styles.paragraphStack}>
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>

                <Reveal className={styles.featureMedia} delay={0.08 + index * 0.04}>
                  <ParallaxMedia
                    asset={item.media}
                    sizes="(max-width: 980px) 100vw, 48vw"
                    ratio={item.ratio}
                  />
                </Reveal>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta} id="cta">
          <Reveal className={styles.ctaCopy}>
            <span className="sectionEyebrow">{page.cta.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{page.cta.title}</h2>
            <p className={styles.ctaBody}>{page.cta.body}</p>
            <div className={styles.heroActions}>
              <Link href={page.cta.primaryCta.href} className="buttonPrimary">
                {page.cta.primaryCta.label}
              </Link>
              <Link href={page.cta.secondaryCta.href} className="buttonSecondary">
                {page.cta.secondaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal className={styles.ctaMedia} delay={0.08}>
            <ParallaxMedia asset={page.cta.media} sizes="(max-width: 980px) 100vw, 52vw" ratio="2744 / 1920" />
          </Reveal>
        </section>

        <section className={styles.location} id="location">
          <Reveal className={styles.locationIntro}>
            <span className="sectionEyebrow">{page.locationSection.eyebrow}</span>
            <div className={styles.sectionHeaderCopy}>
              <h2 className={styles.sectionTitle}>{page.locationSection.title}</h2>
              <div className={styles.paragraphStack}>
                {page.locationSection.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className={styles.locationGrid}>
            {page.locationSection.items.map((item, index) => (
              <Reveal key={item.label} className={styles.locationCard} delay={index * 0.08}>
                <ParallaxMedia
                  asset={item.media}
                  className={styles.locationMedia}
                  sizes="(max-width: 980px) 100vw, 50vw"
                />
                <span className={styles.locationLabel}>{item.label}</span>
              </Reveal>
            ))}
          </div>

          <p className={styles.locationCaption}>{page.locationSection.caption}</p>
        </section>

        <section className={styles.lotPlan} id="lotes">
          <Reveal className={styles.lotPlanCopy}>
            <span className="sectionEyebrow">{page.lotPlanSection.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{page.lotPlanSection.title}</h2>
            <div className={styles.paragraphStack}>
              {page.lotPlanSection.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className={styles.caption}>{page.lotPlanSection.caption}</p>
            <div>
              <Link href={page.lotPlanSection.primaryCta.href} className="buttonPrimary">
                {page.lotPlanSection.primaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal className={styles.lotPlanFigure} delay={0.08}>
            <Link
              href={page.lotPlanSection.primaryCta.href}
              className={styles.lotPlanLink}
              aria-label={page.lotPlanSection.primaryCta.label}
            >
              <ParallaxMedia
                asset={page.lotPlanSection.media}
                sizes="(max-width: 980px) 100vw, 100vw"
                ratio="8845 / 2912"
              />
              <span className={styles.lotPlanBadge}>Abrir planta completa</span>
            </Link>
          </Reveal>
        </section>

        <section className={styles.villas} id="villas">
          <div className={styles.villasMeta}>
            <Reveal className={styles.villasCopy}>
              <span className="sectionEyebrow">{page.villas.eyebrow}</span>
              <h2 className={styles.sectionTitle}>{page.villas.title}</h2>
            </Reveal>
            <Reveal className={styles.villasBody} delay={0.06}>
              <div className={styles.paragraphStack}>
                {page.villas.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className={styles.villasCaption}>{page.villas.caption}</p>
            </Reveal>
          </div>

          <div className={styles.villasGrid}>
            {page.villas.images.map((item, index) => (
              <Reveal key={item.label} className={styles.villaCard} delay={0.04 + index * 0.06}>
                <ParallaxMedia asset={item.media} sizes="(max-width: 980px) 100vw, 30vw" ratio={item.ratio} />
                <span className={styles.villaLabel}>{item.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.closingVisual} aria-label="Imagem de encerramento">
          <Reveal>
            <ParallaxMedia asset={page.closingVisual.media} sizes="100vw" ratio="16 / 9" />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
