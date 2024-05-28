import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "../random.js";
import { wrap } from "../wrap.js";


let sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'ivory'
});

let { width, height } = sketch;

let rows = 7;
let cols = 7;

let x = randomInteger(0, cols) + 0.5
let y = randomInteger(0, rows) + 0.5
let start = new Vector(x * width/cols, y * height/rows)
for (let i = 0; i < 50; i++) {
    console.log(x, y)
    if (Math.random() < 0.45) {
        x = wrap(x + randomInteger(-5, 5), 0, cols);
    } else if (Math.random() < 0.9) {
y = wrap(y + randomInteger(-5, 5), 0, rows);
    } else {
        x = wrap(x + 1, 0, cols);
        y = wrap(y + 1, 0, rows);
    }

let end = new Vector(x * width/cols, y * height/rows)



    


sketch.lines.push(new Line(start, end))
start = end;
}


sketch.draw();


