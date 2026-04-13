import type { Metadata } from "next";

import { HomePageView } from "@/components/site/home/HomePageView";
import { homePage } from "@/content/home";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(homePage.seo);
}

export default function Home() {
  return <HomePageView page={homePage} />;
}
