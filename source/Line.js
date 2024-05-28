export class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.x1 = a.x;
        this.y1 = a.y;
        this.x2 = b.x;
        this.y2 = b.y;
    }
}