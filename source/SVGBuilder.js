export class SVGBuilder {
  constructor() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  }

  setWidth(width) {
    this.svg.setAttribute("width", width);
    return this;
  }

  setHeight(height) {
    this.svg.setAttribute("height", height);
    return this;
  }

  setViewBox(viewBox) {
    this.svg.setAttribute("viewBox", viewBox);
    return this;
  }

  setBackgroundColor(color) {
    this.svg.setAttribute("style", `background-color: ${color}`);
  }

  addShape(shapeElement) {
    this.svg.appendChild(shapeElement);
    return this;
  }

  build() {
    return this.svg;
  }

  clear() {
    this.svg.innerHTML = ""; // Clear all child elements
  }
}
