import { Vector } from "../../Vector"

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

        expect(Vector.lerp(a, b, amount)).toMatchObject(new Vector(0.5, 0.5))
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
