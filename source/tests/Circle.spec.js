import { Circle } from "../Circle";

describe("Circle", () => {
  describe("constructor", () => {
    it("Returns a valid circle object if arguments are numbers.", () => {
      const circle = new Circle(0, 0, 10);
      expect(circle instanceof Circle).toBeTruthy();
    });
  });

  describe("toSVGElement", () => {
    test("Returns a valid SVG Circle element.", () => {
      const circle = new Circle(0, 0, 1);
      const s = new XMLSerializer();
      const string = s.serializeToString(circle.toSVGElement());
      expect(string).toMatch(/<circle/);
      expect(string).toMatch(/cx="0" cy="0" r="1"/);
    });
  });
});
