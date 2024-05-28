export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromArray(array) {
        return new Vector(array[0], array[1]);
    }

    subtract(vector) {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y
        )
    }
    
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    distance(vector) {
        return this.subtract(vector).magnitude();
    }
}