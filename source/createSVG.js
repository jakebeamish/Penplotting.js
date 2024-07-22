/**
 * Create an SVG element.
 * @example
 * // returns <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" style="background-color:transparent">
 * createSVG();
 *
 * @param {number} [width=100] - The width of the SVG.
 * @param {number} [height=100] - The height of the SVG.
 * @param {Object} [options] - Styling and configuration options.
 * @param {string} [options.units = ""]
 * @param {string} [options.backgroundColor = "transparent"] - The background colour of the SVG.
 *
 * @returns {SVGElement} An SVG element with specified size and style.
 */
export function createSVG(
	width = 100,
	height = 100,
	{ units = "", backgroundColor = "transparent" } = {},
) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("width", `${width}${units}`);
	svg.setAttribute("height", `${height}${units}`);
	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	svg.setAttribute("style", `background-color:${backgroundColor}`);
	return svg;
}
