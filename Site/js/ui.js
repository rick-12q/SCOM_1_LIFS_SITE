document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.main-nav');
  const year = document.querySelector('[data-current-year]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen? t("nav.closeMenu"): t("nav.menu");
    });
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
});
document.addEventListener("languagechange", () => {
  if (!toggle) {
    return;
  }

  const isOpen =
    toggle.getAttribute("aria-expanded") === "true";

  toggle.textContent = isOpen
    ? t("nav.closeMenu")
    : t("nav.menu");
});