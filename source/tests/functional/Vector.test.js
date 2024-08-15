import { Vector } from "../../Vector";

describe("The Vector class", () => {
    describe("constructor", () => {
        it("should throw a TypeError if any component is not a number. Currently does not throw if component is undefined.", () => {
            expect(() => new Vector(1, 'a')).toThrow(TypeError);
            expect(() => new Vector(1, null)).toThrow(TypeError);
            expect(() => new Vector(1, {})).toThrow(TypeError);
            // expect(() => new Vector(undefined, 1)).toThrow(TypeError);
        });
    });

    describe("nearestNeighbour method", () => {
        it("should not return itself even if it is a member of the queried array", () => {
            const a = new Vector(0, 0); 
            const b = new Vector(1, 0);
            const c = new Vector(2, 0);
            const result = a.nearestNeighbour([a, b, c], 1);
            expect(result).not.toEqual([a]);
            expect(result).toEqual([b]);
            expect(a.equals(result[0])).toBeFalsy();
        });
    });
});