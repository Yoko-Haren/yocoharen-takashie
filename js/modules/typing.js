/**
 * Typing effect for the hero title.
 * Reads the roles from data-typed="Role one|Role two|..." and types,
 * holds, then deletes each one in turn. The first role is already in the
 * HTML, so the line still makes sense without JavaScript.
 */
const TYPE_DELAY = 70;
const DELETE_DELAY = 38;
const HOLD_DELAY = 1900;
const NEXT_WORD_DELAY = 350;

export function initTyping() {
  const target = document.querySelector('[data-typed]');
  if (!target) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const words = target.dataset.typed.split('|');
  const caret = target.nextElementSibling;
  let wordIndex = 0;
  let length = words[0].length;
  let deleting = true;

  const tick = () => {
    const word = words[wordIndex];
    caret?.classList.add('is-typing');

    if (deleting) {
      length -= 1;
      target.textContent = word.slice(0, length);
      if (length > 0) return setTimeout(tick, DELETE_DELAY);
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      return setTimeout(tick, NEXT_WORD_DELAY);
    }

    length += 1;
    target.textContent = words[wordIndex].slice(0, length);
    if (length < words[wordIndex].length) return setTimeout(tick, TYPE_DELAY);

    // Word finished: let the caret blink while it rests
    deleting = true;
    caret?.classList.remove('is-typing');
    return setTimeout(tick, HOLD_DELAY);
  };

  // Wait for the hero entrance to finish before the first delete
  setTimeout(tick, HOLD_DELAY + 1400);
}
