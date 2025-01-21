import { Circle } from "../Circle";
import { Vector } from "../Vector";

describe("Circle", () => {

	let circle;

	beforeEach(() => {
		circle = new Circle(0, 0, 1);
	})

  describe("constructor", () => {
    it("Returns a valid circle object if arguments are numbers.", () => {
      expect(circle instanceof Circle).toBeTruthy();
    });
  });

  describe("fromVector", () => {
    it("Returns a valid circle object if given a Vector and a radius number.", () => {
      const centre = new Vector(0, 0);
      const radius = 1;
      const result = Circle.fromVector(centre, radius);

      expect(result.x).toEqual(circle.x);
      expect(result.y).toEqual(circle.y);
      expect(result.radius).toEqual(circle.radius);
    });
  });

  describe("toSVGElement", () => {
    test("Returns a valid SVG Circle element.", () => {
      const s = new XMLSerializer();
      const string = s.serializeToString(circle.toSVGElement());
      expect(string).toMatch(/<circle/);
      expect(string).toMatch(/cx="0" cy="0" r="1"/);
    });
  });
});
