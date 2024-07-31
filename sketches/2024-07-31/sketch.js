import { Sketch, PAPER, Vector, Line, Path, XORShift32, Quadtree, Rectangle } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    backgroundColor: "#FFFFFF",
    strokeWidth: 0.1
})

const { width, height } = sketch.size;
const centre = new Vector(width / 2, height / 2);
const margin = width * 0.2;
const prng = new XORShift32(sketch.seed.decimal);

let tree = new Quadtree(new Rectangle(centre.x, centre.y, width, height), 1)

sketch.generate = () => {

    let points = [];
    let start = centre;
    let current = start;
    for (let i = 0; i < 100; i++) {
        points.push(current);
        tree.insert(current);

        let success = false;
        let tries = 0;
        while (!success && tries < 5) {

            let randomVector = prng.randomElement([
                new Vector(0, -1),
                new Vector(0, 1),
                new Vector(1, 0),
                new Vector(-1, 0),
                new Vector(1, 1)
            ]).multiply(2 * prng.randomInteger(1, 10))
            let next = Vector.add(current, randomVector);
            let nearest = tree.query(new Rectangle(
                next.x, next.y,
                5, 5
            ))
            console.log(nearest.length, tries)

            if (nearest.length > 0) {
                tries++;
                // success = false;
            } else {
                current = next;
                success = true;
            }
        }
    }

    sketch.add(new Path(points))

}


sketch.draw();