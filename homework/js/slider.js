document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider li");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  const totalSlides = slides.length;
  const slidesToShow = 3;

  for (let i = 0; i < totalSlides; i++) {
    const cloneFirst = slides[i].cloneNode(true);
    const cloneLast = slides[i].cloneNode(true);
    slider.appendChild(cloneFirst);
    slider.insertBefore(cloneLast, slides[0]);
  }

  const allSlides = document.querySelectorAll(".slider li");
  const totalSlidesWithClones = allSlides.length;

  currentIndex = totalSlides;
  slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;

  function updateSlider(transition = true) {
    if (transition) {
      slider.style.transition = "transform 0.5s ease-in-out";
    } else {
      slider.style.transition = "none";
    }
    slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;


    const dotIndex = currentIndex % totalSlides;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });
  }

  slider.addEventListener("transitionend", () => {
    if (currentIndex >= totalSlidesWithClones - totalSlides) {
      currentIndex = totalSlides;
      updateSlider(false);
    } else if (currentIndex < totalSlides) {
      currentIndex = totalSlidesWithClones - totalSlides * 2;
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