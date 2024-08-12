import { PRNG } from "../../source/Random.js";
import { Vector, Line, Sketch, LCG, PAPER, Rectangle } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    backgroundColor: 'gainsboro',
    strokeWidth: 0.1,
});


sketch.generate = () => {
    const prng = new LCG(sketch.seed.decimal);
    const { width, height } = sketch.size;
    const margin = 20;
    const centre = new Vector(width / 2, height / 2);

    for (let j = 0; j < 10; j++) {

        let turtle = {
            position: centre.clone(),
            alive: true,
            move: function (v) {
                if (this.alive) {
                    this.position.add(v)
                }
            }
        }

        let boundary = new Rectangle(centre.x, centre.y, width * 0.5 - margin, height * 0.5 - margin);
        for (let i = 0; i < 300; i++) {
            if (!boundary.contains(turtle.position)) {
                turtle.alive = false;
            }
            let a = new Vector(turtle.position.x, turtle.position.y);
            let movement = randomVector(prng).multiply(prng.randomElement([1, 3]));
            if (turtle.alive) { turtle.move(movement); }
            let b = new Vector(turtle.position.x, turtle.position.y);
            sketch.add(new Line(a, b))
        }
    }
}

sketch.draw();

function randomVector(prng) {

    let vector = new Vector();
    while (vector.x === 0 && vector.y === 0) {
        vector = new Vector(
            prng.randomInteger(-1, 2),
            prng.randomInteger(-1, 2)
        )
    }
    return vector
}