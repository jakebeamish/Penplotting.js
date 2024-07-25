import { Sketch, PAPER, Vector, Line, XORShift32, Quadtree, Rectangle } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    backgroundColor: "gainsboro",
    strokeWidth: 0.1,
    seed: {
        decimal: 1,
        hex: "00000001"
    }
})

const { width, height } = sketch.size;
const margin = width * 0.2;
const centre = new Vector(width / 2, height / 2)
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {
    let quadtree = new Quadtree(new Rectangle(centre.x, centre.x, width / 2, height / 2), 1);

    let points = [];
    for (let i = 0; i < 3000; i++) {

        let r = (prng.randomFloat() ** 0.5) * 50;
        let angle = prng.randomFloat() * Math.PI * 2;

        let point = new Vector(
            Math.sin(angle) * r,
            Math.cos(angle) * r
        ).add(centre);

        points.push(point);
        quadtree.insert(point);

    }

    for (let point of points) {
        let searchbox = new Rectangle(point.x, point.y, 10, 10);
        let query = quadtree.query(searchbox);
        let neighbours = point.nearestNeighbour(query, 5);

        if (neighbours.length > 0) {
            for (let neighbour of neighbours) {
                sketch.lines.push(new Line(
                    point, neighbour
                ))
            }
        }
    }

    quadtree.show(sketch)

}

sketch.draw();