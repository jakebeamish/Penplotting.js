import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";
// import { deduplicateLines } from "./deduplicateObjectArray.js";

let sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'gainsboro'
});

let { width, height } = sketch;
const margin = 0.1 * width;

let verts = 10;

for (let i = 0; i < verts; i++) {
    const x = (margin) + ((i + 0.5) / verts) * (width - (margin * 2))
    sketch.lines.push(new Line({ x, y: margin }, { x, y: height - margin }))
}

for (let i = 0; i < verts; i++) {
    const x = (margin) + ((i + 0.5) / verts) * (width - (margin * 2))
    sketch.lines.push(new Line({ x, y: margin }, { x, y: height - margin }))
}


sketch.deduplicateLines();


console.log(sketch.lines.length)

sketch.draw();
