

This editor is made for the purpose of setting switches in a simple FPGA routing fabric.


### Target
The target is the [DECPeRLe-1](https://web.eecs.utk.edu/~dbouldin/protected/pam.pdf) FPGA from 1992.
Funnily enough, it was prototyped using existing FPGA chips (an FPGA on an FPGA), and never made as its own chip.

The architecture is not very efficient, but very simple to understand, which in my opinion makes it good for learning about the very low level architecture of FPGAs.

#### Target Fabric
 - Modern FPGAs have Logic Blocks (LB) and routing fabric around it.
 - In this FPGA, the same repeating grid cell performs both the tasks of logic and routing.
![grid_cell](/docs/grid_cell.png)
 - The grid cells are called PAMs (Programmable Active Memories) by the paper authors.
 - The whole device is 64 by 80 cells (this is more than enough to implement the Hack computer architecture from the [NAND2Tetris](https://www.nand2tetris.org/course) course).
 - Each grid cell recieves 1 bit from each of it's 4 closest neighbours, and has 1 flip-flop and outputs 1 bit to each of it's 4 closest neighbours.
 - It contains five 5 input LUTs (look up tables), one for each output and for the next state of the flip-flop.
 - The LUTs are configurable.

 - The connections at the edge of the fabric can be used for Block RAM or IO.

### Planned features
Currently the editor can only use the grid cells for passing signals around.
To be added:
 - A way to enter a boolean equation for each LUT
 - Importing/Exporting files
 - an RTL implementation of the FPGA
 - Generation of a bitstream for the RTL implementation


#### credit
The Grid editor is based on ["Build a Pixel art maker with JavaScript" by channel "xplodivity"](https://www.youtube.com/watch?v=AoyGZ6KmxXM)