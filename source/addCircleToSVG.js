/**
 * 
 * @param {SVGElement} svg 
 * @param {Circle} circle 
 * @param {Object} [options] 
 * @returns {SVGElement}
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