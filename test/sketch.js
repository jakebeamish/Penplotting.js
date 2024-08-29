import { Sketch, Vector, Line, Rectangle, Circle, Path, PAPER, XORShift32, map } from "@jakebeamish/penplotting";

let sketch = new Sketch({
    size: PAPER.A4.portrait(),
    backgroundColor: "#888888",
    strokeWidth: 0.1,
}
);


sketch.generate = () => {

    const prng = new XORShift32(sketch.seed.decimal);
    const { width, height } = sketch.size;
    const centre = new Vector(width / 2, height / 2)
    let margin = width * 0.15;

}

sketch.draw();
