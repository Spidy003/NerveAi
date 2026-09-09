"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ── Config ──────────────────────────────────────────────
const TOTAL_FRAMES  = 300;
const SCROLL_HEIGHT = "2000vh"; // ~68px per frame at 1080p → smooth cinematic feel

const src = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

interface Props { id?: string; }

export default function ScrollVideoHero({ id }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs      = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const curIdx    = useRef(-1);
  const rafId     = useRef<number | null>(null);

  const [loaded,   setLoaded]   = useState(0);
  const [ready,    setReady]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── Render one frame, object-fit:cover via source-crop ──────────────
  const paint = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img    = imgs.current[idx];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    if (!W || !H) return;

    // Resize buffer only when needed
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width  = W;
      canvas.height = H;
    }

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const canvasRatio = W / H;
    const imgRatio    = iw / ih;

    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (imgRatio > canvasRatio) {
      // Image wider than canvas — crop sides
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
    } else {
      // Image taller than canvas — crop top/bottom
      sh = iw / canvasRatio;
      sy = (ih - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  }, []);

  // ── Preload all frames ───────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src(i + 1);
      imgs.current[i] = img;

      img.onload = img.onerror = () => {
        done++;
        setLoaded(done);
        if (done === TOTAL_FRAMES) {
          setReady(true);
          requestAnimationFrame(() => paint(0));
        }
      };
    }
  }, [paint]);

  // ── Scroll → frame ──────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const tick = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      // Use offsetTop for rock-solid position (no layout-thrash)
      const sectionTop    = wrap.offsetTop;
      const sectionHeight = wrap.offsetHeight;
      const scrollY       = window.scrollY;
      const maxScroll     = sectionHeight - window.innerHeight;
      const scrolledIn    = scrollY - sectionTop;

      if (scrolledIn > 40) setScrolled(true);

      // Clamp progress 0→1
      const progress = Math.max(0, Math.min(1, scrolledIn / maxScroll));

      // Map progress → frame index (0 to TOTAL_FRAMES-1)
      const target = Math.min(
        Math.floor(progress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      if (target !== curIdx.current) {
        curIdx.current = target;
        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => paint(target));
      }
    };

    window.addEventListener("scroll", tick, { passive: true });
    tick(); // init on mount
    return () => window.removeEventListener("scroll", tick);
  }, [ready, paint]);

  // ── Resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const c = canvasRef.current;
      if (c) { c.width = 0; c.height = 0; } // force buffer recalc
      paint(Math.max(0, curIdx.current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint]);

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <div
      id={id}
      ref={wrapRef}
      style={{ position: "relative", width: "100%", height: SCROLL_HEIGHT }}
    >
      {/* Sticky full-screen canvas shell */}
      <div style={{
        position  : "sticky",
        top       : 0,
        width     : "100%",
        height    : "100vh",
        overflow  : "hidden",
        background: "#000",
      }}>

        {/* ── Loading state ── */}
        {!ready && (
          <div style={{
            position      : "absolute",
            inset         : 0,
            display       : "flex",
            flexDirection : "column",
            alignItems    : "center",
            justifyContent: "center",
            background    : "#000",
            zIndex        : 20,
          }}>
            <div style={{
              width       : 200,
              height      : 1,
              background  : "rgba(255,255,255,0.07)",
              borderRadius: 99,
              overflow    : "hidden",
              marginBottom: 16,
            }}>
              <div style={{
                width      : `${pct}%`,
                height     : "100%",
                background : "#ffffff",
                transition : "width 0.1s linear",
              }}/>
            </div>
            <span style={{
              fontFamily  : "monospace",
              fontSize    : 10,
              color       : "rgba(255,255,255,0.2)",
              letterSpacing: "0.3em",
            }}>
              {pct} / 100
            </span>
          </div>
        )}

        {/* ── Canvas: fills sticky div edge to edge ── */}
        <canvas
          ref={canvasRef}
          style={{
            display : "block",
            position: "absolute",
            inset   : 0,
            width   : "100%",
            height  : "100%",
          }}
        />

        {/* ── Scroll hint ── */}
        {ready && !scrolled && (
          <div style={{
            position     : "absolute",
            bottom       : 44,
            left         : "50%",
            transform    : "translateX(-50%)",
            display      : "flex",
            flexDirection: "column",
            alignItems   : "center",
            gap          : 8,
            opacity      : 0.5,
            zIndex       : 10,
            pointerEvents: "none",
            animation    : "svhBounce 1.8s ease-in-out infinite",
          }}>
            <span style={{
              fontFamily  : "monospace",
              fontSize    : 10,
              color       : "#fff",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}>
              Scroll to explore
            </span>
            <svg width={14} height={14} viewBox="0 0 24 24"
                 fill="none" stroke="#fff" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        )}
      </div>

      <style>{`
        @keyframes svhBounce {
          0%,100% { transform: translateX(-50%) translateY(0px); }
          50%     { transform: translateX(-50%) translateY(8px);  }
        }
      `}</style>
    </div>
  );
}
