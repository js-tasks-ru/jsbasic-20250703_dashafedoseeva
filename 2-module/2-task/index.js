function isEmpty(obj) {
  let isEmpty = true; //считаем, что  объект пустой
  for (let key in obj) {
    isEmpty = false;
    break;
  }
  return isEmpty;
}



