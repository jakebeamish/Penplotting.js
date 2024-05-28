import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";


let sketch = new Sketch(297, 210, {
    units: 'mm'
});

let { width, height } = sketch;
let centre = new Vector(width / 2, height / 2);

for (let i = 0; i < 200; i++) { 
    let a = new Vector(((i+0.5)/200) * width, 0);
    let b = new Vector(((i+0.5)/200) * width, height);
    sketch.lines.push(new Line(a, b));
}

sketch.draw();


