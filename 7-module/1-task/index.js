import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`
      <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      ${this.categories.map(category => `
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `).join('')}
      </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      </div>
      `);
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    const buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    // Обработчик прокрутки вправо
    buttonRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    // Обработчик прокрутки влево
    buttonLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });
    //Скрываем кнопки переключения при достижении крайних положений меню
    ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        buttonLeft.classList.remove('ribbon__arrow_visible');
      } else {
        buttonLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        buttonRight.classList.remove('ribbon__arrow_visible');
      } else {
        buttonRight.classList.add('ribbon__arrow_visible');
      }
    });
    //Выбор конкретной категории
        ribbonInner.addEventListener('click', (event) => {
      let item = event.target.closest('.ribbon__item');
      if (!item) return;

      event.preventDefault();

      // Удаляем активный класс у всех, добавляем только к выбранному
      let items = ribbonInner.querySelectorAll('.ribbon__item');
      items.forEach(el => el.classList.remove('ribbon__item_active'));
      item.classList.add('ribbon__item_active');

      // Создаем и отправляем событие с выбранной категорией
      let customEvent = new CustomEvent('ribbon-select', {
        detail: item.dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);
    });

    }

       }
  
