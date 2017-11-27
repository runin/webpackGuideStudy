import printMe from './print.js'
import './style.css'

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerText = 'hello shang444';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

let element = component();
document.body.appendChild(element);

if(module.hot){
  module.hot.accept('./print.js', function(){
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}