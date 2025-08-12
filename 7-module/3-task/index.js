import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    // создаём HTML слайдера
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    // добавляем шаги (span)
    let stepsContainer = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      let span = document.createElement('span');
      if (i === value) {
        span.classList.add('slider__step-active');
      }
      stepsContainer.append(span);
    }

    // обновляем визуально положение ползунка
    this.updateSlider(value);

    // обработчик клика по слайдеру
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let newValue = Math.round(approximateValue);

      this.value = newValue;
      this.updateSlider(newValue);

      // отправляем событие
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });
  }

  updateSlider(value) {
    let segments = this.steps - 1;
    let valuePercents = value / segments * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let valueSpan = this.elem.querySelector('.slider__value');

    // меняем позицию и значение
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueSpan.textContent = value;

    // меняем активный шаг
    let allSpans = this.elem.querySelectorAll('.slider__steps span');
    allSpans.forEach(span => span.classList.remove('slider__step-active'));
    allSpans[value].classList.add('slider__step-active');
  }
}
