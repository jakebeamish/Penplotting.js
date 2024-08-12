import { PRNG } from "../../Random";

describe("PRNG should throw errors if it's methods are called directly", () => {
    const prng = new PRNG();

    function maxValue() { prng.maxValue(); }

    function next() { prng.next(); }

    test("maxValue() throws an error", () => {
        expect(maxValue).toThrow(new Error("Method maxValue() must be implemented."))
    })

    test("next() throws an error", () => {
        expect(next).toThrow(new Error("Method next() must be implemented."))
    })
})