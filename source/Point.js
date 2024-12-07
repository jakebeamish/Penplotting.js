import { Vector } from "./Vector.js";
import { Circle } from "./Circle.js";
import { Line } from "./Line.js";
/**
 * Class representing a Point.
 *
 * SVG does not have a built-in way of making points. Either a very short {@link Line}
 * or a very small {@link Circle} is passed to the {@link SVGBuilder} instead.
 */
export class Point {
	/**
	 * Create a Point.
	 *
	 * Points are constructed from a {@link Vector} position, a size, and a style.
	 *
	 * @param {Vector} position - The position of the Point as a {@link Vector}.
	 * @param {Number} [length = 0.25] - The radius or length of the drawn Point.
	 * @param {string} [style = "circle"] - The style of the Point ("circle" or "line").
	 */
	constructor(position, length = 0.25, style = "circle") {
		this.position = position;
		this.style = style;
		this.length = length;
	}

	/**
	 * @returns {SVGElement}
	 */
	toSVGElement() {
		let shape;
		switch (this.style) {
			case "circle":
				shape = new Circle(this.position.x, this.position.y, this.length);
				return shape.toSVGElement();
			case "line":
				let length = new Vector(this.length, 0);
				let direction = 0;
				shape = new Line(this.position, Vector.add(this.position, length));
				return shape.toSVGElement();
		}
	}
}
