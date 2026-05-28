/*
  Script principal do portfólio.
  Boas práticas aplicadas:
  - enums imutáveis com Object.freeze;
  - seletores centralizados;
  - funções pequenas e com responsabilidade única;
  - validação de elementos antes de manipular o DOM.
*/

const CssClass = Object.freeze({
  MENU_OPEN: 'is-open',
  HEADER_SCROLLED: 'is-scrolled',
});

const Selector = Object.freeze({
  MENU: '[data-menu]',
  MENU_BUTTON: '[data-menu-button]',
  HEADER: '[data-header]',
  NAV_LINK: '.nav a',
});

const menu = document.querySelector(Selector.MENU);
const menuButton = document.querySelector(Selector.MENU_BUTTON);
const header = document.querySelector(Selector.HEADER);

function toggleMenu() {
  if (!menu || !menuButton) return;

  const isOpen = menu.classList.toggle(CssClass.MENU_OPEN);
  menuButton.setAttribute('aria-expanded', String(isOpen));
}

function closeMenuOnNavigation() {
  if (!menu || !menuButton) return;

  document.querySelectorAll(Selector.NAV_LINK).forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove(CssClass.MENU_OPEN);
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle(CssClass.HEADER_SCROLLED, window.scrollY > 24);
}

function init() {
  menuButton?.addEventListener('click', toggleMenu);
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  closeMenuOnNavigation();
  updateHeaderState();
}

init();
