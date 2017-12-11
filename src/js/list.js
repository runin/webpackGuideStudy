import lists from '../css/list.css'
function list() {
  var dom = document.createElement('div');
  dom.classList.add(lists.hello);
  dom.innerHTML = 'hello list';
  return dom;
}
document.body.appendChild(list());