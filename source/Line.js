import { Vector } from "./Vector";
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
	 * Create a Line from an array of numbers.
	 * @param {Array<number>} array - [x1, y1, x2, y2].
	 * @returns {Line}
	 */
	static fromArray(array) {
		return new Line(
			new Vector(array[0], array[1]),
			new Vector(array[2], array[3])
		);
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

	/**
	 * Check if this line lies directly on top of a longer line.
	 * @param {Line} line - The target line to check against.
	 * @returns {boolean} - True if this line's startpoint and endpoint are both
	 * on the line being checked against, otherwise False.
	 */
	isContainedBy(line) {
		return this.a.isOnLine(line) && this.b.isOnLine(line);
	}

	/**
	  * Add a line to an SVG element
	  * @param {SVGElement} svg - The target SVG element.
	  * @param {Object} [options] - A config object.
	  * @param {string} [options.units = ""] - Units for the line (i.e. "mm" or "in").
	  * @param {string} [options.stroke = "black"] - The line colour.
	  * @param {number} [options.strokeWidth = 0.1] - The width of the line.
	  * @returns {SVGElement} - The SVG element after appending this line.
	  */
	addToSVG(svg, {
		units = "",
		stroke = "black",
		strokeWidth = 0.1
	} = {}) {
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", `${this.x1}${units}`);
		line.setAttribute("y1", `${this.y1}${units}`);
		line.setAttribute("x2", `${this.x2}${units}`);
		line.setAttribute("y2", `${this.y2}${units}`);
		line.setAttribute("stroke", stroke);
		line.setAttribute("stroke-width", `${strokeWidth}${units}`);

		svg.appendChild(line);
		return svg;
	}
}
