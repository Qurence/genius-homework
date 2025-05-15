document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider li");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  const totalSlides = slides.length;
  const slidesToShow = 3;

  // Добавляем клоны
  for (let i = 0; i < totalSlides; i++) {
    const cloneFirst = slides[i].cloneNode(true);
    const cloneLast = slides[i].cloneNode(true);
    slider.appendChild(cloneFirst); // Клоны в конец
    slider.insertBefore(cloneLast, slides[0]); // Клоны в начало
  }

  const allSlides = document.querySelectorAll(".slider li");
  const totalSlidesWithClones = allSlides.length;

  // Устанавливаем начальный индекс на первый оригинальный слайд
  currentIndex = totalSlides;
  slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;

  function updateSlider(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;

    const dotIndex = (currentIndex - totalSlides) % totalSlides;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });
  }

  slider.addEventListener("transitionend", () => {
    if (currentIndex >= totalSlidesWithClones - totalSlides) {
      // Если достигли клона в конце, перемещаемся к оригинальному началу
      currentIndex = totalSlides;
      updateSlider(false);
    } else if (currentIndex < totalSlides) {
      // Если достигли клона в начале, перемещаемся к последнему оригинальному слайду
      currentIndex = totalSlidesWithClones - totalSlides * 2 + totalSlides - 1;
      updateSlider(false);
    }
  });

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    updateSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = totalSlides + index;
      updateSlider();
    });
  });

  updateSlider();
});