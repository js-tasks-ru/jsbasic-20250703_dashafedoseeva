function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    const ageCell = row.cells[1];    // Ячейка age
    const genderCell = row.cells[2]; // Ячейка gender
    const statusCell = row.cells[3]; // Ячейка status
    
    // 1. Статус: проверяем наличие data-available
    if (statusCell.hasAttribute('data-available')) {
      const isAvailable = statusCell.dataset.available === "true";

      // Добавляем класс в зависимости от значения
      row.classList.add(isAvailable ? 'available' : 'unavailable');
    } else {
      // если нет атрибута скрываем строку
      row.hidden = true;
    }

    // 2. Пол: m — male, f — female
    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    // 3. Возраст: если меньше 18 — зачёркиваем
    if (parseInt(ageCell.textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}