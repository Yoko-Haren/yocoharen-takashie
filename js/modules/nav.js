/**
 * Header behaviour:
 * - a frosted background once the page scrolls
 * - the full-screen mobile menu (button, Escape key, link clicks)
 * - highlighting the link of the section currently on screen
 */
export function initNav() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const toggle = header.querySelector('[data-nav-toggle]');
  const toggleLabel = toggle.querySelector('.visually-hidden');
  const links = [...header.querySelectorAll('.nav__link')];
  const pageParts = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean);

  // Frosted header after a little scrolling
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile menu
  const setMenu = (open) => {
    header.classList.toggle('is-menu-open', open);
    document.documentElement.classList.toggle('is-locked', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Close menu' : 'Open menu';
    // Keeps keyboard focus inside the menu while it covers the page
    pageParts.forEach((part) => { part.inert = open; });
  };

  toggle.addEventListener('click', () => setMenu(!header.classList.contains('is-menu-open')));
  links.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 60em)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  // Scrollspy: the section crossing the middle of the screen is "current"
  const sections = document.querySelectorAll('main > section[id]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const isCurrent = link.hash === `#${entry.target.id}`;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => spy.observe(section));
}
