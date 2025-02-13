import { Triangle } from "../Triangle";
import { Line } from "../Line";
import { Vector } from "../Vector";

describe("Triangle", () => {

  /**
   * @type {Triangle}
   * A unit right-angled triangle with vertices at (0, 0), (1, 0) and (0, 1)
   */
  let triangle;

  beforeEach(() => {
    const a = new Vector(0, 0);
    const b = new Vector(1, 0);
    const c = new Vector(0, 1);
    triangle = new Triangle(a, b, c);
  });

  describe("constructor", () => {
    it("Returns a valid triangle object if arguments are numbers.", () => {
      expect(triangle instanceof Triangle).toBeTruthy();
    });
  });

  describe("lines", () => {
    test("Returns an array of line elements.", () => {
      expect(triangle.lines()).toEqual([
        new Line(triangle.a, triangle.b),
        new Line(triangle.b, triangle.c),
        new Line(triangle.c, triangle.a)
      ]);
    });
  });

  describe("getCentroid", () => {
    it("Returns a vector at the centroid of the triangle.", () => {
      expect(triangle.getCentroid()).toEqual(new Vector(1/3, 1/3));
    });
  });

  describe("getMidpoints", () => {
    it("Returns an array of vectors at midpoints of the triangle edges.", () => {
      expect(triangle.getMidpoints()).toEqual([
        new Vector(0.5, 0),
        new Vector(0.5, 0.5),
        new Vector(0, 0.5),
      ]);
    });
  });
});
