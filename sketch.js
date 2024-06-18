import { Sketch, Line, Vector, LCG } from "./source/index.js";

let sketch = new Sketch(200, 282,
    {
        // units: "mm",
        seed: 1,
        backgroundColor: "gray",
    }
);

const lcg = new LCG(sketch.seed.decimal);
// lcg.multiplier = 30000000;
// lcg.increment = 1;


sketch.generate = function () {


    let { width, height } = sketch;
    const centre = new Vector(width / 2, height / 2)

    let margin = width * 0.1;

    let points = [];

    while (points.length < 4000) {

        let theta = lcg.randomFloat() * Math.PI * 2;
        let r = lcg.randomFloat() * (width - (margin * 2)) * 0.5;
        let point = new Vector(
            Math.cos(theta) * r,
            Math.sin(theta) * r
        )

        point.add(centre)

        let valid = true;
        for (let other of points) {
            if (point.distance(other) < 1.1) {
                valid = false;
            }
        }
        if (valid) {
            points.push(point);
        }
    }

    for (let point of points) {

        // let k = point.distance(centre) / (width / 2);
        let k = 4;
        let nearestNeighbours = point.nearestNeighbour(points, k);
        for (let neighbour of nearestNeighbours) {
            sketch.lines.push(new Line(
                point, neighbour
            ))
        }
    }

}

sketch.draw();