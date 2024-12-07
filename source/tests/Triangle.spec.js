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
        new Line(c, a),
      ]);
    });
  });

  describe("getCentroid", () => {
    it("Returns a vector at the centroid of the triangle.", () => {
      const triangle = new Triangle(
        new Vector(0, 0),
        new Vector(0, 3),
        new Vector(3, 0),
      );
      expect(triangle.getCentroid()).toEqual(new Vector(1, 1));
    });
  });

  describe("getMidpoints", () => {
    it("Returns an array of vectors at midpoints of the triangle edges.", () => {
      const triangle = new Triangle(
        new Vector(0, 0),
        new Vector(0, 2),
        new Vector(2, 0),
      );
      expect(triangle.getMidpoints()).toEqual([
        new Vector(0, 1),
        new Vector(1, 1),
        new Vector(1, 0),
      ]);
    });
  });
});
