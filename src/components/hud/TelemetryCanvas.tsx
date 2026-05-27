"use client";

import { useEffect, useRef } from "react";

interface TelemetryCanvasProps {
  currentIndustry: "datacenter" | "water" | "care";
  activeCustomLoad: number;
  limitVal: number;
}

export function TelemetryCanvas({ currentIndustry, activeCustomLoad, limitVal }: TelemetryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      timeRef.current += 0.04;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // Adaptive main grid system (dark mode colors fixed for now)
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      let isViolating = false;
      let ratioVal = activeCustomLoad / limitVal;

      if (currentIndustry === "datacenter" || currentIndustry === "water") {
        isViolating = activeCustomLoad > limitVal;
      } else if (currentIndustry === "care") {
        // For care, activeCustomLoad is the generator power, limitVal is the needed power
        isViolating = activeCustomLoad < limitVal;
        ratioVal = limitVal / (activeCustomLoad || 1); // prevent div by zero
      }

      const activeColor = isViolating ? "#ef4444" : "#00f0ff";
      const glowValue = isViolating ? "rgba(239, 68, 68, 0.8)" : "rgba(0, 240, 255, 0.8)";

      // Draw State Limit Boundary Line
      const limitY = h * 0.45;
      ctx.beginPath();
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.moveTo(0, limitY);
      ctx.lineTo(w, limitY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#ef4444";
      ctx.font = "10px monospace";
      ctx.fillText("🚨 REGULATORY THRESHOLD", w - 195, limitY - 8);

      // Draw Telemetry Wave Curve
      ctx.beginPath();
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = glowValue;

      const baselineY = limitY + (ratioVal - 1) * -45;
      const constrainedY = Math.max(30, Math.min(h - 30, baselineY));

      const amplitude = Math.max(5, Math.min(35, ratioVal * 12));
      const frequency = 0.02;

      for (let x = 0; x < w; x++) {
        const y = constrainedY + Math.sin(x * frequency + timeRef.current) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Overlay status logs
      ctx.fillStyle = activeColor;
      ctx.font = "10px monospace";
      ctx.fillText("FACILITY_GRID_STATE: " + (isViolating ? "WARNING_OVER_LIMIT" : "SECURE_NOMINAL"), 20, 25);
      ctx.fillText("CALCULATOR_MODE: " + currentIndustry.toUpperCase() + "_INDEX_V2", 20, 40);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [currentIndustry, activeCustomLoad, limitVal]);

  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
