import { Sketch, PAPER, Vector, Line, Circle, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A6.landscape(),
    backgroundColor: "#FFFFFF",
    strokeWeight: 0.1
})

const { width, height } = sketch.size;
const margin = width * 0.1
const prng = new XORShift32(sketch.seed.decimal)


class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point) {
        return (point.x > this.x - this.width &&
            point.x < this.x + this.width &&
            point.y > this.y - this.height &&
            point.y < this.y + this.height
        )
    }

    lines() {
        const topLeft = new Vector(this.x - this.width, this.y - this.height);
        const topRight = new Vector(this.x + this.width, this.y - this.height);
        const bottomLeft = new Vector(this.x - this.width, this.y + this.height);
        const bottomRight = new Vector(this.x + this.width, this.y + this.height);

        let lines = [];

        lines.push(
            new Line(topLeft, topRight),
            new Line(topRight, bottomRight),
            new Line(bottomRight, bottomLeft),
            new Line(bottomLeft, topLeft)
        )

        return lines;
    }
}

class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    insert(point) {

        if (!this.boundary.contains(point)) {
            return;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
            }

            this.topLeft.insert(point);
            this.topRight.insert(point);
            this.bottomLeft.insert(point);
            this.bottomRight.insert(point);

        }
    }

    subdivide() {
        let topLeftBoundary = new Rectangle(
            this.boundary.x - this.boundary.width / 2,
            this.boundary.y - this.boundary.height / 2,
            this.boundary.width / 2,
            this.boundary.height / 2
        )
        this.topLeft = new Quadtree(topLeftBoundary, this.capacity);

        let topRightBoundary = new Rectangle(
            this.boundary.x + this.boundary.width / 2,
            this.boundary.y - this.boundary.height / 2,
            this.boundary.width / 2,
            this.boundary.height / 2
        )

        this.topRight = new Quadtree(topRightBoundary, this.capacity);

        let bottomLeftBoundary = new Rectangle(
            this.boundary.x - this.boundary.width / 2,
            this.boundary.y + this.boundary.height / 2,
            this.boundary.width / 2,
            this.boundary.height / 2
        )
        this.bottomLeft = new Quadtree(bottomLeftBoundary, this.capacity);

        let bottomRightBoundary = new Rectangle(
            this.boundary.x + this.boundary.width / 2,
            this.boundary.y + this.boundary.height / 2,
            this.boundary.width / 2,
            this.boundary.height / 2
        )
        this.bottomRight = new Quadtree(bottomRightBoundary, this.capacity);
    }

    show() {

        sketch.add(this.boundary.lines())

        if (this.divided) {
            this.topLeft.show();
            this.topRight.show();
            this.bottomLeft.show();
            this.bottomRight.show();
        }
    }
}

sketch.generate = () => {


    let boundary = new Rectangle(width / 2, height / 2, 60, 40);
    let quadtree = new Quadtree(boundary, 1);

    for (let i = 0; i < 1000; i++) {
        const point = new Vector(
            prng.randomFloat() * (width - margin * 2) + margin,
            prng.randomFloat() * (height - margin * 2) + margin
        )

        quadtree.insert(point)
    }



    console.log(quadtree.show())

}


sketch.draw();
