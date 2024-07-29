export class Path {
    /**
     * 
     * @param {Array<Vector>} points 
     */
    constructor(points, {
        isClosed = false,
    } = {}) {
        this.points = points;
        this.isClosed = isClosed;
    }

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