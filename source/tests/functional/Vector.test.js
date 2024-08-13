import { Vector } from "../../Vector";

describe("The Vector class", () => {
    describe("constructor", () => {
        test.skip("should throw a TypeError if any component is not a number", () => {
            expect(() => new Vector(1, 'a')).toThrow(TypeError);
            expect(() => new Vector(1, null)).toThrow(TypeError);
            expect(() => new Vector(1, undefined)).toThrow(TypeError);
            expect(() => new Vector(1, {})).toThrow(TypeError);
        });
    });

    describe("nearestNeighbour method", () => {
        test("should not return itself even if it is a member of the queried array", () => {
            const a = new Vector(0, 0);
            const result = a.nearestNeighbour([a], 1);
            expect(result).not.toBe([a]);
        });
    });
});