import { Sketch, PAPER, Line, Vector, LCG, Mulberry32, XORShift32 } from "./source/index.js";

let sketch = new Sketch({
    size: PAPER.A5.portrait(),
    backgroundColor: "#888888",
    strokeWeight: 0.05,
}
);

const prng = new XORShift32(sketch.seed.decimal);

sketch.generate = () => {
    let { width, height } = sketch.size;
    const centre = new Vector(width / 2, height / 2)

    let margin = width * 0.2;

    let points = [];
    let rows = 10;
    let columns = 10;

    for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= columns; i++) {
            const vector = new Vector(
                margin + i * ((width - margin * 2) / columns),
                margin + j * ((height - margin * 2) / rows)
            )
            vector.add(new Vector(
                (prng.randomFloat() * 2 - 1) * 2,
                (prng.randomFloat() * 2 - 1) * 2
            ))
            points.push(vector);
        }
    }

    for (let i = 0; i < 100; i++) {
        points.push(new Vector(
            prng.randomInteger(margin, width - margin),
            prng.randomInteger(margin, height - margin)
        ))
    }

    for (let point of points) {
        let k = 3;
        let nearestNeighbours = point.nearestNeighbour(points, k);
        for (let neighbour of nearestNeighbours) {
            sketch.lines.push(new Line(
                point, neighbour
            ));
        }
    }
}

sketch.draw();