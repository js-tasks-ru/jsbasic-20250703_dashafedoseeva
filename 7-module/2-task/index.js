import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement
      (` <!--Корневой элемент Modal-->
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>`)
    //Закрытие модалки по клику на крестик
    let buttonClose = this.elem.querySelector('.modal__close');
    buttonClose.addEventListener('click', (event) => {
      this.close()
    })
    //Закрытие модалки по Esc
    this.onKeyDown = (event) => { //Пишем так,чтобы сохранить правильный this(тут разобраться)
      if (event.code === 'Escape') {
        this.close();
      }
    }
  }
  //Метод открытия модалки
  open() {
    document.body.append(this.elem); // вставляем в конец body
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.onKeyDown);//подписка на событие(клик по Esc)
  };
  // Метод закрытия модалки
  close() {
    this.elem.remove(); // удаляем модалку
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.onKeyDown);//перестаем слушать
  };
  // Метод установки заголовка
  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  };
  // Метод установить тело
  setBody(node) {
    const body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';          // очищаем
    body.append(node);            // вставляем
  };


}

