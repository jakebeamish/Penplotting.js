import { Triangle } from "../Triangle";
import { Line } from "../Line";
import { Vector } from "../Vector";

describe("Triangle", () => {
  describe("constructor", () => {
    it("Returns a valid triangle object if arguments are numbers.", () => {
			const a = new Vector(0, 0);
			const b = new Vector(5, 0);
			const c = new Vector(5, 5);
      const triangle = new Triangle(a, b, c);
      expect(triangle instanceof Triangle).toBeTruthy();
    });
  });

  describe("lines", () => {
    test("Returns an array of line elements.", () => {
			const a = new Vector(0, 0);
			const b = new Vector(5, 0);
			const c = new Vector(5, 5);
      const triangle = new Triangle(a, b, c);
			expect(triangle.lines()).toEqual([
				new Line(a, b),
				new Line(b, c),
				new Line(c, a)
			]);
    });
  });
});
