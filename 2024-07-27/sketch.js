import { Sketch, PAPER, map, Vector, Line, XORShift32, Circle, Quadtree, Rectangle } from "/source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "#DDDDDD",
    strokeWidth: 0.1,
})

const { width, height } = sketch.size;
const margin = 40;
const centre = new Vector(width / 2, height / 2)
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {
    let points = new Quadtree(new Rectangle(centre.x, centre.y, width/2, height/2), 3);
    let counter = 0;

    while(sketch.circles.length < 15000 && counter < 2000000) {
        counter++;
        let point = new Vector(
            prng.randomFloat() * (width - (margin * 2)) + margin,
            Math.pow(prng.randomFloat(),0.2) * (height - (margin * 2)) + margin
        );

        let valid = true;

        let others = points.query(new Rectangle(point.x, point.y, 2, 2))
        for (let other of others) {
            let distance = other.distance(point);
            let pageGradient = map(point.y, margin, height - (margin * 2), 3, 0.8);
            if (distance < pageGradient) {
                valid = false;
            }
        }

        if (valid === true) {
            points.insert(point);
            sketch.add(
                new Circle(
                    point.x, point.y,
                    0.1
                )
            )
        }
    }



}

sketch.draw();