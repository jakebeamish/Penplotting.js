import { Vector } from "./Vector.js";
/** Class representing a line. */
export class Line {
	/**
	 * Create a line between two [Vectors]{@link Vector}.
	 * @param {Vector} a - The startpoint.
	 * @param {Vector} b - The endpoint.
	 * @param {string} [options.stroke = "black"]
	 * @param {number} [options.strokeWidth = 0.1]
	 */
	constructor(a, b, {
		stroke = "black",
		strokeWidth = 0.1
	}={}) {
		this.a = a;
		this.b = b;
		this.x1 = a.x;
		this.y1 = a.y;
		this.x2 = b.x;
		this.y2 = b.y;
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
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
	 * 
	 * @returns {SVGElement}
	 */
	toSVGElement() {
		let units = "";
		let element = document.createElementNS("http://www.w3.org/2000/svg", "line")
		element.setAttribute("x1", `${this.a.x}${units}`)
		element.setAttribute("y1", `${this.a.y}${units}`)
		element.setAttribute("x2", `${this.b.x}${units}`)
		element.setAttribute("y2", `${this.b.y}${units}`)
		element.setAttribute("stroke", this.stroke)
		element.setAttribute("stroke-width", `${this.strokeWidth}${units}`);

		return element;
	}
}
