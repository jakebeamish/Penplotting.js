/**
 * 
 * @param {SVGElement} svg 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {number} stroke 
 * @returns {SVGElement}
 */
export function addLineToSVG(svg, x1, y1, x2, y2, stroke = 'black') {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke)

    svg.appendChild(line);
}