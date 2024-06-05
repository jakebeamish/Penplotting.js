import { wrap } from "../../utils";

describe('wrap()', () => {

    let x = wrap(-1, 0, 7);

    test("It returns numbers between mix and max", () => {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(7)
    })
})