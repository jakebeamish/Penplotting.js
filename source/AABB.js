import { Vector } from "./Vector.js";
import { Line } from "./Line.js";

/** Class representing an AABB. */
export class AABB {
  /**
   * Create an AABB using centre position, width, and height.
   * @param {*} x - The x value of the centre.
   * @param {*} y - The y value of the centre.
   * @param {*} width - The width measured from the centre.
   * @param {*} height - The height measured from the centre.
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Create an AABB from four corner [Vectors]{@link Vector}.
   * @param {Vector} topLeft
   * @param {Vector} topRight
   * @param {Vector} bottomRight
   * @param {Vector} bottomLeft
   * @returns {AABB} - A new AABB object.
   */
  static fromCorners(topLeft, topRight, bottomRight, bottomLeft) {
    const centre = new Vector(topRight.x - topLeft.x, bottomLeft.y - topLeft.y);

    const width = topRight.x - centre.x;
    const height = bottomRight.y - centre.y;

    return new AABB(centre.x, centre.y, width, height);
  }

  /**
   * Check if this AABB contains a {@link Vector}.
   * @param {Vector} point - The vector to check.
   * @returns {boolean}
   */
  contains(point) {
    return (
      point.x > this.x - this.width &&
      point.x < this.x + this.width &&
      point.y > this.y - this.height &&
      point.y < this.y + this.height
    );
  }

  /**
   * Check if this aabb intersects another AABB.
   * @param {AABB} range - The target AABB to check.
   * @returns {boolean}
   */
  intersects(range) {
    return !(
      range.x - range.width > this.x + this.width ||
      range.x + range.width < this.x - this.width ||
      range.y - range.height > this.y + this.height ||
      range.y + range.height < this.y - this.height
    );
  }

  /**
   * Create an array of [Lines]{@link Line}
   * containing a line for each side of the AABB.
   * @returns {Line[]} - An array of Lines that can be added
   * to a {@link Plot} using {@link Plot#add}.
   */
  lines() {
    const topLeft = new Vector(this.x - this.width, this.y - this.height);
    const topRight = new Vector(this.x + this.width, this.y - this.height);
    const bottomLeft = new Vector(this.x - this.width, this.y + this.height);
    const bottomRight = new Vector(this.x + this.width, this.y + this.height);

    let lines = [];

    lines.push(
      new Line(topLeft, topRight),
      new Line(topRight, bottomRight),
      new Line(bottomRight, bottomLeft),
      new Line(bottomLeft, topLeft),
    );

    return lines;
  }
}
