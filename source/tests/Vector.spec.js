import { Vector } from "../Vector";

describe("Vector", () => {
    describe("constructor", () => {
        it("returns a new Vector object if creation is successful.", () => {
            const v = new Vector(1, 1);
            // It is an object
            expect(typeof v).toBe("object");

            // It is a Vector
            expect(v instanceof Vector).toBe(true);
        });

        test("can be called without coordinates (defaults to {x: 0, y: 0}).", () => {
            const vector = new Vector();
            expect(vector).toEqual({ x: 0, y: 0 });
        });

        it("throws a TypeError if any component is not a number. Currently does not throw if component is undefined.", () => {
            expect(() => new Vector(1, 'a')).toThrow(TypeError);
            expect(() => new Vector(1, null)).toThrow(TypeError);
            expect(() => new Vector(1, {})).toThrow(TypeError);
            // expect(() => new Vector(undefined, 1)).toThrow(TypeError);
        });
    });

    describe("getAngle", () => {
        it("return 0 radians for a vector along the positive x-axis.", () => {
            const vector = new Vector(1, 0);
            expect(vector.getAngle()).toBe(0);
        });

        it("returns π/2 radians for a vector along the positive y-axis.", () => {
            const vector = new Vector(0, 1);
            expect(vector.getAngle()).toBe(Math.PI / 2);
        });

        it("returns π radians for a vector along the negative x-axis.", () => {
            const vector = new Vector(-1, 0);
            expect(vector.getAngle()).toBe(Math.PI);
        });

        it("returns -π/2 radians for a vector along the negative y-axis.", () => {
            const vector = new Vector(0, -1);
            expect(vector.getAngle()).toBe(-Math.PI / 2);
        });

        it("returns the correct angle for a vector in the first quadrant.", () => {
            const vector = new Vector(1, 1);
            expect(vector.getAngle()).toBeCloseTo(Math.PI / 4);
        });

        it("returns the correct angle for a vector in the second quadrant.", () => {
            const vector = new Vector(-1, 1);
            expect(vector.getAngle()).toBeCloseTo((3 * Math.PI) / 4);
        });

        it("returns the correct angle for a vector in the third quadrant.", () => {
            const vector = new Vector(-1, -1);
            expect(vector.getAngle()).toBeCloseTo((-3 * Math.PI) / 4);
        });

        it("returns the correct angle for a vector in the fourth quadrant.", () => {
            const vector = new Vector(1, -1);
            expect(vector.getAngle()).toBeCloseTo(-Math.PI / 4);
        });
    });

    describe("normalize", () => {
        it("rescales the magnitude of a vector to 1.", () => {
            const vector = new Vector(5, 5);
            vector.normalize();
            expect(vector.getMagnitude()).toBeCloseTo(1);
        });

        it("throws an Error if the vector magnitude is zero.", () => {
            const v = new Vector(0, 0);
            expect(() => {
                v.normalize();
            }).toThrowError("Cannot normalize a zero vector");
        });
    })

    describe("nearestNeighbour", () => {
        it("should not return itself even if it is a member of the queried array.", () => {
            const a = new Vector(0, 0);
            const b = new Vector(1, 0);
            const c = new Vector(2, 0);
            const result = a.nearestNeighbour([a, b, c], 3);
            expect(result).not.toEqual([a]);
            expect(result).toEqual([b, c, null]);
            expect(a.equals(result[0])).toBeFalsy();
        });
    });
});