import { Rectangle } from "../../Rectangle";
import { Vector } from "../../Vector";
import { Line } from "../../Line";

describe("The Rectangle class", () => {
    test("can be created from corner coordinates", () => {
        const rect = Rectangle.fromCorners(
            new Vector(0, 0),
            new Vector(1, 0),
            new Vector(1, 1),
            new Vector(0, 1)
        );

        expect(rect instanceof Rectangle).toBe(true);
    });


    test("can check if a point lines inside itself", () => {

        // A 100x100 rectangle
        const rect = new Rectangle(50, 50, 50, 50);
        const insidePoint = new Vector(50, 50);
        const outsidePoint = new Vector(-1, -1);

        expect(rect.contains(insidePoint)).toBe(true);
        expect(rect.contains(outsidePoint)).toBe(false);
    });

    test("can check if it intersects another Rectangle", () => {

        const rectangle = new Rectangle(10, 10, 10, 10);
        const intersectingRectangle = new Rectangle(5, 5, 10, 10);
        const nonIntersectingRectangle = new Rectangle(100, 100, 2, 2);

        expect(rectangle.intersects(intersectingRectangle)).toBe(true);
        expect(rectangle.intersects(nonIntersectingRectangle)).toBe(false);
    });

    test("can return an array of Lines from its edges", () => {

        const rectangle = new Rectangle(0, 0, 1, 1);
        const lines = rectangle.lines();

        expect(lines.length).toBe(4);
        expect(lines).toContainEqual(new Line(
            new Vector(-1, -1),
            new Vector(1, -1)
        ));
    })
})