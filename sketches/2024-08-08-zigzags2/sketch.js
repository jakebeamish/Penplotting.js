import { Sketch, PAPER, Vector, Line, Circle, Rectangle, Path, Quadtree, XORShift32, map } from "../../source/index.js";

const sketch = new Sketch({
    title: "zigzag-test",
    size: PAPER.A5,
    backgroundColor: "#F0F0F0",
    strokeWidth: 0.15,
})

sketch.generate = () => {
    const { width, height } = sketch.size;
    const margin = 0.5 * (width + height) * 0.3;
    const prng = new XORShift32(sketch.seed.decimal);
    const centre = new Vector(width / 2, height / 2);
    let start = randomVector();

    for (let i = 0; i < 20; i++) {
        let points = [];

        let next = randomVector();

        if (prng.randomChance(0.5)) {
            points.push(next);
            start = next;
            next = randomVector();
        }
        // let zigzag = (makeZigzag(start, next, 0.1 + (prng.randomFloat() ** 4) * 1, 3 + prng.randomFloat() * 80));
        let squarewave = makeSquareWave(start, next, 30,prng.randomElement([2, 5, 20]), prng);
        points = points.concat(squarewave)
        start = next;
        let path = new Path(points);
        sketch.add(path);
    }







    function randomVector() {
        return new Vector(
            prng.randomInteger(margin, width - margin),
            prng.randomInteger(margin, height - margin)
        )
    }

}

sketch.draw();

function makeSquareWave(startpoint, endpoint, density, amplitude, prng) {

    let points = [];

    const angle = Vector.subtract(endpoint, startpoint).getAngle();
    const length = Vector.distance(startpoint, endpoint);
    const wavelength = length / (density * 2);

    for (let i = 0; i < (density * 2-1); i++) {
        let point = Vector.lerp(startpoint, endpoint, i / (density* 2));

        point.add(new Vector(0, (amplitude) * (((i % 2) * 2) - 1)).rotate(angle));
        points.push(point);

        let point2 = point.clone();
        point2.add(new Vector(wavelength , 0).rotate(angle));
        if (i < (density * 2 - 1) - 1) {
        points.push(point2)
        }


    }


    return points;
}
