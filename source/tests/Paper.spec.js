import { PAPER, Paper } from "../Paper";

describe("Paper", () => {
  describe("constructor", () => {
    it("should return a new paper object if creation is successful.", () => {
      const width = 100;
      const height = 141;
      const paper = new Paper(width, height);
      expect(paper instanceof Paper).toBeTruthy();
    });
  });

  describe("landscape", () => {
    it("should rotate a paper object if it's height is greater than it's width.", () => {
      let portraitPaper = new Paper(10, 100);
      let landscapePaper = portraitPaper.landscape();
      expect(landscapePaper.width).toBe(100);
    });

    it("should not mutate a paper object if it's width is greater than it's height.", () => {
      let landscapePaper = new Paper(100, 10);
      expect(landscapePaper.landscape().width).toBe(100);
    });
  });

  describe("portrait", () => {
    it("should rotate a Paper object if it's width is greater than it's height", () => {
      let landscapePaper = new Paper(100, 10);
      let portraitPaper = landscapePaper.portrait();
      expect(portraitPaper.width).toBe(10);
    });

    it("should not rotate a paper object if it's width is greater than it's height", () => {
      let portraitPaper = new Paper(10, 100);
      expect(portraitPaper.portrait().height).toBe(100);
    });
  });
});

describe("PAPER", () => {
  it("should be an object with common paper dimensions as keys to Paper objects.", () => {
    expect(PAPER).toBeInstanceOf(Object);
    for (let size in PAPER) {
      expect(PAPER[size] instanceof Paper).toBeTruthy();
    }
  });
});
