import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";

let sketch = new Sketch(70, 70, {
    units: 'mm',
    backgroundColor: 'black'
});

let { width, height } = sketch;


sketch.draw();
