/**
 * Gentle 3D tilt that follows the pointer over project previews.
 * Writes --rx / --ry on each [data-tilt] element; the CSS turns them into a
 * perspective rotation. Skipped on touch screens and for reduced motion.
 */
const MAX_TILT = 6; // degrees

export function initTilt() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduceMotion) return;

  document.querySelectorAll('[data-tilt]').forEach((el) => {
    let frame = 0;

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(x * MAX_TILT).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * MAX_TILT).toFixed(2)}deg`);
      });
    });

    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}
