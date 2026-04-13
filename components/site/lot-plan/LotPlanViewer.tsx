"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";

import type { MediaAsset } from "@/content/types";

import styles from "./LotPlanViewer.module.css";

type LotPlanViewerProps = {
  asset: MediaAsset;
  title: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.2;

function clampZoom(value: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
}

export function LotPlanViewer({ asset, title }: LotPlanViewerProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const panState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startScrollLeft: number;
    startScrollTop: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0
  });
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  function openViewer() {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setZoom(1);
    setIsOpen(true);
  }

  function closeViewer() {
    setIsOpen(false);
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === "function") {
      lastFocusedRef.current.focus();
    }
  }

  function applyZoom(next: number | ((current: number) => number)) {
    setZoom((current) => {
      const value = typeof next === "function" ? next(current) : next;
      return clampZoom(value);
    });
  }

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      }

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        applyZoom((current) => current + 0.25);
      }

      if (event.key === "-") {
        event.preventDefault();
        applyZoom((current) => current - 0.25);
      }

      if (event.key === "0") {
        event.preventDefault();
        setZoom(1);
        if (viewportRef.current) {
          viewportRef.current.scrollTop = 0;
          viewportRef.current.scrollLeft = 0;
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !viewportRef.current) return;
    viewportRef.current.scrollTop = 0;
    viewportRef.current.scrollLeft = 0;
  }, [isOpen]);

  function zoomIn() {
    setZoom((current) => clampZoom(current + 0.3));
  }

  function zoomOut() {
    setZoom((current) => clampZoom(current - 0.3));
  }

  function resetZoom() {
    setZoom(1);
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0;
      viewportRef.current.scrollLeft = 0;
    }
  }

  function startPan(event: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= 1.01 || event.button !== 0 || !viewportRef.current) return;

    event.preventDefault();

    const viewport = viewportRef.current;
    panState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: viewport.scrollLeft,
      startScrollTop: viewport.scrollTop
    };
    viewport.classList.add(styles.isPanning);
    viewport.setPointerCapture(event.pointerId);
  }

  function movePan(event: ReactPointerEvent<HTMLDivElement>) {
    if (!panState.current.active || !viewportRef.current) return;

    const viewport = viewportRef.current;
    viewport.scrollLeft = panState.current.startScrollLeft - (event.clientX - panState.current.startX);
    viewport.scrollTop = panState.current.startScrollTop - (event.clientY - panState.current.startY);
  }

  function endPan(event: ReactPointerEvent<HTMLDivElement>) {
    if (!viewportRef.current) return;
    panState.current.active = false;
    viewportRef.current.classList.remove(styles.isPanning);
    if (viewportRef.current.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
  }

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.18 : -0.18;
    setZoom((current) => clampZoom(current + delta));
  }

  return (
    <>
      <button type="button" className={styles.previewButton} onClick={openViewer}>
        <div
          className={styles.previewFrame}
          style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="100vw"
            priority={asset.priority}
            style={{ objectFit: "cover" }}
          />
          <span className={styles.previewBadge}>Abrir e ampliar</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className={styles.overlay}
            role="presentation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeViewer();
              }
            }}
          >
            <motion.div
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={reduceMotion ? false : { y: 16, opacity: 0.2, scale: 0.985 }}
              animate={reduceMotion ? {} : { y: 0, opacity: 1, scale: 1 }}
              exit={reduceMotion ? {} : { y: 12, opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.toolbar}>
                <div className={styles.meta}>
                  <p className={styles.eyebrow}>Planta dos lotes</p>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.helper}>Use `+`, `-` ou a roda do mouse para ampliar. Arraste para mover.</p>
                </div>
                <div className={styles.controls}>
                  <button type="button" className={styles.control} onClick={zoomOut} aria-label="Diminuir zoom">
                    -
                  </button>
                  <button type="button" className={styles.control} onClick={resetZoom}>
                    100%
                  </button>
                  <button type="button" className={styles.control} onClick={zoomIn} aria-label="Aumentar zoom">
                    +
                  </button>
                  <button type="button" className={styles.close} onClick={closeViewer}>
                    Fechar
                  </button>
                </div>
              </div>

              <div
                ref={viewportRef}
                className={styles.viewport}
                onPointerDown={startPan}
                onPointerMove={movePan}
                onPointerUp={endPan}
                onPointerCancel={endPan}
                onWheel={handleWheel}
              >
                <div
                  className={styles.canvas}
                  style={{
                    width: `${zoom * 100}%`,
                    aspectRatio: `${asset.width} / ${asset.height}`
                  }}
                >
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="100vw"
                    priority
                    className={styles.image}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
