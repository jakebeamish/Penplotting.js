import { Quadtree } from "../Quadtree";
import { Rectangle } from "../Rectangle";
import { Vector } from "../Vector";
import { Sketch } from "../Sketch";

describe("Quadtree", () => {
    let quadtree, boundary, range, points;

    beforeEach(() => {
        boundary = new Rectangle(0.5, 0.5, 0.5, 0.5);
        range = new Rectangle(0.1, 0.1, 0.1, 0.1);
        quadtree = new Quadtree(boundary, 1);
        points = [];

        for (let i = 0; i < 100; i++) {
            const point = new Vector(Math.random(), Math.random());
            points.push(point);
            quadtree.insert(point);
        };
    });

    describe("insert", () => {
        it("should add points.", () => {
            const results = quadtree.query(boundary);
            expect(quadtree.divided).toBe(true);
            expect(results.length).toBe(points.length);
        });
    });


    describe("query", () => {
        it("should return an empty array if given query range is out of bounds.", () => {
            const outOfBoundsRect = new Rectangle(10, 10, 1, 1);
            const result = quadtree.query(outOfBoundsRect);
            expect(result).toEqual([]);
        });

        it("should return an array containing only points within the given range.", () => {
            const results = quadtree.query(range);
            for (let result of results) {
                expect(range.contains(result)).toBeTruthy();
            }
        });
    });

    describe("show", () => {
        it("should add lines to a Sketch.", () => {
            const sketch = new Sketch();
            quadtree.show(sketch);
            expect(sketch.lines.length).toBeGreaterThan(points.length * 4);
        });
    });
});