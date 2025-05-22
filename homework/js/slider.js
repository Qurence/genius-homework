document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  let slides = document.querySelectorAll(".slider li");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slidesToShow = getSlidesToShow();

  for (let i = 0; i < totalSlides; i++) {
    const cloneFirst = slides[i].cloneNode(true);
    const cloneLast = slides[i].cloneNode(true);
    slider.appendChild(cloneFirst);
    slider.insertBefore(cloneLast, slides[0]);
  }

  slides = document.querySelectorAll(".slider li");
  const totalSlidesWithClones = slides.length;

  function setSlideWidths() {
    const slideWidth = slider.offsetWidth / slidesToShow;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
  }

  setSlideWidths();

  currentIndex = totalSlides;
  updateSlider(false);

  function getSlidesToShow() {
    if (window.innerWidth <= 768) {
      return 1;
    } else if (window.innerWidth <= 1200) {
      return 2;
    } else {
      return 3;
    }
  }

  function updateSlider(transition = true) {
    const slideWidth = slider.offsetWidth / slidesToShow;
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    const dotIndex = (currentIndex - totalSlides) % totalSlides;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });
  }

  slider.addEventListener("transitionend", () => {
    if (currentIndex >= totalSlidesWithClones - totalSlides) {
      currentIndex = totalSlides;
      updateSlider(false);
    } else if (currentIndex < totalSlides) {
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

  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex++;
      } else {
        currentIndex--;
      }
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    slidesToShow = getSlidesToShow();
    setSlideWidths();
    updateSlider(false);
  });
});