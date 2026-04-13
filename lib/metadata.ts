import type { Metadata } from "next";

import { siteMeta } from "@/content/site";
import type { SeoMeta } from "@/content/types";

export function buildMetadata(seo: SeoMeta): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: `${seo.title} | ${siteMeta.shortName}`,
      description: seo.description,
      type: "website",
      images: seo.image
        ? [
            {
              url: seo.image.src,
              width: seo.image.width,
              height: seo.image.height,
              alt: seo.image.alt
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | ${siteMeta.shortName}`,
      description: seo.description,
      images: seo.image ? [seo.image.src] : undefined
    }
  };
}
