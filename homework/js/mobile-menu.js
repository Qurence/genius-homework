const mobileMenu = document.querySelector('.mobile-menu');
const menuBtnOpen = document.querySelector('.menu-btn-open');
const menuBtnCloseItems = document.querySelectorAll('.menu-btn-close');

const toggleMenu = () => {
  mobileMenu.classList.toggle('is-open');
};

menuBtnOpen.addEventListener('click', toggleMenu);

menuBtnCloseItems.forEach(item => {
  item.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
});
