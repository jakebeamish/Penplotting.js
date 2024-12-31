import { Vector } from "./Vector.js";
/**
 * Class representing a matrix.
 */
export class Matrix {
  /**
   * @param {number} rows - Rows (must be positive integer).
   * @param {number} cols - Columns (must be positive integer).
   */
  constructor(rows, cols) {
    if (
      rows < 1 ||
      cols < 1 ||
      !Number.isInteger(rows) ||
      !Number.isInteger(cols)
    ) {
      throw new Error("Rows and columns must be positive integers.");
    }

    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for (let i = 0; i < rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  toVector() {
		const result = this.matrix.flat();
    return Vector.fromArray(result.slice(0, 3));
  }

  static hasEqualDimensions(a, b) {
    return a.rows === b.rows && a.cols === b.cols;
  }

  static add(a, b) {
    if (!(a instanceof Matrix) || !(b instanceof Matrix)) {
      throw new TypeError("Inputs must be of type Matrix.");
    }

    if (!Matrix.hasEqualDimensions(a, b)) {
      throw new TypeError("Matrices must have the sime dimensions.");
    }

    const result = new Matrix(a.rows, a.cols);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];
      }
    }

    return result;
  }

  // TODO Static add and scale functions. Use the static to implement
  // instance methods. Test against bad inputs (matching rows and columns)
  // This could also be a static method that

  /**
   * Element-wise addition
   * @param {(Matrix|number)} n - n
   */
  add(n) {
    if (n instanceof Matrix) {
      if (!Matrix.hasEqualDimensions(this, n)) {
        throw new TypeError("Matrices must be of equal size.");
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    } else if (typeof n === "number") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += n;
        }
      }
    } else {
      throw new TypeError("Expected input of type Matrix or Number.");
    }
  }

  /**
   * Scalar multiplication
   */
  scale(n) {
    if (n instanceof Matrix) {
      if (!Matrix.hasEqualDimensions(this, n)) {
        throw new TypeError("Matrices must be of equal size.");
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n.matrix[i][j];
        }
      }
    } else if (n instanceof Number) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n;
        }
      }
    } else {
      throw new TypeError("Expected input of type Matrix or Number.");
    }
  }
}
