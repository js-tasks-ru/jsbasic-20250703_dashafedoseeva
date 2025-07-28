function hideSelf() {
 const button = document.querySelector('.hide-self-button'); //находим кнопку
   button.addEventListener('click', function() { //обработчик на кнопке 
    button.hidden = true;
  });
}

