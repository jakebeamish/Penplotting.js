import { Sketch, Line, Vector, LCG } from "./source/index.js";

let sketch = new Sketch(210, 297,
    {
        // units: "mm",
        // seed: 1,
        backgroundColor: "gray",
    }
);

const lcg = new LCG(sketch.seed.decimal);
// lcg.multiplier = 30000000;
// lcg.increment = 1;


sketch.generate = () => {


    let { width, height } = sketch;
    const centre = new Vector(width / 2, height / 2)

    let margin = width * 0.2;

    let points = [];
    let rows = 50;
    let columns = 50;

    for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= columns; i++) {
            const vector = new Vector(
                margin + i * ((width - margin * 2) / columns),
                margin + j * ((height - margin * 2) / rows)
            )
            vector.add(new Vector(
                (lcg.randomFloat() * 2 - 1),
                (lcg.randomFloat() * 2 - 1)
            ))
            points.push(vector);
        }
    }

    for (let i = 0; i < 10; i++) {
        points.push(new Vector(
            lcg.randomInteger(margin, width - margin),
            lcg.randomInteger(margin, height - margin)
        ))
    }

    for (let point of points) {
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