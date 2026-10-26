/**
 * Draws a timeline's line as the reader scrolls through it.
 * Sets --progress (0 to 1) on each [data-timeline] list; the CSS scales
 * the line by that amount.
 */
export function initTimeline() {
  const timelines = document.querySelectorAll('[data-timeline]');
  if (!timelines.length) return;

  let queued = false;

  const update = () => {
    queued = false;
    // The tip of the line follows a point 60% of the way down the screen
    const anchor = window.innerHeight * 0.6;
    timelines.forEach((list) => {
      const rect = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      list.style.setProperty('--progress', progress.toFixed(3));
    });
  };

  const requestUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}
