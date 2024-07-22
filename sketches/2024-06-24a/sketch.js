import { Sketch, PAPER, Vector, Line, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    backgroundColor: "gainsboro",
    strokeWidth: 0.1
})

const { width, height } = sketch.size;
const margin = width * 0.2;
const centre = new Vector(width/2, height/2)
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {

    let points = [];
    for (let i = 0; i < 5000; i++) {

        let r = (prng.randomFloat() ** 0.5) * 50;
        let angle = prng.randomFloat() * Math.PI * 2;
        
        let point = new Vector(
            Math.sin(angle) * r,
            Math.cos(angle) * r
        )

        // point.add(centre);
        points.push(Vector.add(point, centre));
        // points.push(Vector.subtract(centre, point))
        // let b = 
        // points.push(Vector.subtract(a))
    }

    for (let point of points) {
        let neighbours = point.nearestNeighbour(points, 5);

        for (let neighbour of neighbours) {
            sketch.lines.push(new Line(
                point, neighbour
            ))
        }
    }
}

sketch.draw();