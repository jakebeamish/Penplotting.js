import { Sketch, Line, Vector, LCG, unseededRandomHex } from "../../source/index.js";

/**
 * @todo Sort out Sketch class instatiation with random seed
 */
const sketch = new Sketch(200, 200, {
    // seed: unseededRandomHex(8),
    title: "10PRINT",
    backgroundColor: "snow"
});

console.table(sketch.seed)

const columns = 200;
const rows = 200;
const cellWidth = sketch.width / columns;
const cellHeight = sketch.height / rows;
const lcg = new LCG(Number(sketch.seed.decimal));

const grid = Array.from({
    length: rows
}, (v, rowIndex) => Array.from({
    length: columns
}, (v, columnIndex) => {

    let a = new Vector(
        cellWidth * columnIndex,
        cellHeight * rowIndex
    )
    let b = new Vector(
        cellWidth * (columnIndex + 1),
        cellHeight * (rowIndex + 1)
    )

    if (lcg.randomFloat() < 0.5) {
        a.add(new Vector(cellWidth, 0));
        b.subtract(new Vector(cellWidth, 0));
    }

    let line = new Line(a, b);
    sketch.lines.push(line);
}));

console.log(grid)
sketch.draw();
