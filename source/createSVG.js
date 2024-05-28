/**
 * Create an SVG element with specified width and height
 * @param {number} width 
 * @param {number} height
 * @param {Object} [options]
 * @param {string} [options.units = '']
 * @param {string} [options.backgroundColor = 'transparent']
 * 
 * @returns {SVGElement}
 */
export function createSVG(width = 100, height = 100, options = {} ) {
    let { units = '', backgroundColor = 'transparent' } = options
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', `${width}${units}`);
    svg.setAttribute('height', `${height}${units}`);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('style', `background-color:${backgroundColor}`)
    return svg;
}