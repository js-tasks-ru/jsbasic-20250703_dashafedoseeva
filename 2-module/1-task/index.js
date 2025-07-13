let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
}
function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    let value = salaries[key];
    if (
      typeof value === 'number' &&
      value !== Infinity &&
      value !== -Infinity &&
      value === value //проверка на NaN(т к NaN === NaN дает нам false(просто запомнить), т к логическое и - у нас не выполнится блок if, потому что одно из условий false)
    ) {
      sum += value;
    }
  }
  return sum;
}
