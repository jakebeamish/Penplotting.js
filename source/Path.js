import { Plot } from "./Plot.js";
import { Vector } from "./Vector.js";
/** Class representing a path. */
export class Path {
  /**
   * @param {Array<Vector>} points - An array of [Vectors]{@link Vector} from which a Path is made.
   * @param {Object} [options]
   * @param {string} [options.stroke = "black"]
   * @param {number} [options.strokeWidth = 0.1]
   * @param {string} [options.fill = "none"]
   * @param {boolean} [options.isClosed = false] - A flag to optionally close the Path.
   */
  constructor(
    points,
    { isClosed = false, stroke, strokeWidth, fill = "none" } = {}
  ) {
    if (!Array.isArray(points) || points.length < 2) {
      throw new Error("Points must be an array of two or more Vectors.");
    }

    for (let point of points) {
      if (!(point instanceof Vector)) {
        throw new Error("Points must be an array of two or more Vectors.");
      }
    }

    this.points = points;
    this.isClosed = isClosed;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.fill = fill;

    const plot = Plot.getContext();

    this.stroke = stroke !== undefined ? stroke : plot?.stroke || "black";
    this.strokeWidth =
      strokeWidth !== undefined ? strokeWidth : plot?.strokeWidth || 0.1;
  }

  toSVGElement() {
    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    let commandString = "";

    commandString += `M ${this.points[0].x} ${this.points[0].y} `;
    for (let i = 1; i < this.points.length; i++) {
      commandString += `L ${this.points[i].x} ${this.points[i].y} `;
    }

    if (this.isClosed) {
      commandString += "Z";
    }

    pathElement.setAttribute("d", commandString);
    pathElement.setAttribute("stroke", this.stroke);
    pathElement.setAttribute("stroke-width", this.strokeWidth);
    pathElement.setAttribute("fill", this.fill);

    return pathElement;
  }
}
