import { Mulberry32 } from "../../Random";

describe("The randomWeighted function", () => {

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
                option: function() { return "blue" },
                weight: 0.4
            }
        ]
    })

    test("always returns an option from its choices parameter", () => {

        for (let i = 0; i < 10; i++) {
            const result = prng.randomWeighted(choices);
            expect(result).toMatch(/red|green|blue/)
        }
    })



})