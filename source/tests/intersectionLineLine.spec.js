import { intersectionLineLine } from "../intersectionLineLine";
import { Line } from "../Line";
import { Vector } from "../Vector";

describe("intersectionLineLine", () => {

    it("returns false if two parallel lines do not intersect.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(5, 0);
        const c = new Vector(0, 1);
        const d = new Vector(5, 1);
        expect(intersectionLineLine(new Line(a, b), new Line(c, d))).toBeFalsy();
    });

    it("returns false if two non-parallel lines do not intersect.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(5, 0);
        const c = new Vector(0, 1);
        const d = new Vector(5, 5);
        expect(intersectionLineLine(new Line(a, b), new Line(c, d))).toBeFalsy();
    })

    it("returns true if two lines do intersect.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(5, 0);
        const c = new Vector(2, 2);
        const d = new Vector(2, -2);
        expect(intersectionLineLine(new Line(a, b), new Line(c, d))).toBeTruthy();
    })
})