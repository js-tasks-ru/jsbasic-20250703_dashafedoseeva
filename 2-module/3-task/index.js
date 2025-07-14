let calculator = {
  read(a, b) {
    this.a = a //this указывает на calculator, т е как пример calculator.a = 3, сохраняем в объекте calculator
    this.b = b
  },
  sum() {
    return this.a + this.b // забираем из объекта
  },
  mul() {
    return this.a * this.b
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
