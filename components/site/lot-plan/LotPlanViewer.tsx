"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent, TouchEvent as ReactTouchEvent } from "react";

import type { MediaAsset } from "@/content/types";

import styles from "./LotPlanViewer.module.css";

type LotPlanViewerProps = {
  asset: MediaAsset;
  fullAsset?: MediaAsset;
  title: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.2;
const MAX_ZOOM_TOUCH = 20;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function LotPlanViewer({ asset, fullAsset, title }: LotPlanViewerProps) {
  const viewerAsset = fullAsset ?? asset;
  const isSvg = viewerAsset.src.endsWith(".svg");
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Desktop pan state
  const panState = useRef({ active: false, startX: 0, startY: 0, startScrollLeft: 0, startScrollTop: 0 });

  // Touch state — all refs to avoid stale closures in rapid gesture events
  const touch = useRef({
    // committed state (persists between gestures)
    panX: 0,
    panY: 0,
    scale: 1,
    // per-gesture scratch
    startX: 0,
    startY: 0,
    pinchDist0: 0,
    pinchScale0: 1,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);               // desktop zoom
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Touch display state — drives CSS
  const [touchScale, setTouchScale] = useState(1);   // multiplies canvas width
  const [touchPan, setTouchPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  function openViewer() {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setZoom(1);
    setTouchScale(1);
    setTouchPan({ x: 0, y: 0 });
    touch.current = { panX: 0, panY: 0, scale: 1, startX: 0, startY: 0, pinchDist0: 0, pinchScale0: 1 };
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

  function getPinchDist(touches: React.TouchList): number {
    const dx = touches[0]!.clientX - touches[1]!.clientX;
    const dy = touches[0]!.clientY - touches[1]!.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Clamp pan so the canvas edge can't go past the viewport centre
  function clampPan(panX: number, panY: number, scale: number) {
    const vw = viewportRef.current?.clientWidth ?? window.innerWidth;
    const vh = viewportRef.current?.clientHeight ?? window.innerHeight;
    // canvas is scale * vw wide, centred initially
    const maxX = ((scale - 1) * vw) / 2;
    // aspect ratio of the svg map
    const ar = viewerAsset.width / viewerAsset.height;
    const canvasH = (scale * vw) / ar;
    const maxY = Math.max(0, (canvasH - vh) / 2);
    return {
      x: clamp(panX, -maxX, maxX),
      y: clamp(panY, -maxY, maxY),
    };
  }

  function handleTouchStart(e: ReactTouchEvent<HTMLDivElement>) {
    const t = touch.current;
    if (e.touches.length === 1) {
      t.startX = e.touches[0]!.clientX;
      t.startY = e.touches[0]!.clientY;
    } else if (e.touches.length === 2) {
      t.pinchDist0 = getPinchDist(e.touches);
      t.pinchScale0 = t.scale;
    }
  }

  function handleTouchMove(e: ReactTouchEvent<HTMLDivElement>) {
    const t = touch.current;

    if (e.touches.length === 1) {
      if (t.scale <= 1.02) return;
      const dx = e.touches[0]!.clientX - t.startX;
      const dy = e.touches[0]!.clientY - t.startY;
      const clamped = clampPan(t.panX + dx, t.panY + dy, t.scale);
      setTouchPan(clamped);
    } else if (e.touches.length === 2 && t.pinchDist0 > 0) {
      const dist = getPinchDist(e.touches);
      const newScale = clamp(t.pinchScale0 * (dist / t.pinchDist0), MIN_ZOOM, MAX_ZOOM_TOUCH);
      t.scale = newScale;
      setTouchScale(newScale);
      // Re-clamp pan for new scale
      const clamped = clampPan(t.panX, t.panY, newScale);
      t.panX = clamped.x;
      t.panY = clamped.y;
      setTouchPan(clamped);
    }
  }

  function handleTouchEnd(e: ReactTouchEvent<HTMLDivElement>) {
    if (e.touches.length === 0) {
      // Commit live pan delta into persistent pan
      const t = touch.current;
      const clamped = clampPan(touchPan.x, touchPan.y, t.scale);
      t.panX = clamped.x;
      t.panY = clamped.y;
      setTouchPan(clamped);
    }
  }

  // ── Desktop controls ──────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); closeViewer(); }
      if (!isTouchDevice) {
        if (e.key === "+" || e.key === "=") { e.preventDefault(); setZoom(z => clamp(z + 0.25, MIN_ZOOM, MAX_ZOOM)); }
        if (e.key === "-") { e.preventDefault(); setZoom(z => clamp(z - 0.25, MIN_ZOOM, MAX_ZOOM)); }
        if (e.key === "0") {
          e.preventDefault();
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

  function startPan(e: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= 1.01 || e.button !== 0 || !viewportRef.current) return;
    e.preventDefault();
    const vp = viewportRef.current;
    panState.current = { active: true, startX: e.clientX, startY: e.clientY, startScrollLeft: vp.scrollLeft, startScrollTop: vp.scrollTop };
    vp.classList.add(styles.isPanning);
    vp.setPointerCapture(e.pointerId);
  }

  function movePan(e: ReactPointerEvent<HTMLDivElement>) {
    if (!panState.current.active || !viewportRef.current) return;
    const vp = viewportRef.current;
    vp.scrollLeft = panState.current.startScrollLeft - (e.clientX - panState.current.startX);
    vp.scrollTop = panState.current.startScrollTop - (e.clientY - panState.current.startY);
  }

  function endPan(e: ReactPointerEvent<HTMLDivElement>) {
    if (!viewportRef.current) return;
    panState.current.active = false;
    viewportRef.current.classList.remove(styles.isPanning);
    if (viewportRef.current.hasPointerCapture(e.pointerId)) viewportRef.current.releasePointerCapture(e.pointerId);
  }

  function handleWheel(e: ReactWheelEvent<HTMLDivElement>) {
    e.preventDefault();
    setZoom(z => clamp(z + (e.deltaY < 0 ? 0.18 : -0.18), MIN_ZOOM, MAX_ZOOM));
  }

  function resetZoom() {
    setZoom(1);
    if (viewportRef.current) { viewportRef.current.scrollTop = 0; viewportRef.current.scrollLeft = 0; }
  }

  // ── Render helpers ────────────────────────────────────────────────

  function renderImage(extraClass?: string) {
    if (isSvg) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={viewerAsset.src} alt={viewerAsset.alt} className={`${styles.imageSvg} ${extraClass ?? ""}`.trim()} draggable={false} />
      );
    }
    return (
      <Image src={viewerAsset.src} alt={viewerAsset.alt} fill sizes="(min-width: 1px) 300vw" priority className={`${styles.image} ${extraClass ?? ""}`.trim()} style={{ objectFit: "cover" }} />
    );
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
              {/* ── Desktop toolbar ── */}
              {!isTouchDevice && (
                <div className={styles.toolbar}>
                  <div className={styles.meta}>
                    <p className={styles.eyebrow}>Planta dos lotes</p>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.helper}>Use +, - ou a roda do mouse para ampliar. Arraste para mover.</p>
                  </div>
                  <div className={styles.controls}>
                    <button type="button" className={styles.control} onClick={() => setZoom(z => clamp(z - 0.3, MIN_ZOOM, MAX_ZOOM))} aria-label="Diminuir zoom">-</button>
                    <button type="button" className={styles.control} onClick={resetZoom}>100%</button>
                    <button type="button" className={styles.control} onClick={() => setZoom(z => clamp(z + 0.3, MIN_ZOOM, MAX_ZOOM))} aria-label="Aumentar zoom">+</button>
                    <button type="button" className={styles.close} onClick={closeViewer}>Fechar</button>
                  </div>
                </div>
              )}

              {/* ── Touch toolbar ── */}
              {isTouchDevice && (
                <div className={styles.toolbarTouch}>
                  {showHint && (
                    <motion.div className={styles.hint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Belisque para ampliar · Arraste para navegar
                    </motion.div>
                  )}
                  <button type="button" className={styles.closeTouch} onClick={closeViewer} aria-label="Fechar">✕</button>
                </div>
              )}

              {/* ── Desktop viewport — scroll-based pan ── */}
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
                  <div className={styles.canvas} style={{ width: `${zoom * 100}%`, aspectRatio: `${viewerAsset.width} / ${viewerAsset.height}` }}>
                    {renderImage()}
                  </div>
                </div>
              )}

              {/* ── Touch viewport — width-based zoom (forces SVG re-render = crisp) + translate pan ── */}
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
                      // Width drives actual SVG render resolution — crisp at any zoom
                      width: `${touchScale * 100}%`,
                      aspectRatio: `${viewerAsset.width} / ${viewerAsset.height}`,
                      // Pan with translate only — no scaling of rasterised bitmap
                      transform: `translate(${touchPan.x}px, ${touchPan.y}px)`,
                    }}
                  >
                    {renderImage()}
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
