import { Vector } from "./Vector.js";
import { Circle } from "./Circle.js";
import { Line } from "./Line.js";
/**
 * Class representing a Point.
 */
export class Point {
	/**
	 * Create a Point.
	 * @param {Vector} position
	 * @param {string} [style = "circle"]
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
