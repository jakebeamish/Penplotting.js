import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";

let sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'gainsboro'
});

let { width, height } = sketch;

sketch.deduplicateLines();
sketch.draw();
