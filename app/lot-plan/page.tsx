import type { Metadata } from "next";

import { LotPlanPageView } from "@/components/site/lot-plan/LotPlanPageView";
import { lotPlanPage } from "@/content/lot-plan";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(lotPlanPage.seo);
}

export default function LotPlanRoute() {
  return <LotPlanPageView page={lotPlanPage} />;
}
