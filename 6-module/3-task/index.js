import createElement from '../../assets/lib/create-element.js';
function initCarousel(elem) {
  const buttonRight = elem.querySelector('.carousel__arrow_right');
  const buttonLeft = elem.querySelector('.carousel__arrow_left');
  const carouselInner = elem.querySelector('.carousel__inner');
  const carouselSlides = elem.querySelectorAll('.carousel__slide');
  const totalSlides = carouselSlides.length;
  const slideWidth = carouselSlides[0].offsetWidth; // получаем реальную ширину слайда
  let currentIndex = 0; //храним номер текущего слайда в карусели.

  function updateButtons() {
    if (currentIndex === 0) {
      buttonLeft.style.display = 'none';   // Скрыть кнопку назад
      buttonRight.style.display = '';      // Показать кнопку вперед
    } else if (currentIndex === totalSlides - 1) {
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
export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.elem = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `);
    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (!button) return;

      const slide = button.closest('.carousel__slide');
      const productId = slide.dataset.id;

      const productAddEvent = new CustomEvent('product-add', {
        detail: productId,
        bubbles: true
      });

      this.elem.dispatchEvent(productAddEvent);
    });
    
    // Инициализируем карусель после добавления в DOM
    // Небольшая задержка нужна для тестов, чтобы они успели установить размеры
    setTimeout(() => {
      initCarousel(this.elem);
    }, 100);
  }

}







