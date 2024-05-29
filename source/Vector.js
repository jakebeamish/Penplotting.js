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
     * @returns {number} The magnitude (Euclidean distance) of this vector
     */
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Calculate the distance to another vector from this vector
     * @param {Vector} vector 
     * @returns {number}
     */
    distance(vector) {
        return this.subtract(vector).magnitude();
    }
}