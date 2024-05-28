/**
 * Create an SVG element with specified width and height
 * @param {number} width 
 * @param {number} height 
 * @returns {SVGElement}
 */
export function createSVG(width = 100, height = 100, units = '') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', `${width}${units}`);
    svg.setAttribute('height', `${height}${units}`);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    return svg;
}