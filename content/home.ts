import { mediaAssets } from "@/content/media";
import type { HomePage } from "@/content/types";

export const homePage: HomePage = {
  seo: {
    title: "Lençóis Condomínio de Lotes",
    description:
      "Um lugar em Paracuru entre lagoa, dunas e uma vida ao ar livre mais calma.",
    path: "/",
    image: mediaAssets.heroLandscape
  },
  hero: {
    eyebrow: "Condomínio de lotes em Paracuru",
    headline: "Um lugar desenhado pelo vento, pela água e pelo tempo.",
    subheadline:
      "Lençóis reúne lagoa natural, dunas vivas e lotes privativos em uma leitura clara da paisagem.",
    location: "Paracuru, Ceará · Brasil",
    primaryCta: {
      label: "Falar com a equipe",
      href: "/#contact"
    },
    secondaryCta: {
      label: "Ver a planta dos lotes",
      href: "/lot-plan"
    },
    media: mediaAssets.heroLandscape
  },
  features: {
    eyebrow: "Seu portal para relaxamento e aventura",
    title: "Lençóis é onde as dunas, a lagoa e o mar moldam o seu dia.",
    intro: "Um cenário que inspira momentos de calma e experiências inesquecíveis.",
    items: [
      {
        id: "features-lazer",
        eyebrow: "Área de lazer",
        title: "Um ponto de encontro pensado para desacelerar.",
        body: [
          "Piscina, apoio social e espaços de permanência formam uma rotina mais leve, em contato direto com o ar livre.",
          "A paisagem continua presente em cada trecho, então o convívio não compete com o lugar. Ele se apoia nele."
        ],
        media: mediaAssets.leisureRender,
        align: "left",
        ratio: "2744 / 1920"
      },
      {
        id: "features-lagoa",
        eyebrow: "Lagoa",
        title: "Um eixo de água que organiza o espaço e desacelera o olhar.",
        body: [
          "A lagoa natural cria um centro silencioso para o projeto. Ela não funciona como cenário decorativo, mas como o ponto de equilíbrio da experiência.",
          "Caminhar, atravessar a ponte ou sentar à beira d'água passa a fazer parte do cotidiano."
        ],
        media: mediaAssets.lagoon,
        align: "right",
        ratio: "3005 / 2923"
      },
      {
        id: "features-dunas",
        eyebrow: "Dunas",
        title: "A paisagem viva mais próxima continua sendo a mais impressionante.",
        body: [
          "As dunas mudam com a luz, com o vento e com a maré. A casa entra depois, com o cuidado de quem entende que o cenário já existe.",
          "É esse diálogo entre permanência e transformação que dá força ao lugar."
        ],
        media: mediaAssets.dunes,
        align: "left",
        ratio: "1 / 1"
      }
    ]
  },
  cta: {
    eyebrow: "Aqui e agora",
    title: "A planta, a paisagem e o ritmo do lugar em um mesmo gesto.",
    body:
      "Nesta fase, o foco é ler o desenho geral com clareza: o conjunto, a lagoa, as dunas e a posição dos lotes, sem inventário ou disponibilidade expostos na tela.",
    media: mediaAssets.leisureRender,
    primaryCta: {
      label: "Abrir contato",
      href: "/#contact"
    },
    secondaryCta: {
      label: "Ver a planta",
      href: "/lot-plan"
    }
  },
  locationSection: {
    eyebrow: "Localização",
    title: "Paracuru, Ceará, Brasil.",
    body: [
      "O projeto está inserido em uma paisagem brasileira muito específica: costa, areia, vegetação, lagoa e uma cidade que ainda preserva escala e calma.",
      "Esse contexto permite que o Lençóis fale com quem busca um refúgio de temporada, uma base para viver melhor ou um endereço com perspectiva de permanência."
    ],
    items: [
      {
        label: "O condomínio no contexto de Paracuru",
        media: mediaAssets.siteAerial,
        ratio: "16 / 9"
      },
      {
        label: "Zoom detalhado na lagoa e lotes",
        media: mediaAssets.siteAerialZoom,
        ratio: "16 / 9"
      }
    ],
    caption: "A leitura aérea ajuda a perceber o encaixe do condomínio na paisagem."
  },
  lotPlanSection: {
    eyebrow: "Planta dos lotes",
    title: "A planta geral está visível e pronta para ampliar.",
    body: [
      "Estamos atualmente na fase de pré-lançamento.",
      "Se você tiver interesse em adquirir um lote, entre em contato conosco — iremos orientar você na escolha e garantir a sua reserva antes do lançamento oficial."
    ],
    media: mediaAssets.lotsPlan,
    caption: "Você já pode explorar a planta geral do condomínio e entender a distribuição dos lotes.",
    primaryCta: {
      label: "Abrir planta completa",
      href: "/lot-plan"
    }
  },
  villas: {
    eyebrow: "Villas",
    title: "O lote é o começo. A casa vem depois.",
    body: [
      "Se você busca praticidade, oferecemos suporte completo do projeto à entrega.",
      "Nossa equipe pode desenvolver o projeto arquitetônico, acompanhar a obra e entregar a casa pronta para uso."
    ],
    images: [
      {
        label: "Interior da villa",
        media: mediaAssets.villaInterior,
        ratio: "3003 / 2099"
      },
      {
        label: "Pátio da villa",
        media: mediaAssets.villaCourtyard,
        ratio: "3011 / 2102"
      },
      {
        label: "Lazer e abertura",
        media: mediaAssets.leisureRender,
        ratio: "2744 / 1920"
      }
    ],
    caption: "Também disponibilizamos modelos de vilas já desenvolvidos, otimizados para reduzir tempo e custos."
  },
  closingVisual: {
    media: mediaAssets.closingVilla
  }
};
