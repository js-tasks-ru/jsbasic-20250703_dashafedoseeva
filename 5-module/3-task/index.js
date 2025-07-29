function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselSlides = document.querySelectorAll('.carousel__slide');
  const totalSlides = carouselSlides.length;
  const slideWidth = carouselSlides[0].offsetWidth;//получаем ширину слайда
  let currentIndex = 0; //храним номер текущего слайда в карусели.

  function updateButtons() {
    if (currentIndex === 0) {
      buttonLeft.style.display = 'none';   // Скрыть кнопку назад
      buttonRight.style.display = '';      // Показать кнопку вперед
    } else if (currentIndex === 3) {
      buttonRight.style.display = 'none';  // Скрыть кнопку вперед
      buttonLeft.style.display = '';        // Показать кнопку назад
    } else {
      buttonLeft.style.display = '';        // Показать обе кнопки
      buttonRight.style.display = '';
    }
  }
  
  buttonRight.addEventListener('click', function () {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      carouselInner.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
      updateButtons();
    }
  });

  buttonLeft.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      carouselInner.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
      updateButtons();
    }
  });
  updateButtons();
}
