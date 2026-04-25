'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

// Cinematic dark/light toggle adapted from 21st.dev/omrohilla6/cinematic-
// theme-switcher. Same engine — pill track + spring-bouncy thumb + radial
// particle burst on toggle — with one substitution: the slate/navy palette
// from the original is swapped for Rooted's phthalo-and-cream brand tones
// so the toggle reads on the same surface as the cards. Dark-mode visuals
// are deliberately tuned to the locked dark theme; light mode lives on
// cream with a forest-green thumb.
//
// SSR placeholder reserves the same 64×104 footprint so the navbar layout
// doesn't shift when the toggle hydrates.

interface Particle {
  id: number;
  delay: number;
  duration: number;
}

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  useEffect(() => setMounted(true), []);

  const generateParticles = () => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 3; i += 1) {
      newParticles.push({
        id: i,
        delay: i * 0.1,
        duration: 0.6 + i * 0.1
      });
    }
    setParticles(newParticles);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  const handleToggle = () => {
    generateParticles();
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="relative flex h-[40px] w-[72px] items-center rounded-full" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleToggle}
        className="relative flex h-[40px] w-[72px] items-center rounded-full p-[4px] transition-all duration-300 focus:outline-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at top left, oklch(24% 0.03 155) 0%, oklch(18% 0.025 155) 40%, oklch(12% 0.02 155) 100%)'
            : 'radial-gradient(ellipse at top left, #ffffff 0%, #f5f0e8 40%, #e8e0d0 100%)',
          boxShadow: isDark
            ? `
              inset 3px 3px 8px rgba(0, 0, 0, 0.7),
              inset -3px -3px 8px rgba(74, 153, 112, 0.15),
              inset 0 1px 2px rgba(0, 0, 0, 0.8),
              0 1px 1px rgba(245, 240, 232, 0.04),
              0 4px 12px rgba(0, 0, 0, 0.4)
            `
            : `
              inset 3px 3px 8px rgba(168, 152, 130, 0.35),
              inset -3px -3px 8px rgba(255, 255, 255, 1),
              inset 0 1px 2px rgba(168, 152, 130, 0.3),
              0 1px 1px rgba(255, 255, 255, 1),
              0 4px 12px rgba(18, 53, 36, 0.08)
            `,
          border: isDark
            ? '1.5px solid rgba(74, 153, 112, 0.25)'
            : '1.5px solid rgba(18, 53, 36, 0.15)'
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        role="switch"
        aria-checked={isDark}
        whileTap={{ scale: 0.97 }}
      >
        {/* Background icons (greyed out in their off state) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[10px]">
          <Sun
            size={14}
            className={isDark ? 'text-[#F5F0E8]/40' : 'text-[#123524]/30'}
          />
          <Moon
            size={14}
            className={isDark ? 'text-[#F5F0E8]/30' : 'text-[#123524]/40'}
          />
        </div>

        {/* Sliding thumb — fills nearly the entire pill height. The previous
            toggle's thumb was undersized vs its pill, so the icon looked
            half-covered. This thumb is 30×30 inside a 40×72 pill (track
            inner height ~32) — covers the icon fully, with consistent
            margin on all sides. */}
        <motion.div
          className="relative z-10 flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full"
          style={{
            background: isDark
              ? 'linear-gradient(145deg, #4a9970 0%, #2d6b4d 50%, #1a4030 100%)'
              : 'linear-gradient(145deg, #1f5238 0%, #123524 50%, #0a1f15 100%)',
            boxShadow: isDark
              ? `
                inset 1px 1px 2px rgba(115, 200, 160, 0.4),
                inset -1px -1px 2px rgba(0, 0, 0, 0.6),
                0 4px 12px rgba(0, 0, 0, 0.5)
              `
              : `
                inset 1px 1px 2px rgba(74, 153, 112, 0.3),
                inset -1px -1px 2px rgba(0, 0, 0, 0.6),
                0 4px 12px rgba(18, 53, 36, 0.35)
              `,
            border: isDark
              ? '1px solid rgba(115, 200, 160, 0.4)'
              : '1px solid rgba(74, 153, 112, 0.5)'
          }}
          animate={{ x: isDark ? 32 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Particle burst on toggle */}
          {isAnimating &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    background: isDark
                      ? 'radial-gradient(circle, rgba(245, 240, 232, 0.55) 0%, rgba(245, 240, 232, 0) 70%)'
                      : 'radial-gradient(circle, rgba(74, 153, 112, 0.7) 0%, rgba(74, 153, 112, 0) 70%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isDark ? 5 : 7, opacity: [0, 1, 0] }}
                  transition={{
                    duration: isDark ? 0.5 : particle.duration,
                    delay: particle.delay,
                    ease: 'easeOut'
                  }}
                />
              </motion.div>
            ))}

          {/* Active icon — sized so its bounding box clearly fills the
              thumb without crowding the rim. */}
          <div className="relative z-10">
            {isDark ? (
              <Moon size={16} className="text-[#F5F0E8]" />
            ) : (
              <Sun size={16} className="text-[#F5F0E8]" />
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
