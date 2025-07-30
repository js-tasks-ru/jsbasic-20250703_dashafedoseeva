function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');
  button.addEventListener('click', function () { //обработчик на кнопке 
    if (text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  });
}
