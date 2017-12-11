import styles from '../css/style.css';
import Icon from '../images/logo.jpg';
import console from './util.js'
function test() {
  let a = 1;
  let b = 2;
  var xxx = (c,d) => c*d;

  var dom = document.createElement('div');
  dom.innerHTML = 'hello==='+ xxx(a,b) + '&util='+ console('hhhhhhhhhhh');
  dom.classList.add(styles.hello) ;

  var myIcon = new Image();
  myIcon.src = Icon;
  myIcon.style.width = '10px';
  myIcon.style.height = '10px';
  dom.appendChild(myIcon);

  return dom;
}
document.body.appendChild(test());

