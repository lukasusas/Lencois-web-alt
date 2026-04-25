import type { SiteMeta } from "@/content/types";

export const DEFAULT_LOCALE = "pt-BR" as const;
export const WHATSAPP_BASE = "https://wa.me/5585988327777";

export function whatsappLink(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const siteMeta: SiteMeta = {
  name: "Lençóis Condomínio de Lotes",
  shortName: "Lençóis",
  description:
    "Lençóis é um condomínio de lotes em Paracuru, Ceará, entre lagoa natural, dunas e um ritmo de vida mais calmo.",
  locale: DEFAULT_LOCALE,
  nav: [
    {
      label: "Lazer",
      href: "/#features",
      description: "Área de lazer e paisagem"
    },
    {
      label: "Localização",
      href: "/#location",
      description: "Lagoa, dunas e contexto"
    },
    {
      label: "Planta geral",
      href: "/#lotes",
      description: "Planta geral do conjunto"
    },
    {
      label: "Reservar",
      href: "/#reservar",
      description: "Disponibilidade e condições"
    },
    {
      label: "Villas",
      href: "/#villas",
      description: "Arquitetura e construção"
    },
    {
      label: "International",
      href: "/#international",
      description: "English buyer path"
    },
    {
      label: "Contato",
      href: "/#contact",
      description: "Falar com a equipe"
    }
  ],
  lotPlanHref: "/lot-plan",
  contact: {
    phone: "+55 (85) 98832-7777",
    phoneHref: "tel:+5585988327777",
    whatsappHref: whatsappLink("Olá, gostaria de saber mais sobre o Lençóis."),
    address: "Rua José Pires, 591, Paracuru, CE, 62680-000, Brasil",
    mapsHref: "https://maps.app.goo.gl/AoYGXdLbuoaWUx9XA"
  }
};
