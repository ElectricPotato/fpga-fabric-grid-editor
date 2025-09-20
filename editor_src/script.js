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

        let connY = 0; //how much the connections should be offset from the bottom edge of the cell to the centre
        let connX = 30; //how much the connections should be offset from the side edge of the cell to the centre
        //coordinates of the inputs and outputs to each cell
        cell_in_positions = [[100 - connX, 100 - connY], [100 - connY, connX], [connX, connY], [connY, 100 - connX]];
        cell_out_positions = [[connX, 100 - connY], [100 - connY, 100 - connX], [100 - connX, connY], [connY, connX]];

        let svg_contents = '';

        for (let cell_in_idx = 0; cell_in_idx < 4; cell_in_idx++) {
            for (let cell_out_idx = 0; cell_out_idx < 4; cell_out_idx++) {

                if (Math.floor(Math.random() * 2) == 0) continue;

                let line_str = '<line x1="' + cell_in_positions[cell_in_idx][0]
                + '%" y1="' + cell_in_positions[cell_in_idx][1]
                + '%" x2="' + cell_out_positions[cell_out_idx][0]
                + '%" y2="' + cell_out_positions[cell_out_idx][1]
                + '%" style="stroke:red;stroke-width:2" />';

                svg_contents += line_str;
            }
        }

        div.innerHTML = '<svg>' + svg_contents + '</svg>'

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