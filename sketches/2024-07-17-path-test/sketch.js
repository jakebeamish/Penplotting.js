import { Sketch, PAPER, Vector, Line, XORShift32, addPathToSVG } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    title: "Path Test",
    backgroundColor: "#DDDDDD",
    strokeWidth: 0.1,
    seed: {
        decimal: 1,
        hex: "00000001"
    }
})

const { width, height } = sketch.size;
const margin = width * 0.1;
const centre = new Vector(width / 2, height / 2)
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {
    let points = [];

    for (let i = 0; i < 1000; i++) {
        points.push(new Vector(
            prng.randomFloat() * width,
            prng.randomFloat() * height
        ))
    }

    addPathToSVG(sketch.svg, points);
}

sketch.draw();