const swiper = new Swiper('.mySwiper', {
    loop: true,
    loopAdditionalSlides: 3,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        centeredSlides: false,
      },
    },
  });
  