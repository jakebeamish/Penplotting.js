/**
 * @class
 */
export class Vector {
    /**
     * Create a vector from coordinates
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
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

    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    static add(v1, v2) {
        return new Vector(
            v1.x + v2.x,
            v1.y + v2.y
        )
    }

    static subtract(v1, v2) {
        return new Vector(
            v1.x - v2.x,
            v1.y - v2.y
        )
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
        this.subtract(vector);
        return this.magnitude();
    }

    /**
    * Rotate this vector by a specified angle.
    * @param {number} angle - The angle to rotate the vector by, in radians.
    * @returns {Vector} This vector after rotation.
    */
    rotate(angle) {
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const x = this.x * cosAngle - this.y * sinAngle;
        const y = this.x * sinAngle + this.y * cosAngle;
        this.x = x;
        this.y = y;
        return this;
    }
}