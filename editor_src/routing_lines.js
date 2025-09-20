
const dirNorth = 0;
const dirEast  = 1;
const dirSouth = 2;
const dirWest  = 3;

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

            let lineStr = '<line x1="' + cellInPositions[cellInIdx][0]
            + '%" y1="' + cellInPositions[cellInIdx][1]
            + '%" x2="' + cellOutPositions[cellOutIdx][0]
            + '%" y2="' + cellOutPositions[cellOutIdx][1]
            + '%" style="stroke:red;stroke-width:2" />';

            svgContents += lineStr;
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

        let lineStr = '<line x1="' + cellInPositions[cellInIdx][0]
        + '%" y1="' + cellInPositions[cellInIdx][1]
        + '%" x2="' + neighbourCellOutPositions[cellInIdx][0]
        + '%" y2="' + neighbourCellOutPositions[cellInIdx][1]
        + '%" style="stroke:red;stroke-width:2;" />';

        svgContents += lineStr;
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

        let lineStr = '<line x1="' + cellOutPositions[cellOutIdx][0]
        + '%" y1="' + cellOutPositions[cellOutIdx][1]
        + '%" x2="' + neighbourCellInPositions[cellOutIdx][0]
        + '%" y2="' + neighbourCellInPositions[cellOutIdx][1]
        + '%" style="stroke:red;stroke-width:2;" />';

        svgContents += lineStr;
    }

    return '<svg style="position: relative; z-index: 1000;">' + svgContents + '</svg>';
}