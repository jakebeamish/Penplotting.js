export class Path {
    /**
     * 
     * @param {Array<Vector>} points 
     */
    constructor(points, {
        isClosed = false,
    }) {
        this.points = points;
        this.isClosed = isClosed;
    }
}