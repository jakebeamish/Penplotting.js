import { sinFract } from "../../utils";
import { fract } from "../../utils";

describe("sinFract()", () => {
	test("should correctly compute the sinFract value for given inputs", () => {
		// Example inputs and expected outputs
		const testCases = [
			{
				x: 1,
				y: 2,
				a: 0.5,
				b: 0.3,
				m: 10,
				expected: fract(Math.sin(1 * 0.5 + 2 * 0.3) * 10),
			},
			{
				x: 0,
				y: 0,
				a: 1,
				b: 1,
				m: 1,
				expected: fract(Math.sin(0 * 1 + 0 * 1) * 1),
			},
			{
				x: -1,
				y: -2,
				a: 0.2,
				b: 0.4,
				m: 5,
				expected: fract(Math.sin(-1 * 0.2 + -2 * 0.4) * 5),
			},
			// Add more test cases as needed
		];

		testCases.forEach(({ x, y, a, b, m, expected }) => {
			expect(sinFract(x, y, a, b, m)).toBeCloseTo(expected);
		});
	});
});
