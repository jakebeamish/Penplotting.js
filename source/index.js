import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";

const sketch = new Sketch(70, 70);
const { width, height } = sketch;
const a = new Vector(0, height / 2);
const b = new Vector(width, height / 2);

sketch.lines.push(
    new Line(a, b)
)

sketch.draw();
