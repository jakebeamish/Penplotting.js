import { Point } from "../Point.js";
import { Vector } from "../Vector.js";

describe("Point", () => {
  describe("constructor", () => {
    it("Returns a valid Point object if created from a Vector.", () => {
      const vector = new Vector(2, 2);
      const point = new Point(vector);

      expect(point instanceof Point).toBeTruthy();
    });
  });

  describe("toSVGElement", () => {
    it("Returns a valid Circle SVGElement if Point style is 'circle'.", () => {
      const point = new Point(new Vector(0, 0), "circle");
      const s = new XMLSerializer();
      const string = s.serializeToString(point.toSVGElement());

      expect(point.toSVGElement() instanceof SVGElement).toBeTruthy();
      expect(string).toMatch(`<circle`);
    });
    it("Returns a valid Line SVGElement if Point style is 'line'.", () => {
      const point = new Point(new Vector(0, 0), 0.1, "line");
      const s = new XMLSerializer();
      const string = s.serializeToString(point.toSVGElement());

      expect(point.toSVGElement() instanceof SVGElement).toBeTruthy();
      expect(string).toMatch(`<line`);
    });
  });
});
