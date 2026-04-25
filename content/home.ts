import { mediaAssets } from "@/content/media";
import { whatsappLink } from "@/content/site";
import type { HomePage } from "@/content/types";

const availabilityMessage =
  "Olá, gostaria de receber a disponibilidade atual, valores e condições dos lotes do Lençóis.";

const budgetMessage =
  "Olá, tenho um orçamento definido e gostaria de receber opções de lote, valores e condições de pagamento compatíveis.";

const premiumMessage =
  "Olá, gostaria de receber uma recomendação de lotes com melhor vista, proximidade da lagoa e potencial para villa.";

const brokerMessage =
  "Olá, sou corretor(a) e gostaria de receber materiais, planta, disponibilidade e condições comerciais do Lençóis para apresentar a clientes.";

const internationalMessage =
  "Hello, I would like to receive availability, prices, villa build support information and English assistance for Lençóis.";

export const homePage: HomePage = {
  seo: {
    title: "Lençóis Condomínio de Lotes",
    description:
      "Lotes privativos em pré-lançamento em Paracuru, Ceará, junto à lagoa natural, dunas e suporte opcional para construir sua villa.",
    path: "/",
    image: mediaAssets.heroLandscape
  },
  hero: {
    eyebrow: "Condomínio de lotes em Paracuru",
    headline: "Lotes privativos junto à lagoa natural de Paracuru.",
    subheadline:
      "Um condomínio em pré-lançamento com 146 lotes, paisagem de lagoa e dunas, e suporte opcional para projetar e construir sua villa.",
    location: "Paracuru, Ceará · Brasil",
    facts: [
      { label: "Lotes", value: "146" },
      { label: "Fase", value: "Pré-lançamento" },
      { label: "Paisagem", value: "Lagoa natural" },
      { label: "Entorno", value: "Dunas e rio" },
      { label: "Suporte", value: "Villas opcionais" }
    ],
    trustCue:
      "Atendimento por WhatsApp para disponibilidade, valores, visita ao terreno e reserva antes do lançamento oficial.",
    primaryCta: {
      label: "Consultar valores e condições",
      href: whatsappLink(availabilityMessage),
      external: true
    },
    secondaryCta: {
      label: "Ver a planta dos lotes",
      href: "/lot-plan"
    },
    media: mediaAssets.heroLandscape
  },
  features: {
    eyebrow: "Um lugar para descanso, natureza e movimento",
    title: "Lençóis é onde as dunas, a lagoa e a paisagem moldam o seu dia.",
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
        title: "As dunas próximas continuam sendo uma das presenças mais marcantes.",
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
    eyebrow: "Pré-lançamento",
    title: "Receba opções compatíveis com seu orçamento e intenção de villa.",
    body:
      "A disponibilidade e os valores são confirmados diretamente pela equipe. Conte sua faixa de investimento, preferência de vista e objetivo de construção para receber uma orientação mais precisa.",
    media: mediaAssets.leisureRender,
    primaryCta: {
      label: "Receber opções de lote",
      href: whatsappLink(budgetMessage),
      external: true
    },
    secondaryCta: {
      label: "Ver planta dos lotes",
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
      "Se você tiver interesse em adquirir um lote, a equipe pode orientar sua escolha por orçamento, vista, proximidade da lagoa, quadra de preferência e intenção de construção."
    ],
    media: mediaAssets.lotsPlan,
    caption: "Você já pode explorar a planta geral do condomínio e entender a distribuição dos lotes.",
    primaryCta: {
      label: "Ver planta dos lotes",
      href: "/lot-plan"
    }
  },
  reserveFlow: {
    eyebrow: "Como reservar",
    title: "Da primeira conversa à reserva do lote.",
    intro:
      "O processo foi pensado para ajudar compradores e corretores a avançarem com clareza antes do lançamento oficial.",
    steps: [
      {
        title: "Conte seu perfil",
        body: "Envie orçamento, preferência de vista, proximidade da lagoa e intenção de construir agora ou depois."
      },
      {
        title: "Receba disponibilidade",
        body: "A equipe confirma opções atuais, valores, condições de pagamento e próximos passos de documentação."
      },
      {
        title: "Escolha com orientação",
        body: "Compare quadras, posição, paisagem e potencial de villa com apoio comercial e técnico."
      },
      {
        title: "Reserve antes do lançamento",
        body: "Depois da escolha, a equipe orienta sinal, prazos e termos para formalizar a reserva."
      }
    ],
    cta: {
      label: "Consultar disponibilidade e valores",
      href: whatsappLink(availabilityMessage),
      external: true
    }
  },
  villas: {
    eyebrow: "Villas",
    title: "Do lote à villa, com apoio local.",
    body: [
      "Se você busca previsibilidade, oferecemos suporte opcional do projeto à entrega: arquitetura, aprovações, orçamento, acompanhamento de obra e modelos de villa já desenvolvidos.",
      "Essa estrutura ajuda compradores de fora do Ceará e investidores internacionais a construir com comunicação clara e supervisão local."
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
    caption: "Modelos de villas podem ser adaptados ao lote escolhido, reduzindo tempo de decisão, aprovação e obra.",
    flow: [
      {
        title: "Escolha o lote",
        body: "Defina posição, vista, orçamento e potencial de construção."
      },
      {
        title: "Adapte a villa",
        body: "Selecione ou ajuste um modelo com arquitetura compatível com o terreno."
      },
      {
        title: "Aprove projeto e orçamento",
        body: "Organize escopo, etapas, custos e documentação antes da obra."
      },
      {
        title: "Acompanhe a entrega",
        body: "Receba gestão local, comunicação de progresso e suporte até o uso."
      }
    ]
  },
  commercial: {
    eyebrow: "Valores e condições",
    title: "A conversa certa depende do seu objetivo.",
    intro:
      "Como a fase é de pré-lançamento, valores, disponibilidade e condições são confirmados pela equipe. Escolha o caminho mais próximo do seu perfil.",
    actions: [
      {
        title: "Tenho um orçamento definido",
        body: "Receba opções compatíveis, condições de pagamento e orientação sobre reserva.",
        cta: {
          label: "Consultar por orçamento",
          href: whatsappLink(budgetMessage),
          external: true
        }
      },
      {
        title: "Busco um lote premium",
        body: "Peça indicação por vista, proximidade da lagoa, privacidade e plano de villa.",
        cta: {
          label: "Receber recomendação",
          href: whatsappLink(premiumMessage),
          external: true
        }
      },
      {
        title: "Quero visitar o terreno",
        body: "Combine dia, horário e roteiro para entender o acesso, a lagoa, as dunas e as quadras.",
        cta: {
          label: "Agendar visita ao terreno",
          href: whatsappLink("Olá, gostaria de agendar uma visita ao terreno do Lençóis em Paracuru."),
          external: true
        }
      }
    ]
  },
  trust: {
    eyebrow: "Segurança para decidir",
    title: "O que confirmar antes de reservar.",
    intro:
      "A equipe apresenta as informações comerciais, legais e de infraestrutura conforme a etapa do projeto, para que a decisão não dependa só da paisagem.",
    items: [
      { label: "Documentação", value: "Status do projeto, contrato e termos de reserva" },
      { label: "Condições", value: "Sinal de reserva, entrada, parcelas e prazos de pagamento" },
      { label: "Infraestrutura", value: "Acesso, energia, água, segurança e áreas comuns" },
      { label: "Condomínio", value: "Gestão, manutenção e previsão de custos recorrentes" },
      { label: "Visita", value: "Roteiro pelo terreno, quadras, lagoa e entorno" },
      { label: "Villa", value: "Projeto, aprovações, orçamento e gestão de obra opcionais" }
    ]
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Respostas para avançar com clareza.",
    items: [
      {
        question: "Qual é a faixa de valores dos lotes?",
        answer:
          "Os valores são confirmados pela equipe conforme disponibilidade, posição e fase comercial. Você pode informar seu orçamento para receber opções compatíveis."
      },
      {
        question: "Existe parcelamento ou condição de pré-lançamento?",
        answer:
          "As condições são apresentadas caso a caso, incluindo sinal de reserva, entrada, parcelas, prazos e eventuais correções."
      },
      {
        question: "O que está incluso na entrega do condomínio?",
        answer:
          "A equipe confirma infraestrutura prevista, acessos, áreas comuns, gestão condominial, etapas de entrega e responsabilidades de manutenção."
      },
      {
        question: "Quando posso construir?",
        answer:
          "O cronograma depende da etapa do empreendimento, documentação e aprovações. A equipe orienta os próximos passos antes da reserva."
      },
      {
        question: "A equipe ajuda com projeto e obra da villa?",
        answer:
          "Sim. O suporte de villa é opcional e pode incluir arquitetura, adaptação de modelos, orçamento, aprovações e acompanhamento de obra."
      },
      {
        question: "Como faço uma visita ao terreno?",
        answer:
          "Basta chamar no WhatsApp para combinar dia, horário e o roteiro de visita pelo terreno, quadras, lagoa e entorno de Paracuru."
      }
    ]
  },
  broker: {
    eyebrow: "Corretores",
    title: "Material e respostas para apresentar o Lençóis com segurança.",
    intro:
      "Corretores podem solicitar planta, disponibilidade, condições comerciais e materiais de apoio para compartilhar com clientes.",
    facts: [
      { label: "Produto", value: "Condomínio com 146 lotes em pré-lançamento" },
      { label: "Localização", value: "Paracuru, Ceará, entre lagoa, dunas e rio" },
      { label: "Venda", value: "Disponibilidade e valores confirmados pela equipe" },
      { label: "Apoio", value: "Planta, apresentação, tabela comercial e conteúdo para cliente" }
    ],
    cta: {
      label: "Receber material para corretores",
      href: whatsappLink(brokerMessage),
      external: true
    }
  },
  international: {
    eyebrow: "International buyers",
    title: "Land, villa support and weekend life on the Ceará coast.",
    intro:
      "For buyers outside Brazil, the team can assist in English with availability, pricing, local documentation, villa build support and visit logistics from Fortaleza.",
    items: [
      { label: "Access", value: "Plan your visit from Fortaleza, with local support in Paracuru" },
      { label: "Lifestyle", value: "Kitesurf region, dunes, lagoon and active weekends" },
      { label: "Remote build", value: "Local oversight, updates and villa delivery support" },
      { label: "Practicalities", value: "Ownership process, payments, permits and local representation" }
    ],
    cta: {
      label: "Request availability & prices",
      href: whatsappLink(internationalMessage),
      external: true
    }
  },
  closingVisual: {
    media: mediaAssets.closingVilla
  }
};
