
  const _alphabet = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
  const _base = _alphabet.length;

  export const encode = function(num) {
    let str = '';
    while (num > 0) {
      str = _alphabet.charAt(num % _base) + str;
      num = Math.floor(num / _base);
    }
    return str;
  };

  export const decode = (str) => {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
      num = num * _base + _alphabet.indexOf(str.charAt(i));
    }
    
    return num;

  }
