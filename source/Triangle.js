import { Vector } from "./Vector.js";
import { Line } from "./Line.js";


/**
 * Class representing a triangle.
 */
export class Triangle {
	/**
	 * Create a triangle.
	 * @param {Vector} a
	 * @param {Vector} b
	 * @param {Vector} c
	 */
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	/**
	 * Create an array of [Lines]{@link Line}
	 * containing a line for each side of the Triangle.
	 * @returns {Line[]} - An array of Lines that can be added
	 * to a {@link Plot} using {@link Plot#add}.
	 */
	lines() {
		return [
			new Line(this.a, this.b),
			new Line(this.b, this.c),
			new Line(this.c, this.a),
		];
	}
}
