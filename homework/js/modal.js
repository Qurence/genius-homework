const modal = document.querySelector('.backdrop');
const modalBtnOpen = document.querySelector('.modal-btn-open');
const modalBtnClose = document.querySelector('.modal-btn-close');

const tooggleModal = () => {
    modal.classList.toggle('is-hidden');
    document.body.classList.toggle('body-no-scroll'); 
  };

modalBtnOpen.addEventListener('click', tooggleModal);
modalBtnClose.addEventListener('click', tooggleModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      tooggleModal();
    }
  });