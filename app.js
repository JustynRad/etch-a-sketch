const grid = document.querySelector('.grid');
const sizeValue = document.querySelector('.size-value');
const slider = document.querySelector('.slider');

slider.onmousemove = (e) => updateSizeText(e.target.value);
slider.onchange = (e) => updateSize(e.target.value);

let currSize = 0;

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++) {
        const gridBox = document.createElement('div');
        gridBox.addEventListener('mouseover', setColor);
        grid.appendChild(gridBox);
    }
}

function setColor(e) {
    e.target.style.backgroundColor = '#AEC6CF';
}

function setGridSize(size) {
    currSize = size;
}

function updateSizeText(size) {
    sizeValue.innerHTML = `${size} x ${size}`;
}

function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    createGrid(currSize);
}

function updateSize(value) {
    setGridSize(value);
    updateSizeText(value);
    reloadGrid();
}

createGrid('16');