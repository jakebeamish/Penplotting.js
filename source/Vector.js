export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromArray(array) {
        return new Vector(array[0], array[1]);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}