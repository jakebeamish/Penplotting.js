/** Class representing a circle. */
export class Circle {
    /**
     * Create a circle.
     * @param {number} x - The x value of the centre.
     * @param {number} y - The y value of the centre.
     * @param {number} radius - The radius.
     */
    constructor(x, y, radius, {
        stroke = "black",
        strokeWidth = 0.1,
        fill = "none"
    }={}) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.fill = fill;
    }

    toSVGElement() {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        element.setAttribute("cx", this.x);
        element.setAttribute("cy", this.y);
        element.setAttribute("r", this.radius);
        element.setAttribute("stroke", this.stroke);
        element.setAttribute("fill", this.fill);
        element.setAttribute("stroke-width", `${this.strokeWidth}`);

        return element;
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