import { Mulberry32 } from "../../Random";

describe("The randomChance method", () =>{
    test("Returns True if the chance parameter it is given is greater than a random float between 0 and 1", () => {
        let prng = new Mulberry32();

        let actualValue = prng.randomChance(1);
        expect(actualValue).toBeTruthy();
    });

    test("Always returns a boolean", () => {
        let prng = new Mulberry32();
        expect(typeof prng.randomChance(0.5)).toBe("boolean")
    })
})