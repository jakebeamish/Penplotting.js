import { lerp } from "../../utils";

describe("Linear interpolation", () => {
	test("It should return a number", () => {
		let x = lerp(0, 1, 0.5);
		expect(typeof x).toBe("number");
	});

	test("It should return the midpoint between values when the amount is 0.5", () => {
		const a = 12;
		const b = 24;
		const amount = 0.5;

		expect(lerp(a, b, amount)).toBe(a + (b - a) / 2);
	});
});
