import { intersectionLineLine } from "../intersectionLineLine";
import { Line } from "../Line";

describe("intersectionLineLine", () => {

    it("returns false if two parallel lines do not intersect.", () => {
        const line1 = Line.fromArray([0, 0, 5, 0]);
        const line2 = Line.fromArray([0, 1, 5, 1]);
        expect(intersectionLineLine(line1, line2)).toBeFalsy();
    });

    it("returns false if two non-parallel lines do not intersect.", () => {
        const line1 = Line.fromArray([0, 0, 5, 0]);
        const line2 = Line.fromArray([0, 1, 5, 5]);
        expect(intersectionLineLine(line1, line2)).toBeFalsy();
    })

    it("returns true if two lines do intersect.", () => {
        const line1 = Line.fromArray([0, 0, 5, 0]);
        const line2 = Line.fromArray([2, 2, 2, -2]);
        expect(intersectionLineLine(line1, line2)).toBeTruthy();
    })
})