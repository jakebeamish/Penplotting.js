import { AABB } from "../AABB";
import { Vector } from "../Vector";
import { Line } from "../Line";

describe("The AABB class", () => {
  describe("constructor", () => {
    test("Returns a new AABB object created from corner coordinates.", () => {
      const rect = AABB.fromCorners(
        new Vector(0, 0),
        new Vector(1, 0),
        new Vector(1, 1),
        new Vector(0, 1),
      );

      expect(rect instanceof AABB).toBe(true);
    });
  });

  describe("contains", () => {
    test("Checks if a point lines inside itself.", () => {
      // A 100x100 AABB
      const rect = new AABB(50, 50, 50, 50);
      const insidePoint = new Vector(50, 50);
      const outsidePoint = new Vector(-1, -1);

      expect(rect.contains(insidePoint)).toBe(true);
      expect(rect.contains(outsidePoint)).toBe(false);
    });
  });

  describe("intersects", () => {
    test("Checks if it intersects another AABB.", () => {
      const aabb = new AABB(10, 10, 10, 10);
      const intersectingAABB = new AABB(5, 5, 10, 10);
      const nonIntersectingAABB = new AABB(100, 100, 2, 2);

      expect(aabb.intersects(intersectingAABB)).toBe(true);
      expect(aabb.intersects(nonIntersectingAABB)).toBe(false);
    });
  });

  describe("lines", () => {
    test("Returns an array of Lines from its edges", () => {
      const aabb = new AABB(0, 0, 1, 1);
      const lines = aabb.lines();

      expect(lines.length).toBe(4);
      expect(lines).toContainEqual(
        new Line(new Vector(-1, -1), new Vector(1, -1)),
      );
    });
		it("Applies style options if given.", () => {
			const aabb = new AABB(0, 0, 1, 1);
			const lines = aabb.lines({
				stroke: "red",
				strokeWidth: 2
			});

			expect(lines).toContainEqual(
				new Line(new Vector(-1, -1), new Vector(1, -1), {
					stroke: "red",
					strokeWidth: 2
				})
			)
		})
  });
});
