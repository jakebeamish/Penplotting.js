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
      m.matrix = [[1, 2]];
      const vector = m.toVector();
      expect(vector).toEqual(Vector.fromArray([1, 2]));
    });
  });

  describe("hasEqualDimensions", () => {
    it("Compares rows and columns of two matrices.", () => {
      expect(
        Matrix.hasEqualDimensions(new Matrix(3, 2), new Matrix(3, 2))
      ).toBeTruthy();
    });
  });

  describe("add (instance)", () => {
    it("Throws an error if input is not either a number or a matrix of equal dimensions", () => {
      const m = new Matrix(2, 2);
      const v = new Vector(3, 4);
      const s = "Input";

      expect(() => m.add(v)).toThrow();
      expect(() => m.add(s)).toThrow();
    });

    it("Throws an error if input matrices are not of equal dimension.", () => {
      const m = new Matrix(1, 2);
      const n = new Matrix(3, 4);
      const o = new Matrix(2, 1);

      expect(() => m.add(n)).toThrow();
      expect(() => m.add(o)).toThrow();
    });

    it("Adds number input to each element in the matrix.", () => {
      const m = new Matrix(2, 2);
      m.add(1);
      expect(m.matrix).toEqual([
        [1, 1],
        [1, 1],
      ]);
    });

    it("Adds a matrix to this one element-wise.", () => {
      const m = new Matrix(2, 2);
      m.matrix = [
        [1, 2],
        [3, 4],
      ];
      const n = new Matrix(2, 2);
      n.matrix = [
        [1, 2],
        [3, 4],
      ];
      m.add(n);
      expect(m.matrix).toEqual([
        [2, 4],
        [6, 8],
      ]);
    });
  });

  describe("static add", () => {
    it("Creates a new matrix which is the result of matrix addition.", () => {
      const m = new Matrix(2, 2);
      const n = new Matrix(2, 2);
      m.matrix = [
        [1, 2],
        [3, 4],
      ];

      n.matrix = [
        [4, 3],
        [2, 1],
      ];

      const result = Matrix.add(m, n);

      expect(result.matrix).toEqual([
        [5, 5],
        [5, 5],
      ]);
    });

    it("Throws an error if inputs are not matrices.", () => {
      expect(() => Matrix.add("m", [3, 2])).toThrow();
      expect(() =>
        Matrix.add(
          [
            [1, 2],
            [3, 4],
          ],
          new Vector(1, 1)
        )
      ).toThrow();
    });

    it("Throws an error if input matrices do not have equal dimensions.", () => {
      const m = new Matrix(1, 2);
      const n = new Matrix(3, 4);
      expect(() => {
        Matrix.add(m, n);
      }).toThrow();
    });
  });

  describe("fromVector", () => {
    it("Returns a valid matrix from Vector components.", () => {
      const v = new Vector(1, 2, 3);
      const expected = [[1], [2], [3]];

      expect(Matrix.fromVector(v).matrix).toEqual(expected);
    });
  });

  describe("multiply", () => {
    it("Throws an error if inputs are not matrices.", () => {
      expect(() => {
        Matrix.multiply(1, 5);
      }).toThrow();
      expect(() => {
        Matrix.multiply("a", 5);
      }).toThrow();
    });

    it("Throws an error if columns of the first input don't match rows of the second.", () => {
			const m = new Matrix(1, 1);
			const n = new Matrix(3, 1);
			expect(() => {
				Matrix.multiply(m, n)
			}).toThrow();
		});

		it("Returns a new matrix if given two matrices of correct size.", () =>  {
			const m = new Matrix(2, 3);
			const n = new Matrix(3, 1);
			m.matrix = [
				[1, 0, 0],
				[0, 1, 0]
			];
			n.matrix = [
				[5],
				[4],
				[2]
			];
			expect(Matrix.multiply(m, n).matrix).toEqual([
				[5],
				[4],
				[0]
			]);
		})
  });

  describe("scale", () => {
    it("Throws an error if input is not a number or a Matrix.", () => {
      expect(() => {
        const m = new Matrix(2, 2);
        m.scale("A");
      }).toThrow();
    });

    it("Throws an error if input is a Matrix of a different size.", () => {
      expect(() => {
        const m = new Matrix(2, 2);
        const n = new Matrix(3, 4);
        m.scale(n);
      }).toThrow();
    });

    it("Scales each element in the matrix individually when input is a number.", () => {
      const m = new Matrix(2, 2);
      m.matrix = [
        [1, 1],
        [1, 1],
      ];
      m.scale(9);
      expect(m.matrix).toEqual([
        [9, 9],
        [9, 9],
      ]);
    });

    it("Scales the matrix element-wise when input is another matrix.", () => {
      const m = new Matrix(2, 2);
      const n = new Matrix(2, 2);
      m.matrix = [
        [1, 2],
        [3, 4],
      ];
      n.matrix = [
        [5, 4],
        [3, 2],
      ];
      m.scale(n);
      expect(m.matrix).toEqual([
        [5, 8],
        [9, 8],
      ]);
    });
  });
});
