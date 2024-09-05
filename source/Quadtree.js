import { Rectangle } from "./Rectangle.js";
/**
 * Class representing a quadtree.
 * 
 * This implementation is adapted from CodingTrain/QuadTree, which is released
 * with an MIT License. For the full license text, see `/LICENCE.md#CodingTrain/QuadTree`.
 *
 * @see https://github.com/CodingTrain/QuadTree
 */
export class Quadtree {
    /**
     * Create a quadtree.
     * @param {Rectangle} boundary - The bounding box of the quadtree.
     * @param {number} capacity - Defines the number of points that can be
     *                            inserted into Quadtree without subdividing.
     */
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    /**
     * Check for points in a given range and return them in an array.
     * @param {Rectangle} range - The bounding box of the query.
     * @returns {Vector[]}
     */
    query(range, found = []) {
        if (!this.boundary.intersects(range)) {
            return found;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            if (this.divided) {
                this.topLeft.query(range, found);
                this.topRight.query(range, found);
                this.bottomLeft.query(range, found);
                this.bottomRight.query(range, found);
            }
        }

        return found;
    }

    /**
     * Add a point into this quadtree.
     * @param {Vector} point 
     */
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

    /**
     * For each boundary of this quadtree and all it's children,
     * create [Lines]{@link Line} from those rectangles and add them to a {@link Sketch}.
     * @param {Sketch} sketch 
     */
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
