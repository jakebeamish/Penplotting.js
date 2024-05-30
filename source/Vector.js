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
}