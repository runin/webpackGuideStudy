import details from '../css/detail.css'
function detail() {
  var dom = document.createElement('div');
  dom.classList.add(details.hello);
  dom.innerHTML = 'hello detail';
  return dom;
}
document.body.appendChild(detail());