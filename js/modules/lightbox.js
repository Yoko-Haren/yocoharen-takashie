/**
 * Certificate viewer built on the native <dialog> element, which already
 * handles focus, the Escape key and screen-reader semantics.
 *
 * Each trigger is a plain link to the full-size image
 * (<a href="..." data-lightbox data-caption="...">), so without
 * JavaScript the certificate still opens on its own page.
 */
const CLOSE_ANIMATION_MS = 220;

export function initLightbox() {
  const dialog = document.querySelector('[data-lightbox-dialog]');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('.lightbox__img');
  const caption = dialog.querySelector('.lightbox__caption');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let opener = null;

  const open = (link) => {
    opener = link;
    image.src = link.href;
    image.alt = link.dataset.caption;
    caption.textContent = link.dataset.caption;
    dialog.showModal();
    document.documentElement.classList.add('is-locked');
  };

  const close = () => {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (reduceMotion.matches) {
      dialog.close();
      return;
    }
    dialog.classList.add('is-closing');
    setTimeout(() => {
      dialog.classList.remove('is-closing');
      dialog.close();
    }, CLOSE_ANIMATION_MS);
  };

  document.querySelectorAll('[data-lightbox]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      open(link);
    });
  });

  dialog.querySelector('[data-lightbox-close]').addEventListener('click', close);

  // A click on the dark area around the certificate lands on the dialog itself
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  // Escape: play the closing animation instead of closing instantly
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('is-locked');
    opener?.focus();
  });
}
