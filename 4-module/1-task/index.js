//Необходимо реализовать функцию makeFriendsList,
// которая преобразует переданный массив друзей в стандартный HTML список элменет ul внутри которого будут li.
function makeFriendsList(friends) {
  const ul = document.createElement('ul'); // создали ul
  friends.forEach(friend => {
    const li = document.createElement('li'); //для каждого элемента массива создаем li
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.appendChild(li);// Добавляем li в ul
  });
  return ul;
}
