import { Sketch, PAPER, Line, Circle, Path, Vector, LCG, Mulberry32, XORShift32, map } from "./source/index.js";

let sketch = new Sketch({
    size: PAPER.A4.portrait(),
    backgroundColor: "#888888",
    strokeWidth: 0.1,
}
);


sketch.generate = () => {

    const prng = new XORShift32(sketch.seed.decimal);

    // console.log(sketch.seed)
    let { width, height } = sketch.size;
    const centre = new Vector(width / 2, height / 2)

    let margin = width * 0.15;

    let attemptCounter = 0;

    while (sketch.circles.length < 1000 && attemptCounter < 200000) {

        attemptCounter++;

        let point = new Vector(
            margin + prng.randomFloat() * (width - margin * 2),
            margin + prng.randomFloat() * (height - margin * 2),
        )

        let valid = true;

        let pointRadius = 0.2 + Math.pow(prng.randomFloat(), 2) * 30;

        for (let circle of sketch.circles) {
            let circlePosition = new Vector(circle.x, circle.y);
            let distance = point.distance(circlePosition);
            if (distance < 0.1 + circle.radius + pointRadius) {
                valid = false;
            }

        }

        if (valid) {
            sketch.add(new Circle(point.x, point.y, pointRadius));
        }



    }
    console.log(attemptCounter, sketch.circles.length)


    let points = [];
    let circles = [];

    for (let circle of sketch.circles) {
        points.push(new Vector(circle.x, circle.y))
    }

    for (let point of points) {
        let circle = sketch.circles.find(item => item.x === point.x && item.y === point.y)
        let n = map(circle.radius, 0.3, 30, 2, 10)
        let nearest = point.nearestNeighbour(points, n)

        for (let other of nearest) {
            sketch.add(new Line(other, point))
        }

        
        if (circle.radius > 4) {
            // circles.push(new Circle(point.x, point.y, circle.radius * 0.9))
        }
    }

    sketch.circles = [];
    sketch.add(circles);

}

sketch.draw();