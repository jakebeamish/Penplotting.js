/**
 * Add a line to an SVG element
 * @param {SVGElement} svg
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {Object} [options]
 * @param {string} [options.units = ""]
 * @param {string} [options.stroke = "black"]
 * @param {number} [options.strokeWidth = 0.1]
 * @returns {SVGElement}
 */
export function addLineToSVG(svg, x1, y1, x2, y2, {
	units = "",
	stroke = "black",
	strokeWidth = 0.1
} = {}) {
	const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute("x1", `${x1}${units}`);
	line.setAttribute("y1", `${y1}${units}`);
	line.setAttribute("x2", `${x2}${units}`);
	line.setAttribute("y2", `${y2}${units}`);
	line.setAttribute("stroke", stroke);
	line.setAttribute("stroke-width", `${strokeWidth}${units}`);

	svg.appendChild(line);
	return svg;
}
