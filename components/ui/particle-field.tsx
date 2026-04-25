'use client';

import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';

// Lightweight canvas-based particle field adapted from 21st.dev's
// "Particles" pattern, trimmed down: no mouse magnetism, no dpr scaling
// overhead, and capped at ~40 drifting motes so it scales without
// hitting the frame budget. Dust-mote feel with a slow upward drift —
// suggests data flowing rather than a starfield.
//
// Absolute-positioned; must live inside a `relative` parent.

interface ParticleFieldProps {
  className?: string;
  /** Particle count. Default 40. */
  count?: number;
  /** CSS colour (rgb / hex / named). */
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  alpha: number;
}

export function ParticleField({
  className,
  count = 40,
  color = 'rgba(18, 53, 36, 0.35)'
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Skip animation entirely if the user prefers reduced motion.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let width = 0;
    let height = 0;
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.3,
      r: 0.7 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(0.12 + Math.random() * 0.3),
      life: 0,
      maxLife: 400 + Math.random() * 500,
      alpha: 0
    });

    const particles: Particle[] = Array.from({ length: count }, () => {
      const p = spawn();
      // Start mid-life so the first frame is not empty.
      p.life = Math.random() * p.maxLife;
      p.y = Math.random() * height;
      return p;
    });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.life += 1;
        if (p.life >= p.maxLife || p.y < -5) {
          Object.assign(p, spawn());
          continue;
        }
        // Fade in, hold, fade out.
        const t = p.life / p.maxLife;
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;

        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = p.alpha * 0.9;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
    />
  );
}
