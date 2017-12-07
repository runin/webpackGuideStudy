import '../css/style.css';
import Icon from '../images/logo.jpg';
import console from './util.js'
function test() {
  var dom = document.createElement('div');
  dom.innerHTML = 'hello';
  dom.classList.add('hello') ;

  var myIcon = new Image();
  myIcon.src = Icon;
  myIcon.style.width = '10px';
  myIcon.style.height = '10px';
  dom.appendChild(myIcon);

  return dom;
}
document.body.appendChild(test());
console('hhhhhhhhhhhhhhhh');