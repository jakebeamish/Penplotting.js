import { Line } from "../Line";
import { Vector } from "../Vector";

describe("Line", () => {
  describe("fromArray", () => {
    it("Returns a new Line if creation is successful.", () => {
      const line = Line.fromArray([0, 0, 1, 1]);

      expect(line instanceof Line).toBe(true);
    });
  });

  describe("length", () => {
    it.each([
      { start: new Vector(0, 0), end: new Vector(10, 0), expected: 10 },
      { start: new Vector(0, 0), end: new Vector(0, -10), expected: 10 },
      {
        start: new Vector(0, 0),
        end: new Vector(10, 10),
        expected: 10 * Math.sqrt(2),
      },
      { start: new Vector(0, 0), end: new Vector(0, 0), expected: 0 },
    ])(
      "Returns a distance of $expected from [$start.x, $start.y] to [$end.x, $end.y]\.",
      ({ start, end, expected }) => {
        const line = new Line(start, end);

        expect(line.length()).toBe(expected);
      }
    );
  });

  describe("isContainedBy", () => {
    it("Returns false if this line is not overlapping the target line.", () => {
      const line = Line.fromArray([0, 0, 1, 1]);
      const targetLine = Line.fromArray([1, 1, 2, 2]);

      expect(line.isContainedBy(targetLine)).toBeFalsy();
    });

    it("Returns false if this line and the target share a startpoint but don't overlap.", () => {
      const line = Line.fromArray([0, 0, 1, 1]);
      const targetLine = Line.fromArray([0, 0, 1, 2]);

      expect(line.isContainedBy(targetLine)).toBeFalsy();
    });
  });

  describe("isDuplicate", () => {
    it.each([
      { currentline: [0, 0, 1, 1], targetline: [1, 1, 1, 1], expected: false },
      { currentline: [0, 0, 1, 1], targetline: [0, 0, 0, 1], expected: false },
      { currentline: [0, 0, 1, 1], targetline: [0, 0, 1, 1], expected: true },
      { currentline: [0, 0, 1, 1], targetline: [1, 1, 0, 0], expected: true },
    ])(
      "Returns $expected if $currentline checks $targetline as method input.",
      ({ currentline, targetline, expected }) => {
        let line = Line.fromArray(currentline);
        let target = Line.fromArray(targetline);

        expect(line.isDuplicate(target)).toBe(expected);
      }
    );
  });

  describe("toArray", () => {
    it("Returns a new Line from an array in the form [x1, y1, x2, y2]\.", () => {
      const start = Vector.fromArray([0, 1]);
      const end = Vector.fromArray([2, 3]);
      const line = new Line(start, end);

      expect(line.toArray()).toEqual([0, 1, 2, 3]);
    });
  });

  describe("toSVGElement", () => {
    it("Returns an SVG element of type line.", () => {
      const line = Line.fromArray([0, 0, 1, 1]);
      const result = line.toSVGElement();

      expect(result instanceof SVGElement).toBeTruthy();
    });
  });
});
