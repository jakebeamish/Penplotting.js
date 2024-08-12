import { Sketch, PAPER, Vector, Line, Circle, Rectangle, Path, Quadtree, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "#FFFFFF",
    strokeWidth: 0.1
})

sketch.generate = () => {
    const { width, height } = sketch.size;
    const margin = 0.5 * (width + height) * 0.2;
    const prng = new XORShift32(sketch.seed.decimal);
    const centre = new Vector(width/2, height/2);


    for (let i = 0; i < 3000; i++) {
        let a = Vector.fromAngle(prng.randomFloat() * Math.PI * 2, 60).add(centre);
        let b = Vector.fromAngle(prng.randomFloat() * Math.PI * 2, 60).add(centre);

        sketch.add(new Line(a, b));
    }

}


sketch.draw();