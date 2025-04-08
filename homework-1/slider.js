document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slider li");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
  
    // Клонируем слайды для бесконечной карусели
    const totalSlides = slides.length; // У нас 3 слайда
    const slidesToShow = 3; // Показываем 3 слайда одновременно
  
    // Клонируем первые и последние слайды для эффекта бесконечности
    for (let i = 0; i < totalSlides; i++) {
      const cloneFirst = slides[i].cloneNode(true);
      const cloneLast = slides[i].cloneNode(true);
      slider.appendChild(cloneFirst); // Добавляем клоны в конец
      slider.insertBefore(cloneLast, slides[0]); // Добавляем клоны в начало
    }
  
    // Обновляем список слайдов после клонирования
    const allSlides = document.querySelectorAll(".slider li");
    const totalSlidesWithClones = allSlides.length;
  
    // Устанавливаем начальную позицию (смещаем на количество клонов в начале)
    currentIndex = totalSlides; // Начинаем с оригинальных слайдов (после клонов)
    slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
  
    // Функция для обновления слайдера
    function updateSlider(transition = true) {
      if (transition) {
        slider.style.transition = "transform 0.5s ease-in-out";
      } else {
        slider.style.transition = "none"; // Отключаем анимацию для мгновенного перехода
      }
      slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
  
      // Обновляем активную точку
      const dotIndex = currentIndex % totalSlides; // Учитываем только оригинальные слайды
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === dotIndex);
      });
    }
  
    // Обработчик окончания анимации для бесконечного цикла
    slider.addEventListener("transitionend", () => {
      if (currentIndex >= totalSlidesWithClones - totalSlides) {
        currentIndex = totalSlides; // Переходим к началу оригинальных слайдов
        updateSlider(false); // Без анимации
      } else if (currentIndex < totalSlides) {
        currentIndex = totalSlidesWithClones - totalSlides * 2; // Переходим к концу оригинальных слайдов
        updateSlider(false); // Без анимации
      }
    });
  
    // Следующий слайд
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      updateSlider();
    });
  
    // Предыдущий слайд
    prevBtn.addEventListener("click", () => {
      currentIndex--;
      updateSlider();
    });
  
    // Переключение по точкам
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = totalSlides + index; // Устанавливаем индекс с учетом клонов
        updateSlider();
      });
    });
  
    // Инициализация слайдера
    updateSlider();
  });