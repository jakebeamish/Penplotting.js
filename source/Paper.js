/**
 * Represents a paper size with width and height.
 */
export class Paper {
  /** Creates a new Paper instance.
   * @param {number} width - The width of the paper in millimetres.
   * @param {number} height - The height of the paper in millimetres.
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Returns the paper dimensions in landscape.
   * If the height is greater than the width, it swaps them.
   * @returns {Paper} A new Paper instance in landscape orientation.
   */
  landscape() {
    if (this.height > this.width) {
      return new Paper(this.height, this.width);
    } else {
      return this;
    }
  }

  /**
   * Returns the paper dimensions in portrait.
   * If the height is smaller than the width, it swaps them.
   * @returns {Paper} A new Paper instance in portrait orientation.
   */
  portrait() {
    if (this.width > this.height) {
      return new Paper(this.height, this.width);
    } else {
      return this;
    }
  }
}

/**
 * Pre-defined paper sizes.
 * @type {Object<string, Paper>}
 */
export const PAPER = {
  A3: new Paper(297, 420),
  A4: new Paper(210, 297),
  A5: new Paper(148, 210),
  A6: new Paper(105, 148),
  A7: new Paper(74, 105),
  A8: new Paper(52, 74),
  ArchA: new Paper(229, 305),
};
