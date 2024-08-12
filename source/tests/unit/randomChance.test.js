import { Mulberry32 } from "../../Random";

describe("The randomChance method", () => {
    test("Returns True if the chance parameter it is given is greater than a random float between 0 and 1", () => {
        let prng = new Mulberry32();

        let actualValue = prng.randomChance(1);
        expect(actualValue).toBeTruthy();
    });

    test("Always returns a boolean", () => {
        let prng = new Mulberry32();
        expect(typeof prng.randomChance(0.5)).toBe("boolean")
    });

    test("If called without argument, the default behaviour is 50/50 True or False", () => {
        let prng1 = new Mulberry32(1);
        let prng2 = new Mulberry32(1);

        expect(prng1.randomChance()).toBe(prng2.randomChance(0.5));
    });
});