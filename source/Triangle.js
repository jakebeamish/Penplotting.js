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

  /**
   * Find the midpoints of a Triangle.
   * @returns {Vector[]} - An array of Vectors of midpoints
   * of the Triangle edges.
   */
  getMidpoints() {
    const lines = this.lines();
    return [
      Vector.lerp(lines[0].a, lines[0].b, 0.5),
      Vector.lerp(lines[1].a, lines[1].b, 0.5),
      Vector.lerp(lines[2].a, lines[2].b, 0.5),
    ];
  }

  /**
   * Find the centroid of a Triangle.
   * @returns {Vector} - The centroid of the Triangle.
   */
  getCentroid() {
    const d = Vector.lerp(this.a, this.b, 0.5);
    const e = Vector.lerp(this.b, this.c, 0.5);

    const medianCD = new Line(this.c, d);
    const medianAE = new Line(this.a, e);

    const point = medianAE.intersects(medianCD);
    return point;
  }
}
