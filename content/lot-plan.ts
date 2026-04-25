import { mediaAssets } from "@/content/media";
import { whatsappLink } from "@/content/site";
import type { LotPlanPage } from "@/content/types";

const availabilityMessage =
  "Olá, gostaria de receber a disponibilidade atual, valores e condições dos lotes do Lençóis.";

const brokerMessage =
  "Olá, sou corretor(a) e gostaria de receber materiais, planta, disponibilidade e condições comerciais do Lençóis para apresentar a clientes.";

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
    "O projeto foi desenhado para preservar o que torna o terreno único: a lagoa com seu canal de entrada e saída, as dunas e a vegetação nativa que separa as quadras — garantindo que o verde e a paisagem façam parte do dia a dia de cada lote."
  ],
  note:
    "Disponibilidade, valores, condições comerciais e status de reserva são sempre confirmados pela equipe. A planta ajuda na leitura do conjunto, mas não substitui a orientação comercial atualizada.",
  cta: {
    label: "Consultar disponibilidade e valores",
    href: whatsappLink(availabilityMessage),
    external: true
  },
  guidance: {
    eyebrow: "Como ler a planta",
    title: "Escolha o lote considerando paisagem, orçamento e intenção de construção.",
    intro:
      "A leitura da planta fica mais útil quando você combina posição, vista, proximidade da lagoa, quadra de preferência e plano de villa.",
    items: [
      { label: "Lotes", value: "146 unidades distribuídas em quadras ao redor da lagoa" },
      { label: "Paisagem", value: "Lagoa natural, rio, dunas e vegetação no entorno" },
      { label: "Escolha", value: "Compare vista, privacidade, acesso e potencial de villa" },
      { label: "Disponibilidade", value: "Confirme status e valores pelo WhatsApp antes de decidir" }
    ]
  },
  conversion: {
    title: "Receba disponibilidade, valores, condições e próximos passos.",
    body:
      "Envie sua faixa de orçamento e preferências. A equipe responde com opções atuais, orientação de quadra e informações para reservar antes do lançamento oficial.",
    cta: {
      label: "Consultar disponibilidade no WhatsApp",
      href: whatsappLink(availabilityMessage),
      external: true
    },
    secondaryCta: {
      label: "Voltar ao contato",
      href: "/#contact"
    }
  },
  brokerActions: [
    {
      title: "Solicitar material para cliente",
      body: "Abra uma conversa no WhatsApp para receber planta, materiais e disponibilidade atualizada.",
      cta: {
        label: "Solicitar material no WhatsApp",
        href: whatsappLink(brokerMessage),
        external: true
      }
    },
    {
      title: "Receber tabela comercial",
      body: "Peça condições, materiais e resumo do projeto para apresentar com segurança.",
      cta: {
        label: "Receber tabela comercial",
        href: whatsappLink(brokerMessage),
        external: true
      }
    },
    {
      title: "Abrir link da planta",
      body: "Use o endereço desta página para enviar a planta interativa a compradores interessados.",
      cta: {
        label: "Abrir link da planta",
        href: "/lot-plan"
      }
    }
  ]
};
