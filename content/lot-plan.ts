import { mediaAssets } from "@/content/media";
import type { LotPlanPage } from "@/content/types";

export const lotPlanPage: LotPlanPage = {
  seo: {
    title: "Planta dos Lotes",
    description:
      "Planta geral do Lençóis com zoom e leitura em detalhe, sem inventário ou status de disponibilidade.",
    path: "/lot-plan",
    image: mediaAssets.lotsPlan
  },
  hero: {
    eyebrow: "Planta dos lotes",
    title: "Conheça o desenho do Lençóis.",
    intro:
      "146 lotes distribuídos em quadras ao longo de uma lagoa natural, com acesso direto ao rio e às dunas que formam a paisagem característica de Paracuru.",
    media: mediaAssets.lotsPlan
  },
  body: [
    "O projeto foi desenhado para preservar o que torna o terreno único: a lagoa com seu canal de entrada e saída, as dunas e a vegetação nativa de Mata Atlântica que separa as quadras — garantindo que o verde e a paisagem façam parte do dia a dia de cada lote."
  ],
  note:
    "Para saber sobre disponibilidade e condições, entre em contato com nossa equipe.",
  cta: {
    label: "Falar sobre disponibilidade",
    href: "/#inicio"
  }
};
