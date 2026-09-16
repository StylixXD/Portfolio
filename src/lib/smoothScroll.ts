'use client';

import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function getLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  return lenisInstance || (window as unknown as { __lenis?: Lenis }).__lenis || null;
}

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Clean up any stale instances before instantiating
  destroySmoothScroll();

  // If user prefers reduced motion, rely on standard instant/reduced behavior
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: false, // We control anchor navigation explicitly
  });

  lenisInstance = lenis;
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

  function raf(time: number) {
    if (lenisInstance) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
  }

  rafId = requestAnimationFrame(raf);

  return () => {
    destroySmoothScroll();
  };
}

export function destroySmoothScroll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (typeof window !== 'undefined') {
    delete (window as unknown as { __lenis?: Lenis }).__lenis;
  }
}

/**
 * Smoothly scrolls to target section with header offset clearance.
 * Uses active Lenis instance if available, with rock-solid native fallback.
 */
export function scrollToSection(targetId: string, customOffset: number = 0) {
  if (typeof window === 'undefined') return;

  const cleanId = targetId.replace(/^#/, '');

  if (cleanId === 'top' || cleanId === '') {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        force: true,
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    try {
      window.history.pushState(null, '', window.location.pathname);
    } catch {}
    return;
  }

  const targetEl = document.getElementById(cleanId);
  if (!targetEl) {
    console.warn(`[smoothScroll] Target section #${cleanId} not found in DOM.`);
    return;
  }

  // Update hash in URL cleanly without triggering page jump
  try {
    window.history.pushState(null, '', `#${cleanId}`);
  } catch {}

  const lenis = getLenis();
  let lenisDispatched = false;

  if (lenis && typeof lenis.scrollTo === 'function') {
    try {
      if (typeof lenis.start === 'function') {
        lenis.start();
      }
      // Pass selector '#id' directly for Lenis's internal querySelector
      lenis.scrollTo('#' + cleanId, {
        offset: customOffset,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        force: true,
      });
      lenisDispatched = true;
    } catch (err) {
      console.warn('[smoothScroll] Lenis.scrollTo error, falling back to native', err);
    }
  }

  // Safety fallback: if Lenis wasn't active or fails to start scrolling within 120ms, trigger native smooth scroll
  const startScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  setTimeout(() => {
    if (Math.abs(window.scrollY - startScrollY) < 2) {
      try {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        const rect = targetEl.getBoundingClientRect();
        const targetScrollY = rect.top + window.scrollY - 80;
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth',
        });
      }
    }
  }, 120);
}
