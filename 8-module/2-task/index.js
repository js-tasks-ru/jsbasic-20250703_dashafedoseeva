import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    // Создаём корневой элемент
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.inner = this.elem.querySelector('.products-grid__inner');

    // Сразу показываем все товары
    this.showProducts(this.products);
  }

  // Метод для отрисовки списка товаров
  showProducts(products) {
    this.inner.innerHTML = '';
    for (let product of products) {
      let card = new ProductCard(product);
      this.inner.append(card.elem);
    }
  }

  // Метод для фильтрации
  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let filtered = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) return false;
      if (this.filters.vegeterianOnly && !product.vegeterian) return false;
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) return false;
      if (this.filters.category && product.category !== this.filters.category) return false;
      return true;
    });

    this.showProducts(filtered);
  }
}
