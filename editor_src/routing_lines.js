
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
    let cell_in_positions = [[100 - connX, connY], [100 - connY, 100 - connX], [connX, 100 - connY], [connY, connX]];
    let cell_out_positions = [[connX, connY], [100 - connY, connX], [100 - connX, 100 - connY], [connY, 100 - connX]];

    let neighbour_cell_out_positions = [[100 - connX, -connY], [100 + connY, 100 - connX], [connX, 100 + connY], [-connY, connX]];
    let neighbour_cell_in_positions = [[connX, -connY], [100 + connY, connX], [100 - connX, 100 + connY], [-connY, 100 - connX]];
    

    let svg_contents = '';

    //internal connections
    for (let cell_in_idx = 0; cell_in_idx < 4; cell_in_idx++) {
        for (let cell_out_idx = 0; cell_out_idx < 4; cell_out_idx++) {

            if(!connectionArr[cell_in_idx][cell_out_idx]) continue;

            let line_str = '<line x1="' + cell_in_positions[cell_in_idx][0]
            + '%" y1="' + cell_in_positions[cell_in_idx][1]
            + '%" x2="' + cell_out_positions[cell_out_idx][0]
            + '%" y2="' + cell_out_positions[cell_out_idx][1]
            + '%" style="stroke:red;stroke-width:2" />';

            svg_contents += line_str;
        }
    }

    //current cell input to neighbour output connections
    for (let cell_in_idx = 0; cell_in_idx < 4; cell_in_idx++) {
        if((!eastEdge & (cell_in_idx == dirEast))
            | (!southEdge & (cell_in_idx == dirSouth))) {continue;}

        //check if cell input is being used
        let used = false;
        for (let cell_out_idx = 0; cell_out_idx < 4; cell_out_idx++) {
            used |= connectionArr[cell_in_idx][cell_out_idx];
        }
        if(!used) {continue;}

        let line_str = '<line x1="' + cell_in_positions[cell_in_idx][0]
        + '%" y1="' + cell_in_positions[cell_in_idx][1]
        + '%" x2="' + neighbour_cell_out_positions[cell_in_idx][0]
        + '%" y2="' + neighbour_cell_out_positions[cell_in_idx][1]
        + '%" style="stroke:red;stroke-width:2;" />';

        svg_contents += line_str;
    }

    //current cell output to neighbour input connections
    for (let cell_out_idx = 0; cell_out_idx < 4; cell_out_idx++) {
        if((!eastEdge & (cell_out_idx == dirEast))
            | (!southEdge & (cell_out_idx == dirSouth))) {continue;}
        
        //check if cell input is being used
        let used = false;
        for (let cell_in_idx = 0; cell_in_idx < 4; cell_in_idx++) {
            used |= connectionArr[cell_in_idx][cell_out_idx];
        }
        if(!used) {continue;}

        let line_str = '<line x1="' + cell_out_positions[cell_out_idx][0]
        + '%" y1="' + cell_out_positions[cell_out_idx][1]
        + '%" x2="' + neighbour_cell_in_positions[cell_out_idx][0]
        + '%" y2="' + neighbour_cell_in_positions[cell_out_idx][1]
        + '%" style="stroke:red;stroke-width:2;" />';

        svg_contents += line_str;
    }

    return '<svg style="position: relative; z-index: 1000;">' + svg_contents + '</svg>';
}