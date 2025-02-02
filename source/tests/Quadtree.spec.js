import { Quadtree } from "../Quadtree";
import { AABB } from "../AABB";
import { Vector } from "../Vector";
import { Plot } from "../Plot";

describe("Quadtree", () => {
  let quadtree, boundary, range, points;

  beforeEach(() => {
    boundary = new AABB(0.5, 0.5, 0.5, 0.5);
    range = new AABB(0.1, 0.1, 0.1, 0.1);
    quadtree = new Quadtree(boundary, 1);
    points = [];

    for (let i = 0; i < 100; i++) {
      const point = new Vector(Math.random(), Math.random());
      points.push(point);
      quadtree.insert(point);
    }
  });

  describe("insert", () => {
    it("Adds points into the quadtree structure correctly.", () => {
      const results = quadtree.query(boundary);
      expect(quadtree.divided).toBe(true);
      expect(results.length).toBe(points.length);
    });
  });

  describe("query", () => {
    it("Returns an empty array if given query range is out of bounds.", () => {
      const outOfBoundsRect = new AABB(10, 10, 1, 1);
      const result = quadtree.query(outOfBoundsRect);
      expect(result).toEqual([]);
    });

    it("Returns an array containing only points within the given range.", () => {
      const results = quadtree.query(range);
      for (let result of results) {
        expect(range.contains(result)).toBeTruthy();
      }
    });
  });

  describe("show", () => {
    it("Adds lines to a Plot.", () => {
      const plot = new Plot();
      quadtree.show(plot);
      expect(plot.lines.length).toBeGreaterThan(points.length * 4);
    });
  });
});
