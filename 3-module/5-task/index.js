function getMinMax(str) {
  let arr = str.split(' ');
  let numbers = arr.map(item => parseFloat(item))// Преобразуем каждую строку в число
  numbers = numbers.filter(num => !isNaN(num));// Оставляем только числа
  return {
    min: Math.min(...numbers), //... нужно чтобы разделить массив на отдельные числа, т е из одного элемента(массив) ([1, 2, 3]) получить просто три (1, 2, 3)
    max: Math.max(...numbers) 
  };
}


