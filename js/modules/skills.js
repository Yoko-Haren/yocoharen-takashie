/**
 * Counts each skill percentage up from zero when its card scrolls into
 * view, in step with the bar that grows in CSS (css/sections/skills.css).
 * The real values stay in the HTML for visitors without JavaScript.
 */
const DURATION = 1400;
const START_DELAY = 200;
const STEP_DELAY = 120;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function countUp(el, delay) {
  const target = Number(el.dataset.count);
  setTimeout(() => {
    const start = performance.now();
    const frame = (now) => {
      const progress = Math.min(1, (now - start) / DURATION);
      el.textContent = `${Math.round(easeOutCubic(progress) * target)}%`;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, delay);
}

export function initSkills() {
  const cards = document.querySelectorAll('[data-skills]');
  if (!cards.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach((card) => {
    card.querySelectorAll('[data-count]').forEach((el) => { el.textContent = '0%'; });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Match the card's own reveal stagger so numbers and bars move together
      const cardDelay = parseInt(entry.target.style.getPropertyValue('--reveal-delay'), 10) || 0;
      entry.target.querySelectorAll('[data-count]').forEach((el, index) => {
        countUp(el, cardDelay + START_DELAY + index * STEP_DELAY);
      });
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  cards.forEach((card) => observer.observe(card));
}
