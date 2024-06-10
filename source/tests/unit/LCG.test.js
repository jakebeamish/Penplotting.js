import { LCG } from "../../utils";

describe("LCG", () => {
	test("It always returns values between 0 and 1", () => {
		let lcg = new LCG();

		for (let i = 0; i < 100; i++) {
			let value = lcg.random();
			expect(value).toBeGreaterThanOrEqual(0);
			expect(value).toBeLessThan(1);
		}
	});

	test("should generate the same sequence of numbers for the same seed", () => {
		const seed = 12345;
		const lcg1 = new LCG(seed);
		const lcg2 = new LCG(seed);

		for (let i = 0; i < 5; i++) {
			expect(lcg1.random()).toBeCloseTo(lcg2.random());
		}
	});

	test("should generate different sequences for different seeds", () => {
		const lcg1 = new LCG(12345);
		const lcg2 = new LCG(54321);

		const sequence1 = [];
		const sequence2 = [];

		for (let i = 0; i < 5; i++) {
			sequence1.push(lcg1.random());
			sequence2.push(lcg2.random());
		}

		expect(sequence1).not.toEqual(sequence2);
	});
});
