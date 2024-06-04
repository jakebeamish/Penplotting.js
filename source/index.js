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
const centre = new Vector(width/2, height/2)

let margin = width * 0.1;

let points = [];

while (points.length < 6000) {

    let theta = Math.random() * Math.PI * 2;
    let r = Math.random() * (width - (margin * 2)) * 0.5;
    let point = new Vector(
        Math.cos(theta) * r,
        Math.sin(theta) * r
    )

    point.add(centre)

    let valid = true;
    for (let other of points) {
        if (point.distance(other) < 1.1) {
            valid = false;
        }
    }
    if (valid) {
        points.push(point);
    }
}

for (let point of points) {

    let k = point.distance(centre)/(width/2) - Math.random() * 0.2;
    let nearestNeighbours = point.nearestNeighbour(points,5 - k*2);
    for (let neighbour of nearestNeighbours) {
        sketch.lines.push(new Line(
            point, neighbour
        ))
    }
}

sketch.deduplicateLines();
console.log(points.length, sketch.lines.length)
sketch.draw();
