import { map } from "../../utils.js";

describe("map()", () => {
	test("If withinBounds = true, the output should be constrained by min2 and max2", () => {
		let val = 10;
		let min1 = 0;
		let max1 = 100;
		let min2 = 5;
		let max2 = 6;

		let output = map(val, min1, max1, min2, max2, true);

		expect(output).toBeLessThanOrEqual(max2);
		expect(output).toBeGreaterThanOrEqual(min2);
	});

	test("If withinBounds = false, the output should not be constrained by min2 and max2", () => {
		let val = 11;
		let min1 = 0;
		let max1 = 10;
		let min2 = 5;
		let max2 = 6;

		let output = map(val, min1, max1, min2, max2);

		expect(output).toBeGreaterThan(max2);
	});
});
