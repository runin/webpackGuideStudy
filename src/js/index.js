import '../css/style.css';
function test() {
  var dom = document.createElement('div');
  dom.innerHTML = 'hello';
  dom.classList.add('hello') ;
  return dom;
}
document.body.appendChild(test());