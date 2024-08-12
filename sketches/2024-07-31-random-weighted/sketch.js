import { Sketch, PAPER, Vector, Line, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "#FFFFFF",
    strokeWeight: 0.1
})

const { width, height } = sketch.size;
const margin = width * 0.2
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {
    let options = [
        {
            option: "blue",
            weight: 0.5
        },
        {
            option: "green",
            weight: 0.5
        },
        {
            option: () => width / 2,
            weight: 0.5
        }
    ]

    for (let i = 0; i < 10; i++) {
        console.log(prng.randomWeighted(options))
    }
}


sketch.draw();