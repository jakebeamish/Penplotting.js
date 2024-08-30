import { Line } from "../Line";
import { Vector } from "../Vector";

describe("Line", () => {



    describe("fromArray", () => {
        it("should return a new Line if creation is successful.", () => {

            const line = Line.fromArray([0, 0, 1, 1]);
            expect(line instanceof Line).toBe(true);
        });
    });

    describe("length", () => {

        it.each([
            { start: new Vector(0, 0), end: new Vector(10, 0), expected: 10 },
            { start: new Vector(0, 0), end: new Vector(0, -10), expected: 10 },
            { start: new Vector(0, 0), end: new Vector(10, 10), expected: 10 * Math.sqrt(2) },
            { start: new Vector(0, 0), end: new Vector(0, 0), expected: 0 },
        ])("should return a distance of $expected from [$start.x, $start.y] to [$end.x, $end.y].", ({ start, end, expected }) => {
            const line = new Line(start, end);
            expect(line.length()).toBe(expected);
        })
    });

    describe("isContainedBy", () => {
        it("should return false if this line is not overlapping the target line.", () => {
            const line = Line.fromArray([0, 0, 1, 1]);
            const targetLine = Line.fromArray([1, 1, 2, 2]);
            expect(line.isContainedBy(targetLine)).toBeFalsy();
        });

        it("should return false if this line is not overlapping the target line, but they share a startpoint.", () => {
            const line = Line.fromArray([0, 0, 1, 1]);
            const targetLine = Line.fromArray([0, 0, 1, 2]);
            expect(line.isContainedBy(targetLine)).toBeFalsy();
        });
    });

    describe("isDuplicate", () => {
        it.each([
            { line: [0, 0, 1, 1], target: [0, 0, 0, 1], expected: false },
            { line: [0, 0, 1, 1], target: [1, 1, 1, 1], expected: false },
            { line: [0, 0, 1, 1], target: [0, 0, 1, 1], expected: true },
            { line: [0, 0, 1, 1], target: [1, 1, 0, 0], expected: true },
        ])("should return $expected if $line is compared to $target.", ({ line, target, expected }) => {
            expect(Line.fromArray(line).isDuplicate(Line.fromArray(target))).toBe(expected);
        })
    })

    describe("toArray", () => {
        it("should return a new Line from an array in the form [x1, y1, x2, y2].", () => {
            const start = Vector.fromArray([0, 1]);
            const end = Vector.fromArray([2, 3]);
            const line = new Line(start, end);
            expect(line.toArray()).toEqual([0, 1, 2, 3])
        })
    })

    describe("toSVGElement", () => {
        it("should return an SVG element of type line.", () => {
            const line = Line.fromArray([0, 0, 1, 1]);
            const result = line.toSVGElement();

            expect(result instanceof SVGElement).toBeTruthy();
        });
    });
});
