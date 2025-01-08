import { Path } from "../Path";
import { Vector } from "../Vector";

describe("Path", () => {
  describe("constructor", () => {
    it("Returns a valid default path element with points given as an array of vectors.", () => {
      const points = [
        new Vector(0, 0),
        new Vector(5, 1),
        new Vector(6, 5),
        new Vector(1, 6),
      ];
      const path = new Path(points);

      expect(path instanceof Path).toBeTruthy();
      expect(path.points).toEqual(points);
    });

    it("Throws an error if points is not an array of two or more vectors.", () => {
      expect(() => {
        new Path();
      }).toThrow();

      expect(() => {
        new Path([new Vector()]);
      }).toThrow();

      expect(() => {
        new Path(["1", "2"]);
      }).toThrow();
    });
  });

  describe("toSVGElement", () => {
    it("Returns a valid unclosed path element with a command string that does not contain a 'Z' if this path is not closed.", () => {
      const path = new Path([new Vector(0, 0), new Vector(1, 1)], {
        isClosed: false,
      });
      expect(path.toSVGElement().outerHTML).not.toMatch("Z");
    });

    it("Returns a valid closed path element with a command string that ends with a 'Z'.", () => {
      const path = new Path([new Vector(0, 0), new Vector(1, 1)], {
        isClosed: true,
      });

      expect(path.toSVGElement().outerHTML).toMatch("Z");
    });
  });
});
