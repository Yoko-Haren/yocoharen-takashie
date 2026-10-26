import { showToast } from './toast.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact helpers:
 * - copy buttons for the email address and phone number
 * - a message form that checks its fields, then opens the visitor's
 *   email app with the message filled in (a static site has no server)
 */
export function initContact() {
  initCopyButtons();
  initMessageForm();
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.classList.add('is-copied');
        showToast('Copied to clipboard');
        setTimeout(() => button.classList.remove('is-copied'), 1800);
      } catch {
        showToast('Copying is blocked here. Please copy it by hand.');
      }
    });
  });
}

function initMessageForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const setInvalid = (field, invalid) => {
    field.setAttribute('aria-invalid', String(invalid));
    const error = document.getElementById(`${field.id}-error`);
    if (error) error.hidden = !invalid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { name, email, message } = form.elements;

    const checks = [
      [name, name.value.trim() !== ''],
      [email, EMAIL_PATTERN.test(email.value.trim())],
      [message, message.value.trim() !== ''],
    ];
    checks.forEach(([field, valid]) => setInvalid(field, !valid));

    const firstInvalid = checks.find(([, valid]) => !valid);
    if (firstInvalid) {
      firstInvalid[0].focus();
      return;
    }

    const subject = `Hello from ${name.value.trim()}`;
    const body = `${message.value.trim()}\n\n${name.value.trim()}\n${email.value.trim()}`;
    window.location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showToast('Opening your email app…');
    form.reset();
  });

  // Clear a field's error as soon as the visitor starts fixing it
  form.addEventListener('input', (event) => {
    if (event.target.getAttribute('aria-invalid') === 'true') setInvalid(event.target, false);
  });
}
