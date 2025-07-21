function camelize(str) {
  let arr = str.split('-');
  let result = arr.map((item, index) => {
    if (index === 0) {
      return item;
    } else {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
  });
  let newstr = result.join('')
  return newstr;

}