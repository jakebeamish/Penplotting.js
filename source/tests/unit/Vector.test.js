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