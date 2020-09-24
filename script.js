    /* --------- COLOR GLOBAL ---------- */
    const defaultGridColor = 'rgb(255, 255, 255)';
    const colorBlack = 'rgb(35, 35, 35)';
    let defaultCellColor = 'rgb(50, 50, 50)'; //'rgb(0, 150, 177)'

    function randomCellColor() {
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        let rc = `rgb(${r}, ${g}, ${b})`;
        return rc;
    }

    /* --------- GRID CREATION GLOBAL ---------- */
    const container = document.getElementById('container');
    const grid = document.getElementById('grid');
    const gridSize = document.getElementsByName('--grid-size');
    let root = document.documentElement;
    

    /* --------- HEADER GLOBAL ---------- */
    const goButton = document.getElementById('go');
    const clearButton = document.getElementById('clear');
    let gridInputValue = parseInt(document.getElementById('input-number').value);
    const randomColorButton = document.getElementById('random-color');
    const defaultColorButton = document.getElementById('default-color');
    const eraserColorButton = document.getElementById('eraser-color');
    let setRandomDraw = 'false';

    
    /* --------- GRID SETUP + CREATION ---------- */
    window.addEventListener('load', createGrid(gridInputValue));
    root.style.setProperty('--grid-size', gridInputValue);

    function setNumber(x) {
        let newNum = root.style.setProperty('--grid-size', x);
        return newNum;
    }

    function createGrid(num) {
        for (let row = 0; row < num; row++) {
             for (let column = 0; column < num; column++) {
                const addCell = document.createElement('div');
                addCell.setAttribute('class', 'cell');
                grid.appendChild(addCell);
            }
        }
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('pointerover', draw));
    }
    
    function updateGrid(b) {
        removeAllChildNodes(grid)
        setNumber(b);
        createGrid(b);
        setRandomDraw = 'false';
    }
    
    function newInputValue() {
        var x = parseInt(document.getElementById('input-number').value);
        var defaultVal = x.defaultValue;
        var currentVal = x.value;
        
        if (defaultVal !== currentVal) {
            x = currentVal;
        } 
        updateGrid(x);
    }
    
    /* --------- DELETE THE GRID TO START FRESH ---------- */
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }//removeAllChildNodes(grid);
    } 

    // Located after grid creation -- otherwise, there would be no .cell to target
    let cell = document.querySelector('#grid .cell');

    function draw() {
        if (setRandomDraw === 'false') {
            this.style.backgroundColor = defaultCellColor;
        } else if (setRandomDraw === 'true') {
            this.style.backgroundColor = randomCellColor();
        } else {
            this.style.backgroundColor = defaultGridColor;
        }
    }

    function resetColor() {
        document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = defaultGridColor);
        setRandomDraw = 'false';
    }

    eraserColorButton.addEventListener('click', () => {setRandomDraw = 'erase'});
    randomColorButton.addEventListener('click', () => {setRandomDraw = 'true'});
    defaultColorButton.addEventListener('click', () => {setRandomDraw = 'false'});
    cell.addEventListener('pointerover', draw);
    clearButton.addEventListener('click', resetColor);
    goButton.addEventListener('click', newInputValue);