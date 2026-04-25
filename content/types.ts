export type SiteLocale = "pt-BR" | "en";

export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

export type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

export type FactItem = {
  label: string;
  value: string;
};

export type StepItem = {
  title: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ActionCard = {
  title: string;
  body: string;
  cta: CTA;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  image?: MediaAsset;
};

export type ContactDetails = {
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  address: string;
  mapsHref: string;
};

export type SiteMeta = {
  name: string;
  shortName: string;
  description: string;
  locale: SiteLocale;
  nav: NavItem[];
  lotPlanHref: string;
  contact: ContactDetails;
};

export type HomeFeatureItem = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  media: MediaAsset;
  align: "left" | "right";
  ratio?: string;
};

export type HomeGalleryItem = {
  label: string;
  media: MediaAsset;
  ratio?: string;
};

export type LotStatus = "available" | "reserved" | "sold";

export type LotRecord = {
  id: string;
  label: string;
  status: LotStatus;
  areaM2: number;
  price: number | null;
  orientation?: string;
  context?: string;
  mapCoordinates?: {
    x: number;
    y: number;
  };
};

export type SectionBlock =
  | {
      type: "essay";
      id: string;
      eyebrow: string;
      title: string;
      body: string[];
      media: MediaAsset;
      mediaPosition?: "start" | "end";
      quote?: string;
    }
  | {
      type: "facts";
      id: string;
      eyebrow: string;
      title: string;
      intro: string;
      items: Array<{
        label: string;
        value: string;
      }>;
      media?: MediaAsset;
    }
  | {
      type: "featureList";
      id: string;
      eyebrow: string;
      title: string;
      intro: string;
      items: Array<{
        title: string;
        body: string;
        meta?: string;
      }>;
      media?: MediaAsset;
    };

export type PageHero = {
  eyebrow: string;
  title: string;
  intro: string;
  media: MediaAsset;
};

export type HomePage = {
  seo: SeoMeta;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    location: string;
    facts: FactItem[];
    trustCue: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    media: MediaAsset;
  };
  features: {
    eyebrow: string;
    title: string;
    intro: string;
    items: HomeFeatureItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    media: MediaAsset;
    primaryCta: CTA;
    secondaryCta: CTA;
  };
  locationSection: {
    eyebrow: string;
    title: string;
    body: string[];
    items: HomeGalleryItem[];
    caption: string;
  };
  lotPlanSection: {
    eyebrow: string;
    title: string;
    body: string[];
    media: MediaAsset;
    caption: string;
    primaryCta: CTA;
  };
  reserveFlow: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: StepItem[];
    cta: CTA;
  };
  villas: {
    eyebrow: string;
    title: string;
    body: string[];
    images: HomeGalleryItem[];
    caption: string;
    flow: StepItem[];
  };
  commercial: {
    eyebrow: string;
    title: string;
    intro: string;
    actions: ActionCard[];
  };
  trust: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FactItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  broker: {
    eyebrow: string;
    title: string;
    intro: string;
    facts: FactItem[];
    cta: CTA;
  };
  international: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FactItem[];
    cta: CTA;
  };
  closingVisual: {
    media: MediaAsset;
  };
};

export type LotPlanPage = {
  seo: SeoMeta;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    media: MediaAsset;
  };
  body: string[];
  note: string;
  cta: CTA;
  guidance: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FactItem[];
  };
  conversion: {
    title: string;
    body: string;
    cta: CTA;
    secondaryCta: CTA;
  };
  brokerActions: ActionCard[];
};

export type EditorialPage = {
  slug: string;
  template: "editorial";
  seo: SeoMeta;
  hero: PageHero;
  sections: SectionBlock[];
  closingNote: string;
  cta: CTA;
};

export type StructuredPage = {
  slug: string;
  template: "structured";
  seo: SeoMeta;
  hero: PageHero;
  highlights: Array<{
    label: string;
    value: string;
  }>;
  sections: SectionBlock[];
  cta: CTA;
};

export type SitePage = EditorialPage | StructuredPage;
