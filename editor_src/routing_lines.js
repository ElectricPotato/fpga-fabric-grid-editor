
const dirNorth = 0;
const dirEast  = 1;
const dirSouth = 2;
const dirWest  = 3;

/**
 * Create a line tag for the svg
 * @param {Number[]} startPos - Start position as a 2 number array [x, y]
 * @param {Number[]} endPos - End position as a 2 number array [x, y]
 * @returns {string}
 **/
function makeLine(startPos, endPos) {
    return '<line x1="' + startPos[0]
            + '%" y1="' + startPos[1]
            + '%" x2="' + endPos[0]
            + '%" y2="' + endPos[1]
            + '%" style="stroke:red;stroke-width:2" />';
}

/**
 * Create an <svg> tag containing the lines representing the connections in a block
 * @param {Boolean[][]} connectionArr - connection matrix of inputs to output
 * @param {Boolean} southEdge - if to render the connections with 
 * @param {Boolean} eastEdge
 **/
export function makeLinesSVG(connectionArr, southEdge = false, eastEdge = false) {
    let connY = 10; //how much the connections should be offset from the bottom edge of the cell to the centre
    let connX = 30; //how much the connections should be offset from the side edge of the cell to the centre
    //coordinates of the inputs and outputs to each cell
    let cellInPositions = [[100 - connX, connY], [100 - connY, 100 - connX], [connX, 100 - connY], [connY, connX]];
    let cellOutPositions = [[connX, connY], [100 - connY, connX], [100 - connX, 100 - connY], [connY, 100 - connX]];

    let neighbourCellOutPositions = [[100 - connX, -connY], [100 + connY, 100 - connX], [connX, 100 + connY], [-connY, connX]];
    let neighbourCellInPositions = [[connX, -connY], [100 + connY, connX], [100 - connX, 100 + connY], [-connY, 100 - connX]];
    

    let svgContents = '';

    //internal connections
    for (let cellInIdx = 0; cellInIdx < 4; cellInIdx++) {
        for (let cellOutIdx = 0; cellOutIdx < 4; cellOutIdx++) {
            if(!connectionArr[cellInIdx][cellOutIdx]) continue;

            svgContents += makeLine(cellInPositions[cellInIdx], cellOutPositions[cellOutIdx]);
        }
    }

    //current cell input to neighbour output connections
    for (let cellInIdx = 0; cellInIdx < 4; cellInIdx++) {
        if((!eastEdge & (cellInIdx == dirEast))
            | (!southEdge & (cellInIdx == dirSouth))) {continue;}

        //check if cell input is being used
        let used = false;
        for (let cellOutIdx = 0; cellOutIdx < 4; cellOutIdx++) {
            used |= connectionArr[cellInIdx][cellOutIdx];
        }
        if(!used) {continue;}

        svgContents += makeLine(cellInPositions[cellInIdx], neighbourCellOutPositions[cellInIdx]);
    }

    //current cell output to neighbour input connections
    for (let cellOutIdx = 0; cellOutIdx < 4; cellOutIdx++) {
        if((!eastEdge & (cellOutIdx == dirEast))
            | (!southEdge & (cellOutIdx == dirSouth))) {continue;}
        
        //check if cell input is being used
        let used = false;
        for (let cellInIdx = 0; cellInIdx < 4; cellInIdx++) {
            used |= connectionArr[cellInIdx][cellOutIdx];
        }
        if(!used) {continue;}

        svgContents += makeLine(cellOutPositions[cellOutIdx], neighbourCellInPositions[cellOutIdx]);
    }

    return '<svg style="position: relative; z-index: 1000;">' + svgContents + '</svg>';
}