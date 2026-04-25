/**
 * motion.ts
 *
 * IntersectionObserver-driven reveal animations for the portfolio.
 * Honors prefers-reduced-motion (no-ops everything).
 * Re-initializes on Astro View Transitions (`astro:page-load`) and tears down
 * on `astro:before-swap` to avoid leaks across navigations.
 */

const REVEAL_SELECTOR = '[data-reveal]:not(.is-visible)';
const VISIBLE_CLASS = 'is-visible';
const ONCE_ATTR = 'data-reveal-once';

type RevealElement = HTMLElement;

const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const markAllVisible = (): void => {
  const targets = document.querySelectorAll<RevealElement>('[data-reveal]');
  targets.forEach((el) => el.classList.add(VISIBLE_CLASS));
};

/**
 * Initialize reveal observer for the current document.
 * Returns a disposer that disconnects the observer.
 */
export function initReveal(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  if (isReducedMotion()) {
    markAllVisible();
    return () => {};
  }

  if (typeof IntersectionObserver === 'undefined') {
    // Graceful fallback for very old browsers: just show everything.
    markAllVisible();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as RevealElement;
        el.classList.add(VISIBLE_CLASS);
        if (el.hasAttribute(ONCE_ATTR)) {
          obs.unobserve(el);
        }
      }
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12,
    },
  );

  const targets = document.querySelectorAll<RevealElement>(REVEAL_SELECTOR);
  targets.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}

let activeDisposer: (() => void) | null = null;
let lifecycleAttached = false;

const teardown = (): void => {
  if (activeDisposer) {
    activeDisposer();
    activeDisposer = null;
  }
};

const setup = (): void => {
  teardown();
  activeDisposer = initReveal();
};

/**
 * Wire up the reveal lifecycle to Astro's View Transitions events.
 * Idempotent — safe to call from multiple component scripts on the same page.
 */
export function attachReveal(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (lifecycleAttached) {
    // Re-scan in case new [data-reveal] nodes were added (e.g. another Reveal
    // component initialized after the first attachReveal call on this page).
    setup();
    return;
  }

  lifecycleAttached = true;

  // Initial run for the current document.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }

  // Astro View Transitions lifecycle.
  document.addEventListener('astro:page-load', setup);
  document.addEventListener('astro:before-swap', teardown);
}
