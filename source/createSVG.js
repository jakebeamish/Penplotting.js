/**
 * Create an SVG element with specified width and height
 * @param {number} width 
 * @param {number} height 
 * @returns {SVGElement}
 */
export function createSVG(width = 100, height = 100) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    
    return svg;
}