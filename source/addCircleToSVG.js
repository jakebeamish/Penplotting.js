/**
 * Add a {@link Circle} to an SVG Element.
 * @param {SVGElement} svg - The target SVG Element.
 * @param {Circle} circle - The circle to be appended.
 * @param {Object} options - Styling options for the circle.
 * @param {string} [options.stroke = "black"] - The stroke colour.
 * @param {number} [options.strokeWidth = 0.1] - The stroke width.
 * @returns {SVGElement} - A copy of the input SVG Element with the given circle appended.
 */
export function addCircleToSVG(svg, circle, {
    stroke = "black",
    fill = "transparent",
    strokeWidth = 0.1
} = {}) {

    let circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circleElement.setAttribute("cx", circle.x);
    circleElement.setAttribute("cy", circle.y);
    circleElement.setAttribute("r", circle.radius);
    circleElement.setAttribute("stroke", stroke);
    circleElement.setAttribute("fill", fill);
	circleElement.setAttribute("stroke-width", `${strokeWidth}`);

    svg.appendChild(circleElement);
    return svg;
}