import { Vector } from "../../Vector";

describe("Vector", () => {
	describe("getAngle", () => {
		it("should return 0 radians for a vector along the positive x-axis", () => {
			const vector = new Vector(1, 0);
			expect(vector.getAngle()).toBe(0);
		});

		it("should return π/2 radians for a vector along the positive y-axis", () => {
			const vector = new Vector(0, 1);
			expect(vector.getAngle()).toBe(Math.PI / 2);
		});

		it("should return π radians for a vector along the negative x-axis", () => {
			const vector = new Vector(-1, 0);
			expect(vector.getAngle()).toBe(Math.PI);
		});

		it("should return -π/2 radians for a vector along the negative y-axis", () => {
			const vector = new Vector(0, -1);
			expect(vector.getAngle()).toBe(-Math.PI / 2);
		});

		it("should return the correct angle for a vector in the first quadrant", () => {
			const vector = new Vector(1, 1);
			expect(vector.getAngle()).toBeCloseTo(Math.PI / 4);
		});

		it("should return the correct angle for a vector in the second quadrant", () => {
			const vector = new Vector(-1, 1);
			expect(vector.getAngle()).toBeCloseTo((3 * Math.PI) / 4);
		});

		it("should return the correct angle for a vector in the third quadrant", () => {
			const vector = new Vector(-1, -1);
			expect(vector.getAngle()).toBeCloseTo((-3 * Math.PI) / 4);
		});

		it("should return the correct angle for a vector in the fourth quadrant", () => {
			const vector = new Vector(1, -1);
			expect(vector.getAngle()).toBeCloseTo(-Math.PI / 4);
		});
	});
});
