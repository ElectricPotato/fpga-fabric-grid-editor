import {makeLinesSVG} from "./routing_lines.js";

const container  = document.querySelector(".container");
const sizeEle  = document.querySelector(".size");
const color  = document.querySelector(".color");
const resetBtn  = document.querySelector(".button");

let size = sizeEle.value;
let draw = false;

let prevGrid = null;
let prevPrevGrid = null;

function resetGrid() {
    container.innerHTML = "";

    container.style.setProperty("--size", size);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const div = document.createElement("div");
            div.classList.add("box");

            div.addEventListener("mouseover",()=> onMouseOver(div));
            div.addEventListener("mousedown",()=> onMouseDown(div));
            div.id = y * size + x;

            let connectionArr = [
                [1,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];

            div.innerHTML = makeLinesSVG(connectionArr, false, false);
            //div.innerHTML = makeLinesSVG(connectionArr, y == size - 1, x == size - 1);
            //console.log(x,y,y == size - 1, x == size - 1)

            container.appendChild(div);
        }
    }
}

resetGrid();

function gridIdToCoord(id) {
    return [Math.floor(id/size), id%size];
}


function onMouseOver(div) {
    if(!draw) return;
    div.style.backgroundColor = color.value;

    let currentGrid = gridIdToCoord(div.id);
    if(prevPrevGrid != null && prevGrid != null) {
        console.log("connect (" + prevPrevGrid + ") to (" + prevGrid + ") to (" + currentGrid + ")");
    }

    prevPrevGrid = prevGrid;
    prevGrid = gridIdToCoord(div.id);
}

function onMouseDown(div) {
    div.style.backgroundColor = color.value;

    prevPrevGrid = null;
    prevGrid = gridIdToCoord(div.id);
}

window.addEventListener("mousedown", function() {
    draw = true;
});

window.addEventListener("mouseup", function() {
    draw = false;
});

resetBtn.addEventListener("click", resetGrid);

sizeEle.addEventListener("keyup", function () {
    size = sizeEle.value;
    resetGrid();
});