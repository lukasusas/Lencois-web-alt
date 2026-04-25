import Image from "next/image";
import Link from "next/link";

import { mediaAssets } from "@/content/media";
import type { SiteMeta } from "@/content/types";

import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  site: SiteMeta;
};

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <div className={styles.leadRow}>
          <div className={styles.lead}>
            <span className="sectionEyebrow">Contato</span>
            <h2 className={styles.title}>
              Consulte disponibilidade, valores e próximos passos.
            </h2>
            <p className={styles.copy}>
              Conte seu orçamento, preferência de vista e intenção de construção. A equipe pode indicar os lotes mais adequados, explicar condições e orientar a reserva antes do lançamento oficial.
            </p>
            <div className={styles.actions}>
              <Link href={site.contact.whatsappHref} className="buttonPrimary" target="_blank" rel="noreferrer">
                Falar pelo WhatsApp
              </Link>
              <Link href={site.contact.phoneHref} className="buttonSecondary">
                Ligar
              </Link>
              <Link href={site.lotPlanHref} className="buttonSecondary">
                Planta dos lotes
              </Link>
            </div>
          </div>

          <div className={styles.meta}>
            <div>
              <p className={styles.metaLabel}>Telefone</p>
              <Link href={site.contact.phoneHref}>{site.contact.phone}</Link>
            </div>
            <div>
              <p className={styles.metaLabel}>WhatsApp</p>
              <Link href={site.contact.whatsappHref} target="_blank" rel="noreferrer">
                Abrir conversa
              </Link>
            </div>
            <div>
              <p className={styles.metaLabel}>Endereço</p>
              <Link href={site.contact.mapsHref} target="_blank" rel="noreferrer">
                {site.contact.address}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.nav}>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <Image
            src={mediaAssets.logoWordmarkDark.src}
            alt={mediaAssets.logoWordmarkDark.alt}
            width={mediaAssets.logoWordmarkDark.width}
            height={mediaAssets.logoWordmarkDark.height}
            className={styles.wordmark}
          />
        </div>
      </div>
    </footer>
  );
}
