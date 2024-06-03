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
        // return new Vector(
            this.x += vector.x,
            this.y += vector.y
        // )
    }

    /**
     * Subtract a vector from this vector
     * @param {Vector} vector 
     * @returns {Vector}
     */
    subtract(vector) {
        // return new Vector(
            this.x -= vector.x,
            this.y -= vector.y
        // )
    }

    /**
     * 
     * @param {*} v1 
     * @param {*} v2 
     * @returns 
     */
    static add(v1, v2) {
        return new Vector(
            v1.x + v2.x,
            v1.y + v2.y
        )
    }

    /**
     * 
     * @param {*} v1 
     * @param {*} v2 
     * @returns 
     */
    static subtract(v1, v2) {
        return new Vector(
            v1.x - v2.x,
            v1.y - v2.y
        )
    }

    static lerp(v1, v2, amount) {
        return new Vector(
            v1.x + amount * (v2.x - v1.x),
            v1.y + amount * (v2.y - v1.y)
        )
    }

    static multiply(v, scalar) {
        return new Vector(
            v.x * scalar,
            v.y * scalar
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
        let length = Vector.subtract(this, vector);
        return length.magnitude();
    }
}