import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";
import { intersectionLineLine } from "./intersectionLineLine.js";

const sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'gainsboro',
});

const { width, height } = sketch;
const margin = 0.1 * width;
const centre = new Vector(width / 2, height / 2);

for (let j = 0; j < 1; j++) {

let turtle = {
    position: new Vector(margin, height/2),
    move: function(v) {
        this.position.add(v)
    }
}

let movements = [
    new Vector(1, 0),
    new Vector(1, 0),
    new Vector(0, 1),
    new Vector(0, -1),
    new Vector(1, 1),
    new Vector(1, -1),
    new Vector(1, 1),
    new Vector(1, -1),
    new Vector(-1, -1),
    new Vector(-1, 1),
]

let previous = null;

for (let i = 0; i < 50; i++) {
    let a = new Vector(turtle.position.x, turtle.position.y);

    let index = Math.floor((Math.random() * movements.length))

    let movement = movements[index];
    movement = Vector.multiply(movements[index], 5)
    turtle.move(movement);
    let b = new Vector(turtle.position.x, turtle.position.y);
    sketch.lines.push(new Line(a, b))
}

}

sketch.deduplicateLines();
console.log(sketch.lines)
sketch.draw();
