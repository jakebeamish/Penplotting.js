export class Paper {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  landscape() {
    if (this.height > this.width) {
      return { width: this.height, height: this.width };
    } else {
      return this;
    }
  }

  portrait() {
    if (this.width > this.height) {
      return { width: this.height, height: this.width };
    } else {
      return this;
    }
  }
}

export const PAPER = {
  A3: new Paper(297, 420),
  A4: new Paper(210, 297),
  A5: new Paper(148, 210),
  A6: new Paper(105, 148),
  A7: new Paper(74, 105),
  A8: new Paper(52, 74),
  ArchA: new Paper(229, 305),
};
