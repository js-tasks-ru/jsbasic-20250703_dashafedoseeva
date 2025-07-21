function showSalary(users, age) {
  let arr = [];
  return users
    .filter(item => item.age <= age) // фильтруем всех юзеров по возрасту
    .map(item => `${item.name}, ${item.balance}`) //создаем массив строк(имена и балансы)
    .join('\n');
}
