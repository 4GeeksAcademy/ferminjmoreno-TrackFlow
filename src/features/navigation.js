export const setupMobileMenu = () => {
  const menuBtn = document.querySelector('#hamburger-btn');
  const mobileMenu = document.querySelector('#mobile-menu');
  const hamburgerIcon = document.querySelector('#hamburger-icon');
  const closeIcon = document.querySelector('#close-icon');

  if (!menuBtn || !mobileMenu || !hamburgerIcon || !closeIcon) {
    return;
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('hidden', isOpen);
    hamburgerIcon.classList.toggle('hidden', !isOpen);
    closeIcon.classList.toggle('hidden', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
};
