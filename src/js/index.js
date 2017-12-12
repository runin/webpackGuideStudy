import indexs from '../css/index.scss';
import Icon from '../images/logo.jpg';
import until from './util.js'
// import $ from 'jquery';


function test() {

  var dom = document.createElement('div');
  let a = 1;
  let b = 2;
  var xxx = (c,d) => c*d;
  dom.innerHTML = 'hello==='+ xxx(a,b) + '&util='+ until('hhhhhhhhhhh');
  dom.classList.add(indexs.hello) ;

  var myIcon = new Image();
  myIcon.src = Icon;
  myIcon.style.width = '10px';
  myIcon.style.height = '10px';
  myIcon.classList.add(indexs.logo)
  dom.appendChild(myIcon);
  return dom;
}
document.body.appendChild(test());
