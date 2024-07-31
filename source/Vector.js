import { lerp } from "./utils.js";

/**
 * @class
 */
export class Vector {
    /**
     * Create a vector from coordinates
     * @param {number} - x
     * @param {number} - y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Create a vector from an array
     * @param {array} array [x, y]
     * @returns {Vector}
     */
    static fromArray(array) {
        return new Vector(array[0], array[1]);
    }

    /**
     * Add a vector to this vector
     * @param {Vector} vector
     * @returns {Vector}
     */
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    isOnLine(line) {
        if ((line.b.x - line.a.x) * (this.y - line.a.y) !== (line.b.y - line.a.y) * (this.x - line.a.x)) {
            return false;
        }

        return Math.min(line.a.x, line.b.x) <= this.x &&
            this.x <= Math.max(line.a.x, line.b.x) &&
            Math.min(line.a.y, line.b.y) <= this.y &&
            this.y <= Math.max(line.a.y, line.b.y);
    }

    /**
     * Subtract a vector from this vector
     * @param {Vector} vector
     * @returns {Vector}
     */
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     * Multiply this vector by a scalar
     * @param {number} scalar
     * @retruns {Vector}
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Add two vectors
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Vector}
     */
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtract two vectors
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Vector}
     */
    static subtract(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Calculate the dot product of two vectors
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {number}
     */
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * Calculate the cross product of two 2D vectors
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {number}
     */
    static cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }

    /**
     *
     * @returns {number} The magnitude (Euclidean distance) of this vector
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Calculate the distance to another vector from this vector
     * @param {Vector} vector
     * @returns {number}
     */
    distance(vector) {
        const delta = Vector.subtract(this, vector);
        return delta.magnitude();
    }

    /**
     * Rotate this vector by a specified angle.
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
     * Normalise this vector
     * @returns {Vector}
     */
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            throw new Error("Cannot normalize a zero vector");
        }
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    /**
     * Get a copy of this vector
     * @returns {Vector}
     */
    clone() {
        return new Vector(this.x, this.y);
    }

    /**
     * Get the angle of this vector with respect to the positive x-axis
     * @returns {number} Angle in radians
     */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Linear interpolation between vectors
     * @param {Vector} v1
     * @param {Vector} v2
     * @param {number} amount
     * @returns {Vector}
     */
    static lerp(v1, v2, amount) {
        return new Vector(lerp(v1.x, v2.x, amount), lerp(v1.y, v2.y, amount));
    }

    nearestNeighbour(array, n) {
        let neighbours = [];
        for (let i = 0; i < n; i++) {
            let record = Infinity;
            let nearest = null;
            for (let other of array) {
                if (other != this && !neighbours.includes(other)) {
                    let dist = this.distance(other)
                    if (dist < record) {
                        nearest = other;
                        record = dist;
                    }
                }
            }
            neighbours.push(nearest)
        }
        return neighbours;
    }

    /**
     * Calculate the distance to another vector from this vector
     * @param {Vector} vector 
     * @returns {number}
     */
    distance(vector) {
        let d = Vector.subtract(this, vector);
        return d.magnitude();
    }
}
