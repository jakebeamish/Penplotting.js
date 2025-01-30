import { lerp } from "./utils.js";

/**
 * Class representing a Vector.
 */
export class Vector {
  /**
   * Create a vector from coordinates.
   * @param {number} [x=0] - x
   * @param {number} [y=0] - y
	 * @param {number} [z=0] - z
   */
  constructor(x = 0, y = 0, z = 0) {
    if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
      throw new TypeError("Vector components must be numbers.");
    }

    this.x = x;
    this.y = y;
		this.z = z;
  }

  /**
   * Create a vector from an array.
   * @param {number[]} array - Vector components as numbers in an array `[x, y, z]`.
   * @returns {Vector}
   */
  static fromArray(array) {
    return new Vector(array[0], array[1], array[2] || 0);
  }

  /**
   * Create an array from the vector's components.
   * @returns {Array} an array `[x, y, z]`.
   */
  toArray() {
    return [this.x, this.y, this.z];
  }

  /**
   * Create a 2D vector from an angle.
   * @param {number} angle - The angle of the vector in radians.
   * @param {number} [magnitude=1] - The magnitude of the vector.
   * @returns {Vector}
   */
  static fromAngle(angle, magnitude = 1) {
    return new Vector(Math.cos(angle), Math.sin(angle)).multiply(magnitude);
  }

  /**
   * Add a vector to this vector.
   * @param {Vector} vector
   * @returns {Vector}
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
		this.z += vector.z;
    return this;
  }

  /**
   * Check if this vector is equivalent to another vector.
   * @param {Vector} vector
   * @returns {boolean}
   */
  equals(vector) {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }

  /**
   * Check if this vector is a point on a {@link Line}.
   * @param {Line} line
   * @returns {boolean}
   */
  isOnLine(line) {
    if (
      (line.b.x - line.a.x) * (this.y - line.a.y) !==
      (line.b.y - line.a.y) * (this.x - line.a.x)
    ) {
      return false;
    }

    return (
      Math.min(line.a.x, line.b.x) <= this.x &&
      this.x <= Math.max(line.a.x, line.b.x) &&
      Math.min(line.a.y, line.b.y) <= this.y &&
      this.y <= Math.max(line.a.y, line.b.y)
    );
  }

  /**
   * Subtract a vector from this vector.
   * @param {Vector} vector
   * @returns {Vector}
   */
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
		this.z -= vector.z;
    return this;
  }

  /**
   * Multiply this vector by a scalar.
   * @param {number} scalar
   * @returns {Vector}
   */
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
		this.z *= scalar;
    return this;
  }

  /**
   * Add two vectors.
   * @param {Vector} v1
   * @param {Vector} v2
   * @returns {Vector}
   */
  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  /**
   * Subtract two vectors.
   * @param {Vector} v1
   * @param {Vector} v2
   * @returns {Vector}
   */
  static subtract(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  /**
   * Calculate the dot product of two vectors.
   * @param {Vector} v1
   * @param {Vector} v2
   * @returns {number}
   */
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  /**
   * Calculate the cross product of two 2D vectors.
   * @param {Vector} v1
   * @param {Vector} v2
   * @returns {number}
   */
  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  /**
   * Get the magnitude of this 2D vector.
   * @returns {number} The magnitude (Euclidean distance) of this vector.
   */
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

	/**
	 * Get the magnitude squared of this vector. This is faster than [getMagnitude]{@link Vector#getMagnitude} because it avoids using the square root.
	 * @returns {number} The magnitude squared of this vector.
	 */
  getMagnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

	/**
	 * Get the distance squared to another vector from this one.
	 * @param {Vector} vector - The target vector.
	 * @returns {number} The distance squared to the input vector.
	 */
  distanceSquared(vector) {
    const delta = Vector.subtract(this, vector);
    return delta.getMagnitudeSquared();
  }

  /**
   * Set the magnitude of this vector.
   * @param {number} magnitude
   * @returns {Vector}
   */
  setMagnitude(magnitude) {
    return this.normalize().multiply(magnitude);
  }

  /**
   * Calculate the distance to another vector from this vector
   * @param {Vector} vector
   * @returns {number}
   */
  distance(vector) {
    const delta = Vector.subtract(this, vector);
    return delta.getMagnitude();
  }

  /**
   * Calculate the distance between two vectors.
   * @param {Vector} v1
   * @param {Vector} v2
   * @returns {number}
   */
  static distance(v1, v2) {
    const delta = Vector.subtract(v1, v2);
    return delta.getMagnitude();
  }

	/**
	 * Calculate the distance squared between two vectors.
	 * @param {Vector} v1
	 * @param {Vector} v2
	 * @returns {number}
		*/
	static distanceSquared(v1, v2) {
		const delta = Vector.subtract(v1, v2);
		return delta.getMagnitudeSquared();
	}

  /**
   * Rotate this 2D vector by a specified angle.
   * @param {number} angle - The angle to rotate the vector by, in radians.
   * @returns {Vector} This vector after rotation.
   */
  rotate(angle) {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Normalize this vector by setting it's magnitude to 1.
   * @returns {Vector}
   */
  normalize() {
    const mag = this.getMagnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector.");
    }
    this.x /= mag;
    this.y /= mag;
    return this;
  }

  /**
   * Make a copy of this vector.
   * @returns {Vector}
   */
  clone() {
    return new Vector(this.x, this.y, this.z);
  }

  /**
   * Get the 2D angle of this vector with respect to the positive x-axis.
   * @returns {number} Angle in radians
   */
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Linear interpolation between vectors.
   * @param {Vector} v1
   * @param {Vector} v2
   * @param {number} amount
   * @returns {Vector}
   */
  static lerp(v1, v2, amount) {
    return new Vector(lerp(v1.x, v2.x, amount), lerp(v1.y, v2.y, amount), lerp(v1.z, v2.z, amount));
  }

  /**
   * Finds the `n` nearest neighbours to this vector, from a given array of vectors.
   * @param {Array<Vector>} array - An array of Vectors to check.
   * @param {number} n - The number of neighbours to find (must be > 0).
   * @returns {Array<Vector>}
   */
  nearestNeighbour(array, n) {
    let neighbours = [];
    for (let i = 0; i < n; i++) {
      let record = Infinity;
      let nearest = null;
      for (let other of array) {
        if (other != this && !neighbours.includes(other)) {
          let dist = this.distance(other);
          if (dist < record) {
            nearest = other;
            record = dist;
          }
        }
      }
      neighbours.push(nearest);
    }
    return neighbours;
  }
}
