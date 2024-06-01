import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";
import { deduplicateLines } from "./deduplicateLines.js";

let sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'gainsboro'
});

let { width, height } = sketch;
const margin = 0.1 * width;

let verts = 500;

for (let i = 0; i < verts; i++) {
    const x = (margin) + ((i + 0.5) / verts) * (width - (margin * 2))
    sketch.lines.push(new Line({ x, y: margin }, { x, y: height - margin }))
}


for (let i = 0; i < 1; i++) {

    let y1 = randomInteger(margin, height - margin);
    let y2 = randomInteger(margin, height - margin);

    for (let j = 0; j < 500; j++) {
        sketch.lines.push(new Line({ x: margin, y: wrap(y1 + j, margin, height-margin) }, { x: width - margin, y: wrap(y2 + j/0.5, margin, height-margin)}))
    }
}

sketch.draw();
