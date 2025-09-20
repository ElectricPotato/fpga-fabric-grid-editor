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
    for(let i=0;i<size*size;i++){
        const div = document.createElement("div");
        div.classList.add("box");

        div.addEventListener("mouseover",()=> onMouseOver(div));
        div.addEventListener("mousedown",()=> onMouseDown(div));
        div.id = i;

        container.appendChild(div);
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