
export function makeLinesSVG() {
    let connY = 10; //how much the connections should be offset from the bottom edge of the cell to the centre
    let connX = 30; //how much the connections should be offset from the side edge of the cell to the centre
    //coordinates of the inputs and outputs to each cell
    let cell_in_positions = [[100 - connX, 100 - connY], [100 - connY, connX], [connX, connY], [connY, 100 - connX]];
    let cell_out_positions = [[connX, 100 - connY], [100 - connY, 100 - connX], [100 - connX, connY], [connY, connX]];

    let neighbour_cell_out_positions = [[100 - connX, 100 + connY], [100 + connY, connX], [connX, -connY], [-connY, 100 - connX]];
    let neighbour_cell_in_positions = [[connX, 100 + connY], [100 + connY, 100 - connX], [100 - connX, -connY], [-connY, connX]];
    

    let svg_contents = '';

    //internal connections
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

    //input connections
    for (let i = 0; i < 4; i++) {
        if (Math.floor(Math.random() * 2) == 0) continue;

        let line_str = '<line x1="' + cell_in_positions[i][0]
        + '%" y1="' + cell_in_positions[i][1]
        + '%" x2="' + neighbour_cell_out_positions[i][0]
        + '%" y2="' + neighbour_cell_out_positions[i][1]
        + '%" style="stroke:red;stroke-width:2;" />';

        svg_contents += line_str;
    }

    //output connections
    for (let i = 0; i < 4; i++) {
        if (Math.floor(Math.random() * 2) == 0) continue;

        let line_str = '<line x1="' + cell_out_positions[i][0]
        + '%" y1="' + cell_out_positions[i][1]
        + '%" x2="' + neighbour_cell_in_positions[i][0]
        + '%" y2="' + neighbour_cell_in_positions[i][1]
        + '%" style="stroke:red;stroke-width:2;" />';

        svg_contents += line_str;
    }

    return '<svg style="position: relative; z-index: 1000;">' + svg_contents + '</svg>';
}