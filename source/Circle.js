import { Plot } from "./Plot.js";

/** Class representing a circle. */
export class Circle {
  /**
   * Create a circle.
   * @param {number} x - The x value of the centre.
   * @param {number} y - The y value of the centre.
   * @param {number} radius - The radius.
   * @param {Object} options
   * @param {string} [options.stroke = "black"]
   * @param {number} [options.strokeWidth = 0.1]
   * @param {string} [options.fill = "none"]
   */
  constructor(
    x,
    y,
    radius,
    { stroke, strokeWidth, fill = "none" } = {},
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    const plot = Plot.getContext();
    this.stroke = stroke !== undefined ? stroke : plot?.stroke || "black";
    this.strokeWidth = strokeWidth !== undefined ? strokeWidth : plot?.strokeWidth || 0.1;
    this.fill = fill;
  }

  /**
   *
   * @returns {SVGElement}
   */
  toSVGElement() {
    let element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    element.setAttribute("cx", this.x);
    element.setAttribute("cy", this.y);
    element.setAttribute("r", this.radius);
    element.setAttribute("stroke", this.stroke);
    element.setAttribute("fill", this.fill);
    element.setAttribute("stroke-width", `${this.strokeWidth}`);

    return element;
  }
}
