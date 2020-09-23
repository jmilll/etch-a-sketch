    /* --------- COLOR GLOBAL ---------- */
    const defaultGridColor = 'rgb(255, 255, 255)';
    const colorBlack = 'rgb(35, 35, 35)';
    let defaultCellColor = 'rgb(50, 50, 50)'; //'rgb(0, 150, 177)'
    // to get a one time random color
    // let r = Math.floor(Math.random()*255);
    // let g = Math.floor(Math.random()*255);
    // let b = Math.floor(Math.random()*255);
    // let randomCellColor = `rgb(${r}, ${g}, ${b})`;
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
    let setRandomDraw = 'false';
    const eraserColorButton = document.getElementById('eraser-color');



  
    /* --------- FOR INPUTING ANY NUMBER ---------- */
    // let userInput = parseInt(prompt('Please enter a number 1 through 100'));
    // window.addEventListener('load', createGrid(userInput));
    // root.style.setProperty('--grid-size', userInput );

    /* --------- FOR TESTING WITHOUT INPUTING A NUMBER ---------- */
    //window.addEventListener('load', createGrid(4)); //TEMP to not enter number every load
    //root.style.setProperty('--grid-size', 4 ); //TEMP to not enter number every load
    
    /* --------- FOR TESTING NEW INPUT TYPES ---------- */
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
        //return x;
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

    // function draw() {
    //     this.style.backgroundColor = defaultCellColor;
    // }
    // function drawRandom() {
    //     this.style.backgroundColor = randomCellColor;
    // }

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
    }
    eraserColorButton.addEventListener('click', () => {setRandomDraw = 'erase'});
    randomColorButton.addEventListener('click', () => {setRandomDraw = 'true'});
    defaultColorButton.addEventListener('click', () => {setRandomDraw = 'false'});
    cell.addEventListener('pointerover', draw);
    clearButton.addEventListener('click', resetColor);
    goButton.addEventListener('click', newInputValue);


//this.container.style.cssText =`grid-template-columns: repeat(${this.size}, 1fr); grid-template-rows: repeat(${this.size}, 1fr);`;
//$(':root').css('--main-color', '#000000');
//document.getElementById("id").style.color = "blue";
//element.setAttribute('style', '--grid-size: ;')
//element.style.backgroundColor = "red";
//cell.style.setProperty(`--grid-size: ${num};`)

    /* --------- AVOID CREATING THE NUMBER SELECTION DROPDOWN OPTIONS IN HTML 1 BY 1 ---------- 
    HTML == <select class="form-control" id="rows" name="rows"></select>

    const select = document.querySelector('#header .form-control')
    window.addEventListener('load', createOptions);
    
    function createOptions() {
        let i = 1;
        do {
            const addOption = document.createElement('option');
            addOption.textContent = i;
            addOption.setAttribute('value', i);
            select.appendChild(addOption);
            i++;
        } 
        while(i <= 20); //Changes the amount of options
    }
    */