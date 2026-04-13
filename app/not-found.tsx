import Link from "next/link";

import styles from "@/components/site/templates/PageTemplate.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.pageEnd}>
          <span className="sectionEyebrow">Página não encontrada</span>
          <h1 className={styles.heroTitle}>O caminho mudou, mas o lugar continua aqui.</h1>
          <p>Use a navegação principal para voltar ao Lençóis ou retomar a página inicial.</p>
          <div>
            <Link href="/" className="buttonPrimary">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
