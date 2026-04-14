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
const MIN_ZOOM_TOUCH = 1;
const MAX_ZOOM_TOUCH = 5;

function clampZoom(value: number, isTouch: boolean) {
  const max = isTouch ? MAX_ZOOM_TOUCH : MAX_ZOOM;
  return Math.max(MIN_ZOOM, Math.min(max, value));
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

  // Touch gesture state
  const touchState = useRef<{
    touches: Touch[];
    initialDistance: number;
    initialZoom: number;
    panX: number;
    panY: number;
    startPanX: number;
    startPanY: number;
  }>({
    touches: [],
    initialDistance: 0,
    initialZoom: 1,
    panX: 0,
    panY: 0,
    startPanX: 0,
    startPanY: 0
  });

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [touchPan, setTouchPan] = useState({ x: 0, y: 0 });

  // Detect touch device on mount
  useEffect(() => {
    const isTouchPointer = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouchPointer);
  }, []);

  function openViewer() {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setZoom(1);
    setTouchPan({ x: 0, y: 0 });
    setIsOpen(true);
    if (isTouchDevice) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }

  function closeViewer() {
    setIsOpen(false);
    setShowHint(false);
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === "function") {
      lastFocusedRef.current.focus();
    }
  }

  function applyZoom(next: number | ((current: number) => number)) {
    setZoom((current) => {
      const value = typeof next === "function" ? next(current) : next;
      return clampZoom(value, isTouchDevice);
    });
  }

  // Touch gesture handlers
  function getTouchDistance(touches: TouchList) {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length === 1) {
      // Single touch - prepare for pan
      const touch = event.touches[0];
      touchState.current.startPanX = touch.clientX;
      touchState.current.startPanY = touch.clientY;
    } else if (event.touches.length === 2) {
      // Two fingers - pinch zoom
      const distance = getTouchDistance(event.touches);
      touchState.current.initialDistance = distance;
      touchState.current.initialZoom = zoom;
    }
  }

  function handleTouchMove(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length === 1) {
      // Single touch pan
      const touch = event.touches[0];
      const deltaX = touch.clientX - touchState.current.startPanX;
      const deltaY = touch.clientY - touchState.current.startPanY;

      // Only pan if zoomed in
      if (zoom > 1.05) {
        setTouchPan({ x: deltaX, y: deltaY });
      }
    } else if (event.touches.length === 2) {
      // Two finger pinch zoom
      const distance = getTouchDistance(event.touches);
      if (touchState.current.initialDistance > 0) {
        const scale = distance / touchState.current.initialDistance;
        const newZoom = touchState.current.initialZoom * scale;
        applyZoom(clampZoom(newZoom, true));
      }
    }
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    // Reset pan when touch ends
    if (event.touches.length === 0) {
      setTouchPan({ x: 0, y: 0 });
      touchState.current.startPanX = 0;
      touchState.current.startPanY = 0;
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      }

      // Only handle keyboard shortcuts on desktop
      if (!isTouchDevice) {
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
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isTouchDevice]);

  useEffect(() => {
    if (!isOpen || !viewportRef.current) return;
    viewportRef.current.scrollTop = 0;
    viewportRef.current.scrollLeft = 0;
  }, [isOpen]);

  function zoomIn() {
    setZoom((current) => clampZoom(current + 0.3, false));
  }

  function zoomOut() {
    setZoom((current) => clampZoom(current - 0.3, false));
  }

  function resetZoom() {
    setZoom(1);
    setTouchPan({ x: 0, y: 0 });
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
    setZoom((current) => clampZoom(current + delta, false));
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
              if (event.target === event.currentTarget && !isTouchDevice) {
                closeViewer();
              }
            }}
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
              {!isTouchDevice ? (
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
              ) : (
                <div className={styles.toolbarTouch}>
                  <button type="button" className={styles.closeTouch} onClick={closeViewer} aria-label="Fechar">
                    ✕
                  </button>
                  {showHint && (
                    <motion.div
                      className={styles.hint}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Beliscá para ampliar · Arraste para navegar
                    </motion.div>
                  )}
                </div>
              )}

              <div
                ref={viewportRef}
                className={`${styles.viewport} ${isTouchDevice ? styles.viewportTouch : ""}`}
                onPointerDown={!isTouchDevice ? startPan : undefined}
                onPointerMove={!isTouchDevice ? movePan : undefined}
                onPointerUp={!isTouchDevice ? endPan : undefined}
                onPointerCancel={!isTouchDevice ? endPan : undefined}
                onWheel={!isTouchDevice ? handleWheel : undefined}
                onTouchStart={isTouchDevice ? handleTouchStart : undefined}
                onTouchMove={isTouchDevice ? handleTouchMove : undefined}
                onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
              >
                <div
                  className={styles.canvas}
                  style={
                    isTouchDevice
                      ? {
                          width: `${zoom * 100}%`,
                          aspectRatio: `${asset.width} / ${asset.height}`,
                          transform: `translate(${touchPan.x}px, ${touchPan.y}px)`,
                          transformOrigin: "center",
                          transition: "transform 0.05s linear"
                        }
                      : {
                          width: `${zoom * 100}%`,
                          aspectRatio: `${asset.width} / ${asset.height}`
                        }
                  }
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
