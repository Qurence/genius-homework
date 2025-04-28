const modal = document.querySelector('.backdrop');
const modalBtnOpen = document.querySelector('.modal-btn-open');
const modalBtnClose = document.querySelector('.modal-btn-close');

const tooggleModal = () => modal.classList.toggle('is-hidden');

modalBtnOpen.addEventListener('click', tooggleModal);
modalBtnClose.addEventListener('click', tooggleModal);