/**
 * Keeps the GitHub card's repository count current using the public GitHub
 * API. It only asks once the contact section comes near the screen, and the
 * number already written in the HTML stays if the request fails.
 */
const GITHUB_USER = 'Yoko-Haren';

export function initGitHubStats() {
  const target = document.querySelector('[data-github-repos]');
  if (!target || !('IntersectionObserver' in window)) return;

  const load = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!response.ok) return;
      const { public_repos: count } = await response.json();
      if (Number.isInteger(count)) {
        target.textContent = `${count} public ${count === 1 ? 'repository' : 'repositories'}`;
      }
    } catch {
      // Offline or blocked: keep the static text
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    load();
  }, { rootMargin: '400px 0px' });

  observer.observe(target);
}
