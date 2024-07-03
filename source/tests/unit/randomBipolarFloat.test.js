import { Mulberry32, Random } from "../../Random"

describe("The randomBipolarFloat() function", () => {

    test("It returns a number between -1 and 1", () => {
        let prng = new Mulberry32();

        let randomValue = prng.randomBipolarFloat();

        expect(randomValue).toBeGreaterThanOrEqual(-1);
        expect(randomValue).toBeLessThan(1);
    })

})