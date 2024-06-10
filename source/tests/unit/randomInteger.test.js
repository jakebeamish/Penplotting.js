import { randomInteger } from "../../utils";

describe("The random integer function", () => {
	let x = randomInteger(0, 10);
	test("It returns integers", () => {
		expect(typeof x).toBe("number");
		expect(x).toBe(parseInt(x));
	});

	test("It returns integers between min and max", () => {
		expect(x).toBeGreaterThanOrEqual(0);
		expect(x).toBeLessThan(10);
	});
});
