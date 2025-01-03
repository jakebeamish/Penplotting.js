import { Vector } from "./Vector.js";
import { Circle } from "./Circle.js";
import { Line } from "./Line.js";

/**
 * Class representing a Point.
 *
 * A Point is a small plottable shape that is drawn as either a {@link Circle}
 * by default, or a very short {@link Line}.
 * 
 * Points can be instantiated with a vector position.
 */
export class Point {
  /**
   * Create a Point.
   *
   * Points are constructed from a {@link Vector} position, a size, and a style.
   *
   * @param {Vector} position - The position of the Point as a {@link Vector}.
   * @param {Number} [length = 0.25] - The radius or length of the drawn Point.
   * @param {string} [style = "circle"] - Shape type ("circle" or "line").
   */
  constructor(position, length = 0.25, style = "circle") {
    this.position = position;
    this.style = style;
    this.length = length;
  }

  /**
	 * Converts the Point to an SVGElement.
	 *
	 * This method is used by {@link Plot#add}.
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
