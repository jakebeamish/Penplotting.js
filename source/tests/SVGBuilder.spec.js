import { SVGBuilder } from "../SVGBuilder";

describe("SVGBuilder", () => {
  let svgBuilder;

  beforeEach(() => {
    svgBuilder = new SVGBuilder();
  });

  it("should create an SVG element.", () => {
    const svg = svgBuilder.build();
    expect(svg.nodeName).toBe("svg");
    expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");
  });

  it("should set width and height properties.", () => {
    svgBuilder.setWidth(200).setHeight(200);
    const svg = svgBuilder.build();
    expect(svg.getAttribute("width")).toBe("200");
    expect(svg.getAttribute("height")).toBe("200");
  });

  test("should set the viewBox attribute.", () => {
    svgBuilder.setViewBox("0 0 200 100");
    const svg = svgBuilder.build();
    expect(svg.getAttribute("viewBox")).toBe("0 0 200 100");
  });

  test("should add shapes to the SVG", () => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "10");
    rect.setAttribute("y", "10");
    rect.setAttribute("width", "50");
    rect.setAttribute("height", "50");
    svgBuilder.addShape(rect);

    const svg = svgBuilder.build();
    expect(svg.children.length).toBe(1);
    expect(svg.firstChild).toBe(rect);
  });

  test("should clear the SVG content", () => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    svgBuilder.addShape(rect);
    svgBuilder.clear();
    const svg = svgBuilder.build();
    expect(svg.children.length).toBe(0);
  });
});
