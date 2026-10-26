/**
 * Floating back-to-top button. It appears after the first screen, and
 * --scroll (0 to 1) fills the ring around it as the page is read.
 */
export function initBackToTop() {
  const button = document.querySelector('[data-to-top]');
  if (!button) return;

  let queued = false;

  const update = () => {
    queued = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    button.style.setProperty('--scroll', progress.toFixed(4));
    button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
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
