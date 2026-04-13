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
    eyebrow: "Planta do conjunto",
    title: "Uma planta estática, mas pronta para ser ampliada com conforto.",
    intro:
      "Este espaço existe só para a leitura geral da planta. Em v1, não há disponibilidade por lote, mapa de vendas ou descrições individuais.",
    media: mediaAssets.lotsPlan
  },
  body: [
    "A planta aparece de forma completa, sem cortes desnecessários ou áreas vazias no componente.",
    "Você pode abrir a visualização ampliada para aproximar e percorrer a imagem com zoom quando precisar de mais detalhe."
  ],
  note:
    "Quando o inventário real estiver pronto, essa página pode evoluir sem mudar a navegação principal do site.",
  cta: {
    label: "Voltar ao início",
    href: "/#inicio"
  }
};
