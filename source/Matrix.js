import { Vector } from "./Vector.js";
/**
 * Class representing a Matrix.
 */
export class Matrix {
  /**
   * Creates a new Matrix.
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

  /**
   * Creates a new {@link Vector} from a Matrix.
   * @returns {Vector}
   */
  toVector() {
    const result = this.matrix.flat();
    return Vector.fromArray(result.slice(0, 3));
  }

  /**
   * Returns a new Matrix from a given {@link Vector}.
   * @param {Vector} v - The input vector.
   * @returns {Matrix} A matrix with data rows corresponding to the vector components.
   */
  static fromVector(v) {
    const result = new Matrix(v.toArray().length, 1);
    result.matrix = [[v.x], [v.y], [v.z]];

    return result;
  }

  /**
   * Checks if two Matrixes have the same number of rows and columns.
   * @param {Matrix} a
   * @param {Matrix} b
   * @returns {boolean} True if Matrixes are of the same dimensionality, otherwise false.
   */
  static hasEqualDimensions(a, b) {
    return a.rows === b.rows && a.cols === b.cols;
  }

  /**
   * Adds two Matrixes and returns the result.
   * @param {Matrix} a
   * @param {Matrix} b
   * @returns {Matrix} A Matrix with data resulting from element-wise addition.
   */
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

  /**
   * Adds values to a Matrix. Input can either be a single number, or another
   * instance of Matrix if it has the same dimensionality.
   * @param {Matrix | number} n - The input to add to this matrix.
   * @returns {Matrix} The current Matrix instance for chaining.
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
    return this;
  }

  /**
   * Multiplies a Matrix by a scalar, either a single number or another Matrix.
   * @param {Matrix | number} n - The scalar (must be a number or a Matrix).
   * @returns {Matrix} This Matrix instance for chaining.
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
    } else if (typeof n === "number") {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n;
        }
      }
    } else {
      throw new TypeError("Expected input of type Matrix or Number.");
    }

    return this;
  }

  /**
   * Multiply two Matrixes and return the result.
   * @param {Matrix} a
   * @param {Matrix} b
   * @returns {Matrix} The result of matrix multiplication.
   */
  static multiply(a, b) {
    if (!(a instanceof Matrix) || !(b instanceof Matrix)) {
      throw new TypeError("Inputs must both be Matrixes.");
    }
    if (a.cols !== b.rows) {
      throw new TypeError("Columns of a must equal rows of b.");
    }

    const result = new Matrix(a.cols, b.cols);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.matrix[i][k] * b.matrix[k][j];
        }
        result.matrix[i][j] = sum;
      }
    }
    return result;
  }
}
