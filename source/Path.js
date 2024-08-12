/** Class representing a path. */
export class Path {
    /**
     * @param {Array<Vector>} points - An array of [Vectors]{@link Vector} from which a Path is made.
     * @param {Object} [options]
     * @param {boolean} [options.isClosed = false] - A flag to optionally close the Path.
     */
    constructor(points, {
        isClosed = false,
    } = {}) {
        this.points = points;
        this.isClosed = isClosed;
    }

    /**
     * Add this path to an SVG element. Called by {@link Sketch#addPathsToSVG} inside {@link Sketch#draw}.
     * @returns {SVGElement}
     */
    addToSVG(svg, {
        stroke = "black",
        fill = "transparent",
        strokeWidth = 0.1,
    } = {}) {
    
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
        let commandString = "";
    
        commandString += `M ${this.points[0].x} ${this.points[0].y} `
        for (let i = 1; i < this.points.length; i++) {
            commandString += `L ${this.points[i].x} ${this.points[i].y} `
        }
    
        if (this.isClosed) {
            commandString += "Z";
        }
    
        pathElement.setAttribute("d", commandString)
        pathElement.setAttribute("stroke", stroke);
        pathElement.setAttribute("stroke-width", strokeWidth);
        pathElement.setAttribute("fill", fill);
    
        svg.appendChild(pathElement);
        return svg;
    }
}