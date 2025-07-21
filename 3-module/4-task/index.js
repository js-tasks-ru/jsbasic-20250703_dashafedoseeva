function showSalary(users, age) {
  let arr = [];
  arr = users.filter(item => item.age <= age) // фильтруем всех юзеров по возрасту
  arr = arr.map(item => `${item.name}, ${item.balance}`) //создаем массив строк(имена и балансы)
  return arr.join('\n');
}
