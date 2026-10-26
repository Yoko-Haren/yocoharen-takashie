/**
 * Scroll reveal: elements marked data-reveal fade up the first time they
 * enter the screen. Inside a [data-stagger] container they arrive one
 * after another (the attribute value is the gap in milliseconds).
 */
export function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');

  document.querySelectorAll('[data-stagger]').forEach((group) => {
    const step = Number(group.dataset.stagger) || 90;
    group.querySelectorAll('[data-reveal]').forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${index * step}ms`);
    });
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}
