const input = document.getElementById('texto-tarefa');
const btncreate = document.getElementById('criar-tarefa');
const btnremoveall = document.getElementById('apaga-tudo');
const btnremovecomplete = document.getElementById('remover-finalizados');
const btnsavetasks = document.getElementById('salvar-tarefas');
const list = document.getElementById('lista-tarefas');
const ol = document.querySelector('ol');
const btnup = document.getElementById('mover-cima');
const btndown = document.getElementById('mover-baixo');
const btnremoveselected = document.getElementById('remover-selecionado');
let tempLi;
let selected;
let completedRisk;
const contentList = {
  content: '',
  classes: '',
};
let numberoflist = 0;

function vrfyBcg() {
  for (const i of list.children) {
    if (i.style.backgroundColor === 'rgb(128, 128, 128)') {
      i.style.backgroundColor = 'white';
    }
  }
}

function removeBcg() {
  selected.style.backgroundColor = 'white';
}

function removeRisk(obj) {
  obj.className = '';
}

btncreate.addEventListener('click', () => {
  ol.style = 'border: solid grey 1px;';
  tempLi = document.createElement('li');
  tempLi.innerText = input.value;
  input.value = '';
  list.appendChild(tempLi);
});

list.addEventListener('click', (event) => {
  const target = event.target;
  if (event.target !== list) {
    vrfyBcg();
    setTimeout(200);
    target.style.backgroundColor = 'rgb(128, 128, 128)';
  }
  if (selected === event.target) {
    removeBcg();
    selected = undefined;
  } else if (selected !== undefined) {
    removeBcg();
    selected = event.target;
  } else {
    selected = event.target;
  }
});
list.addEventListener('dblclick', (event) => {
  const target = event.target;
  if (event.target !== list) {
    if (event.target.classList[0] === 'completed') {
      removeRisk(event.target);
    } else {
      target.className = 'completed';
    }
  }
  if (completedRisk !== undefined) {
    removeRisk(event.target);
    completedRisk = event.target;
  }
});

btnremoveall.addEventListener('click', () => {
  list.innerHTML = '';
  ol.style = 'border: ""';
});

btnremovecomplete.addEventListener('click', () => {
  const completed = document.getElementsByClassName('completed');
  for (let i = 0; i <= completed.length;) {
    if (completed[0] !== undefined) {
      completed[0].remove('li');
    } else {
      i += 1;
    }
  }
});
btnsavetasks.addEventListener('click', () => {
  numberoflist = 0;
  if (list.children.length === 0) {
    for (let index = 0; index <= localStorage.length; index += 1) {
      localStorage.removeItem(localStorage.key(0));
    }
  } else {
    for (let i = 0; i < list.children.length; i += 1) {
      numberoflist += 1;
      contentList.content = list.children[i].innerText;
      contentList.classes = list.children[i].classList[0];
      localStorage.setItem(`name${numberoflist}`, JSON.stringify(contentList));
    }
  }
});
btnup.addEventListener('click', () => {
  const allLi = document.querySelectorAll('li');
  let transText;
  let transClass;
  for (let i = 0; i < allLi.length; i += 1) {
    if (allLi[i].style.backgroundColor === 'rgb(128, 128, 128)'
      && allLi[i].previousSibling !== null
    ) {
      transText = allLi[i].previousSibling.innerText;
      transClass = allLi[i].previousSibling.className;
      allLi[i].previousSibling.innerText = allLi[i].innerText;
      allLi[i].previousSibling.classList = allLi[i].classList;
      allLi[i].innerText = transText;
      allLi[i].className = transClass;
      allLi[i].style.backgroundColor = 'white';
      allLi[i].previousSibling.style.backgroundColor = 'rgb(128, 128, 128)';
      break;
    }
  }
});

btndown.addEventListener('click', () => {
  const allLi = document.querySelectorAll('li');
  let transText;
  let transClass;
  for (let i = 0; i < allLi.length - 1; i += 1) {
    if (allLi[i].style.backgroundColor === 'rgb(128, 128, 128)'
      && allLi[i].nextSibling !== null
    ) {
      transText = allLi[i].nextSibling.innerText;
      transClass = allLi[i].nextSibling.className;
      allLi[i].nextSibling.innerText = allLi[i].innerText;
      allLi[i].nextSibling.className = allLi[i].className;
      allLi[i].innerText = transText;
      allLi[i].className = transClass;
      allLi[i].style.backgroundColor = 'white';
      allLi[i].nextSibling.style.backgroundColor = 'rgb(128, 128, 128)';
      break;
    }
  }
});

btnremoveselected.addEventListener('click', () => {
  const allLi = document.querySelectorAll('li');
  for (let i = 0; i < allLi.length; i += 1) {
    if (allLi[i].style.backgroundColor === 'rgb(128, 128, 128)') {
      allLi[i].remove();
    }
  }
});

window.onload = () => {
  let count = 1;
  let consult;
  for (let i = 0; i < localStorage.length; i += 1) {
    consult = `name${count}`;
    ol.style = 'border: solid grey 1px;';
    const key = localStorage.getItem(consult);
    const contentrecov = JSON.parse(key);
    tempLi = document.createElement('li');
    tempLi.innerText = contentrecov.content;
    list.appendChild(tempLi);
    if (contentrecov.classes !== undefined) {
      tempLi.className = 'completed';
    }
    count += 1;
  }
};
