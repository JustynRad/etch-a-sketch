const grid = document.querySelector('.grid');
const sizeValue = document.querySelector('.size-value');
const slider = document.querySelector('.slider');
const blackButton = document.querySelector('.black-button')
const grayScaleButton = document.querySelector('.gray-scale-button');
const rainbowButton = document.querySelector('.rainbow-button');
const eraserButton = document.querySelector('.eraser-button')
const clearButton = document.querySelector('.clear-button');

blackButton.onclick = () => setMode('black');
grayScaleButton.onclick = () => setMode('gray-scale');
rainbowButton.onclick = () => setMode('rainbow');
eraserButton.onclick = () => setMode('eraser');
clearButton.onclick = () => reloadGrid();
slider.onmousemove = (e) => updateSizeText(e.target.value);
slider.onchange = (e) => updateSize(e.target.value);

let currentSize = 16;
let currentMode = 'black';

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++) {
        const gridBox = document.createElement('div');
        gridBox.addEventListener('mouseover', setColor);
        grid.appendChild(gridBox);
    }
}

function setMode(newMode) {
    if (currentMode === 'black') {
        blackButton.classList.remove('active');
      } else if (currentMode === 'gray-scale') {
        grayScaleButton.classList.remove('active');
      } else if (currentMode === 'rainbow') {
        rainbowButton.classList.remove('active');
      } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active');
      }
    
      if (newMode === 'black') {
        blackButton.classList.add('active')
      } else if (newMode === 'gray-scale') {
        grayScaleButton.classList.add('active')
      } else if (newMode === 'rainbow') {
        rainbowButton.classList.add('active')
      } else if (newMode === 'eraser') {
        eraserButton.classList.add('active');
      }

      currentMode = newMode;
}

function setColor(e) {
    if(currentMode === 'black') {
        e.target.style.backgroundColor = '#000000';
    } else if (currentMode === 'gray-scale') {
        console.log(this.style.backgroundColor.slice(-4, -1));
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            this.classList.add('gray');
        } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
            return;
        } else {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
        }
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

function setGridSize(size) {
    currentSize = size;
}

function updateSizeText(size) {
    sizeValue.innerHTML = `${size} x ${size}`;
}

function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

function updateSize(value) {
    setGridSize(value);
    updateSizeText(value);
    reloadGrid();
}

window.onload = () => {
    createGrid('16');
    activiateButton('black');
}