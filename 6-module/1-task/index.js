/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = this.elem.querySelector('tbody');

    rows.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.salary}</td>
        <td>${user.city}</td>
        <td><button>X</button></td>
      `;

      row.querySelector('button').addEventListener('click', () => {
        row.remove();
      });

      tbody.appendChild(row);
    });
  }
}