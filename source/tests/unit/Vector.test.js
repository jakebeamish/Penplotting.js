import { Vector } from "../../Vector"
describe('Vector', () => {
describe('Vector class', () => {
    test('It exists', () => {
        let v = new Vector(0, 0);

        // It is an object
        expect(typeof v).toBe("object");

        // It is a Vector
        expect(v instanceof Vector).toBe(true);
    })
})

describe('Vector.lerp()', () => {
    test('It returns a new Vector', () => {
        const a = new Vector(0, 0);
        const b = new Vector(1, 1);
        const amount = 0.5;
        const output = Vector.lerp(a, b, amount);
        expect(output instanceof Vector).toBeTruthy();
    });

    test("Vector.lerp( [0,0], [1,1], 0.5 ) returns [0.5, 0.5]", () => {
        const a = new Vector(0, 0);
        const b = new Vector(1, 1);
        const amount = 0.5;

        expect(Vector.lerp(a, b, amount)).toEqual(new Vector(0.5, 0.5))
    })
})

describe("Dot product", () => {
    test("The dot product of (2,2) and (1,4) should be 10", () => {
        expect(Vector.dot(
            new Vector(2, 2),
            new Vector(1, 4)
        )).toBe(10)
    })
})

describe("Cross product", () => {
    test("The cross product of (2,2) and (1,4) should be 6", () => {
        expect(Vector.cross(
            new Vector(2, 2),
            new Vector(1, 4)
        )).toBe(6)
    })
})

describe("Vector.normalize()", () => {
    test("Normalized vector should have magnitude of 1", () => {
        const v = new Vector(10, 53);
        v.normalize();
        expect(v.magnitude()).toBe(1)
    });

    test("Error should be thrown if a Vector of magnitude zero is normalized", () => {
        const v = new Vector(0, 0);
        expect(() => {
            v.normalize();
        }).toThrowError("Cannot normalize a zero vector");
    })
})

describe("Vector.clone()", () => {
    test("It returns a new Vector with the same values", () => {
        const a = new Vector(3, 5);
        const b = a.clone();

        expect(b).toEqual(a);
        expect(b).not.toBe(a);
    })
})

})