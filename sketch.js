import { Sketch, Line, Vector, LCG, randomHex, randomInteger, sinFract } from "./source/index.js";

let sketch = new Sketch(100, 141,
    {
        units: "mm",
        backgroundColor: "ivory",
    }
);

const { width, height } = sketch;

const lcg = new LCG(sketch.seed.decimal);

const margin = 0.1 * (width + height) * 0.5;

for (let i = 0; i < 100; i++) {
    const x = margin + (i / 100) * (width - (margin * 2));
    const a = new Vector(x, margin);
    const b = new Vector(x, height - margin);

    const r = lcg.random();
    if (r < 0.5) {
        const o = new Vector(randomInteger(-5, 5, sinFract(i * 0.0000000000000000001, 0.0001, 0.000000001, 0.00001, 1)) * 0.5, 0);
        const c = Vector.add(b, o);
        const d = Vector.add(a, o);
        sketch.lines.push(new Line(a, c));
        sketch.lines.push(new Line(d, b));
    }

    sketch.lines.push(new Line(a, b));
}

sketch.draw();