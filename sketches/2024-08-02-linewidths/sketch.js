import { Sketch, PAPER, Vector, Line, Circle, Rectangle, Path, Quadtree, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "white",
    stroke: "red",
    strokeWidth: 0.5
})

sketch.generate = () => {
    const { width, height } = sketch.size;
    const margin = 0.5 * (width + height) * 0.2;
    const prng = new XORShift32(sketch.seed.decimal);
    const centre = new Vector(width/2, height/2);


    sketch.add([
        new Circle(width/2, height/2, 10),
        new Line(new Vector(0, height/2), new Vector(width, height/2)),
        new Path([new Vector(0, 0), centre]),
    ])

    sketch.add(new Rectangle(centre.x, centre.y, 10, 10).lines())
}


sketch.draw();