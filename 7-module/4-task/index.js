export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    // Создаем главный элемент слайдера
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    // Добавляем HTML структуру слайдера
    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps"></div>
    `;

    // Запоминаем нужные элементы
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.valueElem = this.elem.querySelector('.slider__value');
    this.stepsContainer = this.elem.querySelector('.slider__steps');

    // Создаем шаги слайдера
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      if (i === this.value) {
        span.classList.add('slider__step-active'); // активный шаг
      }
      this.stepsContainer.appendChild(span);
    }

    // Обновляем UI, чтобы отобразить текущее значение
    this.updateUI(this.value);

    // Обработчик клика по слайдеру (меняем значение)
    this.elem.addEventListener('click', (event) => {
      // Вычисляем позицию клика относительно слайдера
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      // Ограничиваем от 0 до 1
      if (leftRelative < 0) leftRelative = 0;
      if (leftRelative > 1) leftRelative = 1;

      // Переводим в номер шага
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);

      this.value = value;

      this.updateUI(value);

      // Генерируем событие slider-change с новым значением
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });

    // Отключаем встроенный drag'n'drop браузера для ползунка
    this.thumb.ondragstart = () => false;

    // Обработчик начала перетаскивания
    this.thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');

      // Обработчики движения и отпускания мыши на документе
      const onPointerMove = (event) => {
        event.preventDefault();

        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) leftRelative = 0;
        if (leftRelative > 1) leftRelative = 1;

        let leftPercents = leftRelative * 100;

        this.thumb.style.left = `${leftPercents}%`;
        this.progress.style.width = `${leftPercents}%`;

        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);

        this.valueElem.textContent = value;

        // Обновляем активный шаг
        let spans = this.stepsContainer.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('slider__step-active'));
        spans[value].classList.add('slider__step-active');

        this.value = value;
      };

      const onPointerUp = () => {
        this.elem.classList.remove('slider_dragging');

        this.updateUI(this.value);

        // Генерируем событие slider-change
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }));

        // Убираем обработчики
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  // Функция обновления интерфейса слайдера
  updateUI(value) {
    let segments = this.steps - 1;
    let valuePercents = (value / segments) * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.valueElem.textContent = value;

    let spans = this.stepsContainer.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[value].classList.add('slider__step-active');
  }
}
