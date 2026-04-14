"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent, TouchEvent as ReactTouchEvent } from "react";

import type { MediaAsset } from "@/content/types";

import styles from "./LotPlanViewer.module.css";

type LotPlanViewerProps = {
  asset: MediaAsset;
  title: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.2;
const MAX_ZOOM_TOUCH = 20;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function LotPlanViewer({ asset, title }: LotPlanViewerProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Desktop pan state
  const panState = useRef({ active: false, startX: 0, startY: 0, startScrollLeft: 0, startScrollTop: 0 });

  // Touch gesture state — all in refs to avoid stale closures during rapid events
  const touchGesture = useRef({
    // Pan
    panX: 0,           // committed accumulated pan
    panY: 0,
    startTouchX: 0,    // touch start position for current gesture
    startTouchY: 0,
    activeDeltaX: 0,   // live delta during current gesture
    activeDeltaY: 0,
    // Pinch
    initialPinchDist: 0,
    initialZoom: 1,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Displayed transform values — kept in state so canvas re-renders
  const [canvasTransform, setCanvasTransform] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  function openViewer() {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setZoom(1);
    setCanvasTransform({ x: 0, y: 0, scale: 1 });
    touchGesture.current = { panX: 0, panY: 0, startTouchX: 0, startTouchY: 0, activeDeltaX: 0, activeDeltaY: 0, initialPinchDist: 0, initialZoom: 1 };
    setIsOpen(true);
    if (isTouchDevice) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  }

  function closeViewer() {
    setIsOpen(false);
    setShowHint(false);
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === "function") {
      lastFocusedRef.current.focus();
    }
  }

  // ── Touch gestures ────────────────────────────────────────────────

  function pinchDistance(touches: React.TouchList): number {
    if (touches.length < 2) return 0;
    const dx = touches[0]!.clientX - touches[1]!.clientX;
    const dy = touches[0]!.clientY - touches[1]!.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    const g = touchGesture.current;

    if (event.touches.length === 1) {
      const t = event.touches[0]!;
      g.startTouchX = t.clientX;
      g.startTouchY = t.clientY;
      g.activeDeltaX = 0;
      g.activeDeltaY = 0;
    } else if (event.touches.length === 2) {
      g.initialPinchDist = pinchDistance(event.touches);
      g.initialZoom = canvasTransform.scale;
    }
  }

  function handleTouchMove(event: ReactTouchEvent<HTMLDivElement>) {
    const g = touchGesture.current;

    if (event.touches.length === 1) {
      const t = event.touches[0]!;
      const currentScale = canvasTransform.scale;
      if (currentScale > 1.02) {
        g.activeDeltaX = t.clientX - g.startTouchX;
        g.activeDeltaY = t.clientY - g.startTouchY;
        setCanvasTransform(prev => ({
          ...prev,
          x: g.panX + g.activeDeltaX,
          y: g.panY + g.activeDeltaY,
        }));
      }
    } else if (event.touches.length === 2 && g.initialPinchDist > 0) {
      const dist = pinchDistance(event.touches);
      const rawScale = g.initialZoom * (dist / g.initialPinchDist);
      const newScale = clamp(rawScale, MIN_ZOOM, MAX_ZOOM_TOUCH);
      setCanvasTransform(prev => ({ ...prev, scale: newScale }));
    }
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const g = touchGesture.current;

    if (event.touches.length === 0) {
      // Commit the active delta into the persistent pan
      g.panX += g.activeDeltaX;
      g.panY += g.activeDeltaY;
      g.activeDeltaX = 0;
      g.activeDeltaY = 0;

      // Clamp pan so the map doesn't fly off screen
      const scale = canvasTransform.scale;
      const maxPan = 200 * (scale - 1);
      g.panX = clamp(g.panX, -maxPan, maxPan);
      g.panY = clamp(g.panY, -maxPan, maxPan);
      setCanvasTransform(prev => ({ ...prev, x: g.panX, y: g.panY }));
    }
  }

  // ── Desktop controls ──────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeViewer(); }
      if (!isTouchDevice) {
        if (event.key === "+" || event.key === "=") { event.preventDefault(); setZoom(z => clamp(z + 0.25, MIN_ZOOM, MAX_ZOOM)); }
        if (event.key === "-") { event.preventDefault(); setZoom(z => clamp(z - 0.25, MIN_ZOOM, MAX_ZOOM)); }
        if (event.key === "0") {
          event.preventDefault();
          setZoom(1);
          if (viewportRef.current) { viewportRef.current.scrollTop = 0; viewportRef.current.scrollLeft = 0; }
        }
      }
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKeyDown); };
  }, [isOpen, isTouchDevice]);

  useEffect(() => {
    if (!isOpen || !viewportRef.current) return;
    viewportRef.current.scrollTop = 0;
    viewportRef.current.scrollLeft = 0;
  }, [isOpen]);

  function startPan(event: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= 1.01 || event.button !== 0 || !viewportRef.current) return;
    event.preventDefault();
    const vp = viewportRef.current;
    panState.current = { active: true, startX: event.clientX, startY: event.clientY, startScrollLeft: vp.scrollLeft, startScrollTop: vp.scrollTop };
    vp.classList.add(styles.isPanning);
    vp.setPointerCapture(event.pointerId);
  }

  function movePan(event: ReactPointerEvent<HTMLDivElement>) {
    if (!panState.current.active || !viewportRef.current) return;
    const vp = viewportRef.current;
    vp.scrollLeft = panState.current.startScrollLeft - (event.clientX - panState.current.startX);
    vp.scrollTop = panState.current.startScrollTop - (event.clientY - panState.current.startY);
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
    setZoom(z => clamp(z + delta, MIN_ZOOM, MAX_ZOOM));
  }

  function resetZoom() {
    setZoom(1);
    if (viewportRef.current) { viewportRef.current.scrollTop = 0; viewportRef.current.scrollLeft = 0; }
  }

  return (
    <>
      <button type="button" className={styles.previewButton} onClick={openViewer}>
        <div className={styles.previewFrame} style={{ aspectRatio: `${asset.width} / ${asset.height}` }}>
          <Image src={asset.src} alt={asset.alt} fill sizes="100vw" priority={asset.priority} style={{ objectFit: "cover" }} />
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
            onMouseDown={(e) => { if (e.target === e.currentTarget && !isTouchDevice) closeViewer(); }}
          >
            <motion.div
              className={`${styles.panel} ${isTouchDevice ? styles.panelTouch : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={reduceMotion ? false : { y: 16, opacity: 0.2, scale: 0.985 }}
              animate={reduceMotion ? {} : { y: 0, opacity: 1, scale: 1 }}
              exit={reduceMotion ? {} : { y: 12, opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Desktop toolbar */}
              {!isTouchDevice && (
                <div className={styles.toolbar}>
                  <div className={styles.meta}>
                    <p className={styles.eyebrow}>Planta dos lotes</p>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.helper}>Use `+`, `-` ou a roda do mouse para ampliar. Arraste para mover.</p>
                  </div>
                  <div className={styles.controls}>
                    <button type="button" className={styles.control} onClick={() => setZoom(z => clamp(z - 0.3, MIN_ZOOM, MAX_ZOOM))} aria-label="Diminuir zoom">-</button>
                    <button type="button" className={styles.control} onClick={resetZoom}>100%</button>
                    <button type="button" className={styles.control} onClick={() => setZoom(z => clamp(z + 0.3, MIN_ZOOM, MAX_ZOOM))} aria-label="Aumentar zoom">+</button>
                    <button type="button" className={styles.close} onClick={closeViewer}>Fechar</button>
                  </div>
                </div>
              )}

              {/* Touch toolbar */}
              {isTouchDevice && (
                <div className={styles.toolbarTouch}>
                  {showHint && (
                    <motion.div className={styles.hint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Beliscá para ampliar · Arraste para navegar
                    </motion.div>
                  )}
                  <button type="button" className={styles.closeTouch} onClick={closeViewer} aria-label="Fechar">✕</button>
                </div>
              )}

              {/* Desktop viewport — scroll-based pan */}
              {!isTouchDevice && (
                <div
                  ref={viewportRef}
                  className={styles.viewport}
                  onPointerDown={startPan}
                  onPointerMove={movePan}
                  onPointerUp={endPan}
                  onPointerCancel={endPan}
                  onWheel={handleWheel}
                >
                  <div className={styles.canvas} style={{ width: `${zoom * 100}%`, aspectRatio: `${asset.width} / ${asset.height}` }}>
                    <Image src={asset.src} alt={asset.alt} fill sizes="(min-width: 1px) 200vw" priority className={styles.image} style={{ objectFit: "cover" }} />
                  </div>
                </div>
              )}

              {/* Touch viewport — transform-based pan + pinch zoom */}
              {isTouchDevice && (
                <div
                  className={styles.viewportTouch}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className={styles.canvasTouch}
                    style={{
                      aspectRatio: `${asset.width} / ${asset.height}`,
                      transform: `translate(${canvasTransform.x}px, ${canvasTransform.y}px) scale(${canvasTransform.scale})`,
                    }}
                  >
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="300vw"
                      priority
                      className={styles.image}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
