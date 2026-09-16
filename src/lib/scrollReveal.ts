'use client';

/**
 * Scroll-Linked Reveal Controller
 *
 * Progressively uncovers elements based directly on scroll position relative to viewport:
 * scroll position → reveal progress (0.0 to 1.0)
 *
 * - Slow scroll: content reveals slowly in direct sync with scroll
 * - Stopped scroll: content remains at current reveal state
 * - Continued scroll: content continues uncovering
 * - Settled (progress >= 1): inline styles cleared, settles into exact existing design
 * - Fast scroll: settles immediately without queued delays or jumps
 * - Respects prefers-reduced-motion
 */

import { getLenis } from './smoothScroll';

let activeCleanup: (() => void) | null = null;

export function initScrollReveal(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Clean up any existing listeners
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  let ticking = false;
  let rafId: number | null = null;

  const updateReveals = () => {
    ticking = false;
    const elements = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
    if (!elements || elements.length === 0) return;

    const vh = window.innerHeight;
    // Reveal window: starts when top enters 95% of viewport, settles completely at 65% of viewport
    const startY = vh * 0.95;
    const endY = vh * 0.65;
    const distance = startY - endY;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const rect = el.getBoundingClientRect();

      // If element is scrolled above viewport, keep it fully settled
      if (rect.bottom < 0) {
        if (el.dataset.revealed !== 'settled') {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.clipPath = '';
          el.style.willChange = '';
          el.dataset.revealed = 'settled';
        }
        continue;
      }

      // If element is below start threshold, keep at initial state
      if (rect.top >= startY) {
        if (el.dataset.revealed !== 'below') {
          el.style.opacity = '0.06';
          el.style.transform = 'translateY(28px) scale(0.985)';
          el.style.willChange = 'transform, opacity';
          el.dataset.revealed = 'below';
        }
        continue;
      }

      // If element has reached or passed end threshold, settle completely
      if (rect.top <= endY) {
        if (el.dataset.revealed !== 'settled') {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.willChange = '';
          el.dataset.revealed = 'settled';
        }
        continue;
      }

      // Inside reveal window: directly calculate progress (0.0 to 1.0)
      const rawProgress = (startY - rect.top) / distance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      el.dataset.revealed = 'revealing';
      el.style.opacity = (0.06 + progress * 0.94).toFixed(3);
      const translateY = ((1 - progress) * 28).toFixed(1);
      const scale = (0.985 + progress * 0.015).toFixed(4);

      el.style.transform = `translateY(${translateY}px) scale(${scale})`;
      el.style.willChange = 'transform, opacity';
    }
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      rafId = requestAnimationFrame(updateReveals);
    }
  };

  // Run initial pass immediately so already-visible elements settle with zero flash
  updateReveals();

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });

  const lenis = getLenis();
  if (lenis && typeof lenis.on === 'function') {
    lenis.on('scroll', requestUpdate);
  }

  activeCleanup = () => {
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
    const activeLenis = getLenis();
    if (activeLenis && typeof activeLenis.off === 'function') {
      activeLenis.off('scroll', requestUpdate);
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    // Clean up inline styles on unmount
    const elements = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
    elements.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.clipPath = '';
      el.style.willChange = '';
      delete el.dataset.revealed;
    });
  };

  return activeCleanup;
}
