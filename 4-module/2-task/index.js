function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let cell = table.rows[i].cells[i];// диагональная ячейка - одинаковая i у столбуа и строки, т е 1,1; 2,2 и тд
    cell.style.backgroundColor = 'red';
  }
}
