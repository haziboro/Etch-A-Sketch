const grid = document.querySelector('.grid');
const defaultGridsize = 16;
let currentGridSize;
let gridTypes = [MakeBlack, MakeRandomColor, MakeDarker];
let gridType = gridTypes[2];

function MakeRandomColor(e){
    let block = e.target;
    const randomColor =
      Math.floor(Math.random()*16777215).toString(16);
    block.style.backgroundColor = "#" + randomColor;
}//end MakeRandomColor

function MakeBlack(e){
    e.target.classList.add('hover');
}//end Blacken

function MakeDarker(e){
    if(e.target.dataColor == null){
        e.target.dataColor = 255 - 255/10;
    }
    else{
        e.target.dataColor -= 255/10;
    }
    let colorVal = e.target.dataColor;
    e.target.style.backgroundColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
}//end MakeDarker

function GenerateGrid(gridSize){
    currentGridSize = gridSize;
    ResetGrid();
    const itemSize = 100/gridSize;

    for(let i = 0; i < gridSize; i++){
        for(let k = 0; k < gridSize; k++){
            let item = document.createElement('div');
            item.classList.add('grid-item');
            item.setAttribute('style', `width: ${itemSize}%; height: ${itemSize}%`);
            item.addEventListener('mouseover', gridType);
            grid.appendChild(item);
        }//end for
    }//end for
}//end GenerateGrid

function ResetGrid(){
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
}//end ResetGrid

function GetGridsize(){
    let size = prompt("Enter grid resolution, between 2 and 100");
    let keepGoing = true;

    while(keepGoing){
        if(size.match(/^[0-9]+$/) == null){
            size = prompt("Invalid input, please enter a numerical value");
        }
        else if(parseInt(size) < 2 || parseInt(size) > 100){
            size = prompt("Number out of range, please use values between 2 and 100");
        }
        else{
            GenerateGrid(parseInt(size));
            keepGoing = false;
        }
    }//end while
}//end GetGridSize

function SetGridType(e){
    gridType = gridTypes[e.target.dataGridType];
    GenerateGrid(currentGridSize);
}//end SetGridType

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', GetGridsize);

const typeButtons = document.querySelector('.typeButtons');
//Populates buttons for to activate every grid mode available
for(let i = 0; i < gridTypes.length; i++){
    let button = document.createElement('button');
    button.classList.add('gridType-Button');
    button.dataGridType = i;
    button.textContent = gridTypes[i].name;
    button.addEventListener('click', SetGridType);
    typeButtons.appendChild(button);
}

gridType = gridTypes[0];
GenerateGrid(defaultGridsize);
