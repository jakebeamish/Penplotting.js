import { PRNG } from "../Random";
import { Mulberry32 } from "../Random";
import { XORShift32 } from "../Random";
import { LCG } from "../Random";
import { Vector } from "../Vector";

describe("PRNG", () => {
	describe("constructor", () => {
		it("can be created using a variety of algorithms", () => {
			const random = new PRNG({
				algorithm: LCG
			});

			expect(random.algorithm instanceof LCG).toBeTruthy();
		});
	});

	describe("next", () => {
		it("Generates the same sequence of numbers for the same seed.", () => {
			const seed = 12345;
			const prng1 = new PRNG({ seed });
			const prng2 = new PRNG({ seed });

			for (let i = 0; i < 5; i++) {
				expect(prng1.randomFloat()).toBeCloseTo(prng2.randomFloat());
			}
		});

		it("Generates different sequences for different seeds.", () => {
			const prng1 = new PRNG({ seed: 12345 });
			const prng2 = new PRNG({ seed: 54321 });

			const sequence1 = [];
			const sequence2 = [];

			for (let i = 0; i < 5; i++) {
				sequence1.push(prng1.randomFloat());
				sequence2.push(prng2.randomFloat());
			}

			expect(sequence1).not.toEqual(sequence2);
		});
	});

	describe("randomInteger", () => {
		const random = new PRNG({
			seed: 12345,
			algorithm: LCG,
		});
		let x = random.randomInteger(0, 10);
		it("Always returns an integer.", () => {
			expect(typeof x).toBe("number");
			expect(x).toBe(parseInt(x));
		});

		it("Returns integers between min and max.", () => {
			expect(x).toBeGreaterThanOrEqual(0);
			expect(x).toBeLessThan(10);
		});
	});

	describe("randomFloat", () => {
		it("Returns values between 0 and 1.", () => {
			let prng = new PRNG({
				seed: 432101,
				algorithm: XORShift32,
			});

			for (let i = 0; i < 100; i++) {
				let value = prng.randomFloat();
				expect(value).toBeGreaterThanOrEqual(0);
				expect(value).toBeLessThan(1);
			}
		});
	});

	describe("randomUnitVector", () => {
		it("Returns a Vector of length 1.", () => {
			let prng = new PRNG({
				algorithm: Mulberry32,
			});
			let vector = prng.randomUnitVector();
			expect(vector instanceof Vector).toBeTruthy();
			expect(vector.getMagnitude()).toBeCloseTo(1);
		});
	});

	describe("randomChance", () => {
		it("Returns true if the chance parameter is greater than a random float between 0 and 1.", () => {
			let prng = new PRNG({
				seed: 1000,
				algorithm: LCG,
			});
			let actualValue = prng.randomChance(1);

			expect(actualValue).toBeTruthy();
		});

		it("Returns a boolean.", () => {
			let prng = new PRNG();

			expect(typeof prng.randomChance(0.5)).toBe("boolean");
		});

		it("Returns true if default value (0.5) is greater than a random float between 0 and 1.", () => {
			let prng1 = new PRNG(1);
			let prng2 = new PRNG(1);

			expect(prng1.randomChance()).toBe(prng2.randomChance(0.5));
		});
	});

	describe("randomElement", () => {
		it("Returns an element from the array it is passed.", () => {
			const prng = new PRNG();
			const array = ["beer", "wine", "juice"];
			const element = prng.randomElement(array);

			expect(array).toContain(element);
		});
	});

	describe("randomBipolarFloat", () => {
		it("Returns a number between -1 and 1.", () => {
			let prng = new PRNG();
			let randomValue = prng.randomBipolarFloat();

			expect(randomValue).toBeGreaterThanOrEqual(-1);
			expect(randomValue).toBeLessThan(1);
		});
	});

	describe("randomWeighted", () => {
		let prng, choices;
		beforeEach(() => {
			prng = new PRNG();
			choices = [
				{
					option: "red",
					weight: 0.1,
				},
				{
					option: "green",
					weight: 0.5,
				},
				{
					option: function () {
						return "blue";
					},
					weight: 0.4,
				},
			];
		});

		it("Returns an option from the choices it is passed.", () => {
			for (let i = 0; i < 10; i++) {
				const result = prng.randomWeighted(choices);
				expect(result).toMatch(/red|green|blue/);
			}
		});
	});
});
