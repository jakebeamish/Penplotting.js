/** Class representing a circle. */
export class Circle {
    /**
     * Create a circle.
     * @param {number} x - The x value of the centre.
     * @param {number} y - The y value of the centre.
     * @param {number} radius - The radius.
     */
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    /**
    * Add this Circle to an SVG Element.
    * @param {SVGElement} svg - The target SVG Element.
    * @param {Object} options - Styling options for the circle.
    * @param {string} [options.stroke = "black"] - The stroke colour.
    * @param {number} [options.strokeWidth = 0.1] - The stroke width.
    * @returns {SVGElement} - A copy of the input SVG Element with the given circle appended.
    */
    addToSVG(svg, {
        stroke = "black",
        fill = "transparent",
        strokeWidth = 0.1
    } = {}) {

        let circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        circleElement.setAttribute("cx", this.x);
        circleElement.setAttribute("cy", this.y);
        circleElement.setAttribute("r", this.radius);
        circleElement.setAttribute("stroke", stroke);
        circleElement.setAttribute("fill", fill);
        circleElement.setAttribute("stroke-width", `${strokeWidth}`);

        svg.appendChild(circleElement);
        return svg;
    }
}