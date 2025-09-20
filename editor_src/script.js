import {makeLinesSVG} from "./routing_lines.js";

// UI
const container  = document.querySelector(".container");
/*
const sizeEle  = document.querySelector(".size");
const color  = document.querySelector(".color");
const resetBtn  = document.querySelector(".button");
*/

let size = 20; //sizeEle.value;
let draw = false;


// Connection variables
let prevGrid = null;
let prevPrevGrid = null;


const dirs = [
    [0,-1],
    [1,0],
    [0,1],
    [-1,0]
];


/**
 * subtract 2 positions from each other (pos1 - pos2)
 * @param {Number[]} pos1 - Start position as a 2 number array [x, y]
 * @param {Number[]} pos2 - End position as a 2 number array [x, y]
 * @returns {Number[]}
 **/
function subPos(pos1, pos2) {
    return [pos1[0] - pos2[0], pos1[1] - pos2[1]];
}

// array of connections in each grid cell
// indexed by gridConnections[cellY][cellX][inputIdx][outputIdx]
let gridConnections = 
    Array.from({ length: size }, () =>
        Array.from({ length: size }, () =>
            Array.from({ length: 4 }, () =>
                Array.from({ length: 4 }, () => 0)
            )
        )
    );


function gridIdToCoord(id) {
    return [id%size, Math.floor(id/size)];
}

function coordToGridId(coord) {
    return coord[1] * size + coord[0];
}

function resetGrid() {
    container.innerHTML = "";

    container.style.setProperty("--size", size);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const div = document.createElement("div");
            div.classList.add("box");

            div.addEventListener("mouseover",()=> onMouseOver(div));
            div.addEventListener("mousedown",()=> onMouseDown(div));
            div.id = "b" + coordToGridId([x, y]);

            let connectionArr = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];

            div.innerHTML = makeLinesSVG(connectionArr, y == size - 1, x == size - 1);

            container.appendChild(div);
        }
    }
}

resetGrid();




function onMouseOver(div) {
    if(!draw) return;
    //div.style.backgroundColor = color.value;
    div.style.backgroundColor = '#ffa500';

    let currentGrid = gridIdToCoord(div.id.slice(1)); //trim the first character of the box's id. b123 -> 123
    if(currentGrid[0] == prevGrid[0] && currentGrid[1] == prevGrid[1]) return;

    console.log(currentGrid,prevGrid, prevPrevGrid);
    if(prevPrevGrid != null && prevGrid != null) {
        
        let entryDiff = subPos(prevPrevGrid, prevGrid);
        let exitDiff = subPos(currentGrid, prevGrid);
        
        let entryDir = dirs.findIndex(([x, y]) => x === entryDiff[0] && y === entryDiff[1]);
        let exitDir = dirs.findIndex(([x, y]) => x === exitDiff[0] && y === exitDiff[1]);
        
        if (entryDir == -1 || exitDir == -1) return;
        
        console.log("connect (" + prevGrid + ") " + "NESW"[entryDir] + " to " + "NESW"[exitDir]);

        gridConnections[prevGrid[1]][prevGrid[0]][entryDir][exitDir] = 1; //make connection
        //redraw grid cell
        let div = document.querySelector("div#b" + coordToGridId(prevGrid));
        div.innerHTML = makeLinesSVG(gridConnections[prevGrid[1]][prevGrid[0]], prevGrid[1] == size - 1, prevGrid[0] == size - 1);
    }

    prevPrevGrid = prevGrid;
    prevGrid = currentGrid;
}

function onMouseDown(div) {
    //div.style.backgroundColor = color.value;
    div.style.backgroundColor = '#ffa500';

    prevPrevGrid = null;
    prevGrid = gridIdToCoord(div.id.slice(1));
}

window.addEventListener("mousedown", function() {
    draw = true;
});

window.addEventListener("mouseup", function() {
    draw = false;
});

//resetBtn.addEventListener("click", resetGrid);

/*
sizeEle.addEventListener("keyup", function () {
    size = sizeEle.value;
    resetGrid();
});
*/