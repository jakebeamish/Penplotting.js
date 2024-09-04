import { PRNG } from "../Random";
import { Mulberry32 } from "../Random";
import { XORShift32 } from "../Random";

describe("PRNG", () => {
    describe("Throws an error if it's methods are called directly.", () => {
        const prng = new PRNG();
        function maxValue() { prng.maxValue(); }
        function next() { prng.next(); }

        it("Throws an error if maxValue() is called directly.", () => {
            expect(maxValue).toThrow(new Error("Method maxValue() must be implemented."));
        })

        it("Throws an error if next() is called directly.", () => {
            expect(next).toThrow(new Error("Method next() must be implemented."));
        });
    });

    describe("randomChance", () => {
        it("Returns true if the chance parameter is greater than a random float between 0 and 1.", () => {
            let prng = new Mulberry32();
            let actualValue = prng.randomChance(1);

            expect(actualValue).toBeTruthy();
        });

        it("Always returns a boolean.", () => {
            let prng = new Mulberry32();

            expect(typeof prng.randomChance(0.5)).toBe("boolean")
        });

        it("Returns true if default value (0.5) is greater than a random float between 0 and 1.", () => {
            let prng1 = new Mulberry32(1);
            let prng2 = new Mulberry32(1);

            expect(prng1.randomChance()).toBe(prng2.randomChance(0.5));
        });
    });

    describe("randomElement", () => {

        it("Returns an element from the array it is passed.", () => {
            const prng = new XORShift32();
            const array = ["beer", "wine", "juice"];
            const element = prng.randomElement(array);

            expect(array).toContain(element);
        });
    });

    describe("randomBipolarFloat()", () => {

        it("Returns a number between -1 and 1.", () => {
            let prng = new Mulberry32();
            let randomValue = prng.randomBipolarFloat();

            expect(randomValue).toBeGreaterThanOrEqual(-1);
            expect(randomValue).toBeLessThan(1);
        });
    });


    describe("randomWeighted", () => {
        let prng, choices;
        beforeEach(() => {
            prng = new Mulberry32();
            choices = [
                {
                    option: "red",
                    weight: 0.1
                },
                {
                    option: "green",
                    weight: 0.5
                },
                {
                    option: function () { return "blue" },
                    weight: 0.4
                }
            ]
        });

        it("Always returns an option from the choices it is passed.", () => {

            for (let i = 0; i < 10; i++) {
                const result = prng.randomWeighted(choices);
                expect(result).toMatch(/red|green|blue/)
            }
        });
    });
});