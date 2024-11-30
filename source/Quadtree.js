import { AABB } from "./AABB.js";

/**
 * Class representing a quadtree.
 *
 * This implementation is adapted from CodingTrain/QuadTree, which is
 * licensed under an MIT License.
 *
 * @see https://github.com/CodingTrain/QuadTree
 */
export class Quadtree {
	/**
	 * Create a quadtree.
	 * @param {AABB} boundary - The bounding box of the quadtree.
	 * @param {number} capacity - The number of points that can be
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
	 * @param {AABB} range - The bounding box of the query.
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
		let topLeftBoundary = new AABB(
			this.boundary.x - this.boundary.width / 2,
			this.boundary.y - this.boundary.height / 2,
			this.boundary.width / 2,
			this.boundary.height / 2
		);
		this.topLeft = new Quadtree(topLeftBoundary, this.capacity);

		let topRightBoundary = new AABB(
			this.boundary.x + this.boundary.width / 2,
			this.boundary.y - this.boundary.height / 2,
			this.boundary.width / 2,
			this.boundary.height / 2
		);

		this.topRight = new Quadtree(topRightBoundary, this.capacity);

		let bottomLeftBoundary = new AABB(
			this.boundary.x - this.boundary.width / 2,
			this.boundary.y + this.boundary.height / 2,
			this.boundary.width / 2,
			this.boundary.height / 2
		);
		this.bottomLeft = new Quadtree(bottomLeftBoundary, this.capacity);

		let bottomRightBoundary = new AABB(
			this.boundary.x + this.boundary.width / 2,
			this.boundary.y + this.boundary.height / 2,
			this.boundary.width / 2,
			this.boundary.height / 2
		);
		this.bottomRight = new Quadtree(bottomRightBoundary, this.capacity);
	}

	/**
	 * For each boundary of this quadtree and all it's children,
	 * create [Lines]{@link Line} from those rectangles and add them to a {@link Plot}.
	 * @param {Plot} plot
	 */
	show(plot) {
		plot.add(this.boundary.lines());

		if (this.divided) {
			this.topLeft.show(plot);
			this.topRight.show(plot);
			this.bottomLeft.show(plot);
			this.bottomRight.show(plot);
		}
	}
}
