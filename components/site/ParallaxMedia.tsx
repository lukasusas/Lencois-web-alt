"use client";

import Image from "next/image";

import type { MediaAsset } from "@/content/types";

import styles from "./ParallaxMedia.module.css";

type ParallaxMediaProps = {
  asset: MediaAsset;
  className?: string;
  sizes?: string;
  shift?: number;
  priority?: boolean;
  ratio?: string;
  fit?: "cover" | "contain";
};

export function ParallaxMedia({
  asset,
  className,
  sizes = "100vw",
  shift = 0,
  priority,
  ratio,
  fit = "cover"
}: ParallaxMediaProps) {
  return (
    <div className={`${styles.outer} ${className ?? ""}`.trim()} data-shift={shift !== 0 ? "disabled" : undefined}>
      <div
        className={styles.frame}
        style={
          ratio
            ? {
                aspectRatio: ratio,
                height: "auto"
              }
            : undefined
        }
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority ?? asset.priority}
          className={styles.image}
          style={{ objectFit: fit }}
        />
      </div>
    </div>
  );
}
