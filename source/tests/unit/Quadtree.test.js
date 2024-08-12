import { Quadtree } from "../../Quadtree";
import { Rectangle } from "../../Rectangle";
import { Vector } from "../../Vector";
import { Sketch} from "../../Sketch";


describe("", () => {


    let quadtree, boundary, range, points;
    beforeEach(() => {
        boundary = new Rectangle(0.5, 0.5, 0.5, 0.5);
        range = new Rectangle(0.1, 0.1, 0.1, 0.1);
        quadtree = new Quadtree(boundary, 1);
        points = [];

        for (let i = 0; i < 10; i++) {
            points.push(new Vector(Math.random(), Math.random()))
        }
    });

    test("can insert points", () => {
        for (let point of points) {
            quadtree.insert(point);
        }

        expect(quadtree.divided).toBe(true);

        const results = quadtree.query(boundary);

        expect(results.length).toBe(points.length);

    })


    test("returns an empty array if given query range is out of bounds", () => {
        const outOfBoundsRect = new Rectangle(10, 10, 1, 1);
        const result = quadtree.query(outOfBoundsRect);
        expect(result).toEqual([]);
    
    })

    test("can add itself to a sketch", () => {

        const sketch = new Sketch();

        quadtree.show(sketch);

        expect(sketch.lines.length).toBeGreaterThan(0);

    })



})