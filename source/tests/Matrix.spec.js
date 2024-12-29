import { Matrix } from "../Matrix.js";

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


		})
  });
});
