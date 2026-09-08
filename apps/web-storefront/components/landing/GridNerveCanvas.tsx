"use client";

import React, { useEffect, useRef } from "react";

export default function GridNerveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Pulse nodes configuration
    const gridSize = 50;
    const nodes: { x: number; y: number; alpha: number; speed: number; maxAlpha: number }[] = [];
    
    // Create random pulse points at grid intersections
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);
    for (let i = 0; i < 35; i++) {
      nodes.push({
        x: Math.floor(Math.random() * cols) * gridSize,
        y: Math.floor(Math.random() * rows) * gridSize,
        alpha: Math.random(),
        speed: 0.008 + Math.random() * 0.015,
        maxAlpha: 0.4 + Math.random() * 0.6,
      });
    }

    // Moving signal pulses along grid lines
    const pulses: { x: number; y: number; length: number; speed: number; dir: "h" | "v" }[] = [];
    for (let i = 0; i < 14; i++) {
      pulses.push({
        x: Math.floor(Math.random() * cols) * gridSize,
        y: Math.floor(Math.random() * rows) * gridSize,
        length: 40 + Math.random() * 80,
        speed: 1.5 + Math.random() * 2.5,
        dir: Math.random() > 0.5 ? "h" : "v",
      });
    }

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle base grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(45, 225, 194, 0.035)";
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Animate and draw pulsing signal packets traveling along lines
      pulses.forEach((p) => {
        const grad = ctx.createLinearGradient(
          p.x,
          p.y,
          p.dir === "h" ? p.x + p.length : p.x,
          p.dir === "v" ? p.y + p.length : p.y
        );
        grad.addColorStop(0, "rgba(45, 225, 194, 0)");
        grad.addColorStop(0.5, "rgba(45, 225, 194, 0.6)");
        grad.addColorStop(1, "rgba(108, 92, 231, 0.8)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        if (p.dir === "h") {
          ctx.lineTo(p.x + p.length, p.y);
          p.x += p.speed;
          if (p.x > width + 100) {
            p.x = -100;
            p.y = Math.floor(Math.random() * rows) * gridSize;
          }
        } else {
          ctx.lineTo(p.x, p.y + p.length);
          p.y += p.speed;
          if (p.y > height + 100) {
            p.y = -100;
            p.x = Math.floor(Math.random() * cols) * gridSize;
          }
        }
        ctx.stroke();
      });

      // 3. Draw pulsing synaptic nodes at intersections
      nodes.forEach((node) => {
        node.alpha += node.speed;
        if (node.alpha > node.maxAlpha || node.alpha < 0.05) {
          node.speed = -node.speed;
        }

        ctx.fillStyle = `rgba(45, 225, 194, ${Math.max(0, node.alpha)})`;
        ctx.shadowColor = "#2DE1C2";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Crosshairs on high alpha
        if (node.alpha > 0.5) {
          ctx.strokeStyle = `rgba(45, 225, 194, ${node.alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x - 5, node.y);
          ctx.lineTo(node.x + 5, node.y);
          ctx.moveTo(node.x, node.y - 5);
          ctx.lineTo(node.x, node.y + 5);
          ctx.stroke();
        }
        ctx.shadowBlur = 0; // reset
      });

      t++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
