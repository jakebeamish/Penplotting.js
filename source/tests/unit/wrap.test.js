import { wrap } from "../../utils";

describe("wrap()", () => {
	test("It returns numbers between min and max", () => {
		const min = 0;
		const max = 7;
		let x = wrap(-1, min, max);

		expect(x).toBeGreaterThanOrEqual(min);
		expect(x).toBeLessThan(max);
	});
});
