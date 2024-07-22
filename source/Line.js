/** Class representing a line. */
export class Line {
	/**
	 * Create a line between two [Vectors]{@link Vector}.
	 * @param {Vector} a - The startpoint.
	 * @param {Vector} b - The endpoint.
	 */
	constructor(a, b) {
		this.a = a;
		this.b = b;
		this.x1 = a.x;
		this.y1 = a.y;
		this.x2 = b.x;
		this.y2 = b.y;
	}

	/**
	 * Get the length.
	 * @returns {number} The distance from the startpoint to the endpoint.
	 * Uses the {@link Vector#distance} method.
	 */
	length() {
		return this.a.distance(this.b);
	}

	/**
	 * Check if this line is the same as another line.
	 * @param {Line} line - The target line to compare to.
	 * @returns {boolean} True if startpoints and endpoints are identical or in reverse.
	 */
	isDuplicate(line) {
		return (this.a.equals(line.a) && this.b.equals(line.b)) ||
			(this.a.equals(line.b) && this.b.equals(line.a));
	}
}
