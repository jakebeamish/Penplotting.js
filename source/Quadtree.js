import { Rectangle } from "./Rectangle.js";

export class Quadtree {
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

    show(sketch) {

        sketch.add(this.boundary.lines())

        if (this.divided) {
            this.topLeft.show(sketch);
            this.topRight.show(sketch);
            this.bottomLeft.show(sketch);
            this.bottomRight.show(sketch);
        }
    }
}