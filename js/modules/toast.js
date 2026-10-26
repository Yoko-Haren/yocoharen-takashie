/**
 * Small status message at the bottom of the screen. The element has
 * role="status", so screen readers announce each message too.
 */
const VISIBLE_MS = 2600;
let hideTimer = 0;

export function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => toast.classList.remove('is-visible'), VISIBLE_MS);
}
