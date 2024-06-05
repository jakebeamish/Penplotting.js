import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { LCG, randomInteger, sinFract, wrap } from "./utils.js";

const sketch = new Sketch(141, 200);
const { width, height } = sketch;
const margin = 0.5 * (width + height) * 0.1;
const seed = 1000;
const lcg = new LCG(seed)


const rows = 500;
const columns = 250;

let grid = [];

for (let i = 0; i < columns; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
        grid[i][j] = sinFract(i, j, 9931.035, 5313.777, Math.PI * 100000);
    }
}

for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        let a = new Vector(margin + (i / columns) * (width - margin * 2), margin + (j / rows) * (height - margin * 2));
        let b = new Vector(1, 0).rotate(grid[i][j] * Math.PI * 2);
        b.multiply(0.5);
        b.add(a)

        sketch.lines.push(new Line(a, b))
    }
}

sketch.draw();
