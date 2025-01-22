/**
 * A builder class for creating and managing SVG elements, primarily intended
 * for internal use by the {@link Plot} class.
 */
export class SVGBuilder {
  /**
   * Initialises a new SVGBuilder instance with an empty SVG element.
   */
  constructor() {
    /**
     * The SVG element being built.
     * @type {SVGSVGElement}
     */
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  }

  /**
   * Sets the width of the SVG element.
   * @param {string | number} width - The width of the SVG (e.g., "100px" or 100).
   * @returns {SVGBuilder} The current instance for chaining.
   */
  setWidth(width) {
    this.svg.setAttribute("width", width);
    return this;
  }

  /**
   * Sets the height of the SVG element.
   * @param {string | number} height - The height of the SVG (e.g., "100px" or 100).
   * @returns {SVGBuilder} The current instance for chaining.
   */
  setHeight(height) {
    this.svg.setAttribute("height", height);
    return this;
  }

  /**
   * Sets the viewBox attribute of the SVG element.
   * @param {string} viewBox - The viewBox value (e.g., "0 0 100 100").
   * @returns {SVGElement} The current instance for chaining.
   */
  setViewBox(viewBox) {
    this.svg.setAttribute("viewBox", viewBox);
    return this;
  }

  /**
   * Sets the background colour of the SVG element using CSS.
   * @param {string} colour - The background colour (e.g., "red" or "#ff0000").
   * @return {SVGElement} The current instance for chaining.
   */
  setBackgroundColor(colour) {
    this.svg.setAttribute("style", `background-color: ${colour}`);
    return this;
  }

  /**
   * Adds a shape or element to the SVG element.
   * @param {SVGElement} shapeElement - The SVG element to be added.
   * @returns {SVGElement} - The current instance for chaining.
   */
  addShape(shapeElement) {
    this.svg.appendChild(shapeElement);
    return this;
  }

	/**
	 * Finalises and returns the constructed SVG element.
	 * @returns {SVGSVGElement} The built SVG element.
	 */
  build() {
    return this.svg;
  }

	/**
	 * Clears all child elements from the SVG element.
	 */
  clear() {
    this.svg.innerHTML = "";
  }
}
