const boardpixel = document.getElementById('pixel-board');
const colorpalette = document.getElementById('color-palette');
const btnreset = document.getElementById('clear-board');
const btnchange = document.getElementById('generate-board');
const inputchange = document.getElementById('board-size');
const colorsh2 = document.querySelector('h2');
const windowout = document.getElementsByClassName('window')[0];

let lastSelected = document.getElementsByClassName('black')[0];
let selected;
let pixeltemp;
let matlo;
let matlo2
window.onload = function load() {
  function sizeofboardpixel(number) {
    matlo = 42 * number;
    matlo2 = 70 * number;
    matlo2.toString;
    matlo.toString;
    boardpixel.style.maxWidth = matlo + 'px';
    windowout.style.maxWidth = matlo2 + 'px';
  }

  function createPixels(numberofpixels) {
    sizeofboardpixel(numberofpixels);
    for (let i = 0; i < numberofpixels; i += 1) {
      for (let index = 0; index <= numberofpixels + 1; index += 1) {
        if (index < numberofpixels) {
          pixeltemp = document.createElement('div');
          pixeltemp.className = 'pixel';
          boardpixel.appendChild(pixeltemp);
        }
      }
    }
  }

  createPixels(5);

  colorpalette.addEventListener('click', (e) => {
    selected = e.target;
    if(selected !== colorpalette && selected !== colorsh2)
    selectColor(selected);
  });

  function selectColor(obj) {
    if (lastSelected.classList[0] !== obj.classList[0]) {
      lastSelected.classList.remove('selected');
      obj.className += ' selected';
      lastSelected = obj;
    }
  }

  boardpixel.addEventListener('click', (e) => {
    if (e.target !== boardpixel) {
      getTemp = document.querySelector('.' + lastSelected.classList[0]);
      e.target.style.backgroundColor = getTemp.classList[0];
    }
  });

  btnreset.addEventListener('click', () => {
    for (const index of boardpixel.children) {
      index.style.backgroundColor = 'white';
    }
  });

  btnchange.addEventListener('click', () => {
    if (inputchange.value !== '' && inputchange.value >= 51) {
      boardpixel.innerHTML = '';
      createPixels(50);
    } else if (inputchange.value !== '' && inputchange.value <= 4) {
      boardpixel.innerHTML = '';
      createPixels(5);
    } else if (inputchange.value !== '' && inputchange.value >= 5) {
      console.log('entrouaqui');
      boardpixel.innerHTML = '';
      createPixels(inputchange.value);
    } else {
      alert('Board inválido!');
    }
  });
};