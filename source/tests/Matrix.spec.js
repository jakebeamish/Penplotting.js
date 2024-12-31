import { Matrix } from "../Matrix.js";
import { Vector } from "../Vector.js";
describe("Matrix", () => {
  describe("constructor", () => {
    it("Returns a Matrix object if rows and cols are positive integers.", () => {
      const m = new Matrix(1, 1);
      const n = new Matrix(593, 230);
      const o = new Matrix(800, 1100);

      [m, n, o].forEach((element) =>
        expect(element instanceof Matrix).toBeTruthy()
      );
    });
		it("Returns an error if rows and cols are not positive integers.", () => {
							expect(() => new Matrix(-1, 0)).toThrow();
		expect(() => new Matrix(0, 6)).toThrow();
		expect(() => new Matrix(5, -3)).toThrow();
		expect(() => new Matrix(3.5, 4)).toThrow();
		expect(() => new Matrix("2", "3")).toThrow();
		});
  });

	describe("toVector", () => {
		it("Returns a vector representation of the matrix.", () => {
			const m = new Matrix(1, 2);
			m.matrix = [
				[1, 2]
			];
			const vector = m.toVector();
			expect(vector).toEqual(
				Vector.fromArray([1, 2])
			);
		});
	});

	describe("fromVector", () => {

	});
});
