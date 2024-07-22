import { Vector } from "./Vector.js";
import { Line } from "./Line.js";

/** Class representing a rectangle. */
export class Rectangle {
    /**
     * Create a rectangle using centre position, width, and height.
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
     * Create a rectangle from four corner [Vectors]{@link Vector}.
     * @param {Vector} topLeft 
     * @param {Vector} topRight 
     * @param {Vector} bottomRight 
     * @param {Vector} bottomLeft 
     * @returns {Rectangle} - A new Rectangle object.
     */
    static fromCorners(
        topLeft, topRight, bottomRight, bottomLeft
    ) {
        const centre = new Vector(
            topRight.x - topLeft.x,
            bottomLeft.y - topLeft.y
        )

        const width = topRight.x - centre.x;
        const height = bottomRight.y - centre.y;

        return new Rectangle(centre.x, centre.y, width, height);
    }

    /**
     * Check if this rectangle contains a {@link Vector}.
     * @param {Vector} point - The vector to check.
     * @returns {boolean}
     */
    contains(point) {
        return (point.x > this.x - this.width &&
            point.x < this.x + this.width &&
            point.y > this.y - this.height &&
            point.y < this.y + this.height
        )
    }

    /**
     * Create an array of [Lines]{@link Line}
     * containing a line for each side of the rectangle.
     * @returns {Line[]} - An array of Lines that can be added
     * to a {@link Sketch} using {@link Sketch#add}.
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
            new Line(bottomLeft, topLeft)
        )

        return lines;
    }
}