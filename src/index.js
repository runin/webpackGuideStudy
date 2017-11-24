import printMe from './print.js'

function element() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerText = 'hello shang111';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(element());