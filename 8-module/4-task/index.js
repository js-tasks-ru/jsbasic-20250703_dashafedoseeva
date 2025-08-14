import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = null;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = { product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (!cartItem) return;

    cartItem.count += amount;

    if (cartItem.count === 0) {
      // Удаляем из корзины и передаем в onProductUpdate информацию о том, какой продукт удалён
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      cartItem = { product: { id: productId }, count: 0 };
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
  <div class="cart-product" data-product-id="${product.id}">
    <div class="cart-product__img">
      <img src="/assets/images/products/${product.image}" alt="product">
    </div>
    <div class="cart-product__info">
      <div class="cart-product__title">${escapeHtml(product.name)}</div>
      <div class="cart-product__price-wrap">
        <div class="cart-counter">
          <button type="button" class="cart-counter__button cart-counter__button_minus">
            <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
          </button>
          <span class="cart-counter__count">${count}</span>
          <button type="button" class="cart-counter__button cart-counter__button_plus">
            <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
          </button>
        </div>
        <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
      </div>
    </div>
  </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
    <h5 class="cart-form__title">Delivery</h5>
    <div class="cart-form__group cart-form__group_row">
      <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
      <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
      <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
    </div>
    <div class="cart-form__group">
      <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
    </div>
    <div class="cart-buttons">
      <div class="cart-buttons__buttons btn-group">
        <div class="cart-buttons__info">
          <span class="cart-buttons__info-text">total</span>
          <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
        </div>
        <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
      </div>
    </div>
  </form>`);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  renderModal() {
    const modal = new Modal();
    modal.setTitle('Your order');

    const wrapper = document.createElement('div');
    for (const { product, count } of this.cartItems) {
      wrapper.append(this.renderProduct(product, count));
    }
    const form = this.renderOrderForm();
    wrapper.append(form);

    modal.setBody(wrapper);
    modal.open();

    this.modal = modal;

    const modalBody = document.querySelector('.modal__body');
    modalBody.addEventListener('click', (event) => {
      const plus = event.target.closest('.cart-counter__button_plus');
      const minus = event.target.closest('.cart-counter__button_minus');
      if (!plus && !minus) return;

      const productElem = event.target.closest('.cart-product');
      if (!productElem) return;
      const productId = productElem.dataset.productId;

      this.updateProductCount(productId, plus ? 1 : -1);
    });

    form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    const modal = document.querySelector('.modal');
    if (!modal) return;
    const modalBody = modal.querySelector('.modal__body');

    if (this.isEmpty()) {
      // закрыть модальное окно
      modal.remove();
      document.body.classList.remove('is-modal-open');
      return;
    }

    if (cartItem && cartItem.product && cartItem.product.id) {
      const productId = cartItem.product.id;
      const productElem = modalBody.querySelector(`[data-product-id="${productId}"]`);
      if (productElem) {
        if (cartItem.count === 0) {
          // удалить карточку товара из модалки
          productElem.remove();
        } else {
          const countElem = productElem.querySelector('.cart-counter__count');
          const priceElem = productElem.querySelector('.cart-product__price');
          countElem.textContent = String(cartItem.count);
          // Найдём исходное описание товара, чтобы взять актуальную цену
          const itemInfo = this.cartItems.find(i => i.product.id === productId);
          if (itemInfo) {
            priceElem.textContent = `€${(itemInfo.product.price * itemInfo.count).toFixed(2)}`;
          }
        }
      }
    }

    const totalElem = modalBody.querySelector('.cart-buttons__info-price');
    if (totalElem) {
      totalElem.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    const cartForm = event.target.closest('.cart-form');
    const submitButton = cartForm.querySelector('.cart-buttons__button');
    submitButton.classList.add('is-loading');

    const formData = new FormData(cartForm);
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });
    try {
      await response.json();
    } catch (e) {
      // Игнорируем возможную ошибку парсинга, если тело пустое
    }

    // успех
    const modalEl = document.querySelector('.modal');
    if (!modalEl) return;
    const titleEl = modalEl.querySelector('.modal__title');
    if (titleEl) titleEl.textContent = 'Success!';
    this.cartItems = [];
    this.cartIcon.update(this);

    const successBody = createElement(`<div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>`);
    const bodyEl = modalEl.querySelector('.modal__body');
    if (bodyEl) {
      bodyEl.innerHTML = '';
      bodyEl.append(successBody);
    }
  }
}
