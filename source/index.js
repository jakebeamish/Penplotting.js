import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";

let sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'gray'
});

let { width, height } = sketch;

let margin = width * 0.1;

let points = [];

for (let i = 0; i < 20000; i++) {
    let point = new Vector(
        margin + Math.random() * (width - margin * 2),
        margin + Math.random() * (height - margin * 2)
    )

    let valid = true;
    for (let other of points) {
        if (point.distance(other) < 2) {
            valid = false;
        }
    }
    if (valid) {
        points.push(point);
    }
}

for (let point of points) {
    let nearestNeighbours = point.nearestNeighbour(points, 3 + Math.floor(Math.random() * 10));
    for (let neighbour of nearestNeighbours) {
        sketch.lines.push(new Line(
            point, neighbour
        ))
    }
}

sketch.deduplicateLines();
console.log(sketch.lines.length)
sketch.draw();
