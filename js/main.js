'use strict';

{
  const price = document.getElementById('price');
  const num = document.getElementById('num');
  const unit = document.getElementById('unit');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const reset = document.getElementById('reset');

  function checkInput() {
    // /~^[1-9][0-9]*$/
    if (
      price.value.match(/^[1-9][0-9]*$/) !== null &&
      num.value.match(/^[1-9][0-9]*$/) !== null
    ) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }

  btn.addEventListener('click',() => {
    let payLess;
    let short;
    let payMore;
    let over;
    let str;
    if (btn.classList.contains('disabled') === true) return;

    payLess = Math.floor(price.value / num.value / unit.value) * unit.value;
    short = price.value - (payLess * num.value);
    payMore = Math.ceil(price.value / num.value / unit.value) * unit.value;
    over = Math.abs(price.value - (payMore * num.value));
    if(over === 0 && short === 0) {
      str = '1人' + (price.value/num.value) + '円ちょうどです!';
    } else {
      str = '1人' + payLess + '円だと' + short + '円足りません。' +
      '1人' + payMore + '円だと' + over + '円余ります。';
    }

    result.textContent = str;
    reset.classList.remove('hidden');
  });

  price.addEventListener('keyup', checkInput);
  num.addEventListener('keyup', checkInput);

  reset.addEventListener('click',() => {
    result.textContent = 'ここに結果を表示します';
    price.value = '';
    num.value = '';
    unit.value = '100';
    btn.classList.add('disabled');
    reset.classList.add('hidden');
    price.focus();
  });

  price.focus();
}
