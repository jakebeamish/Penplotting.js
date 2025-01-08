import { PAPER, Paper } from "../Paper";

describe("Paper", () => {
  describe("constructor", () => {
    it("Returns a new Paper object if creation is successful.", () => {
      const width = 100;
      const height = 141;
      const paper = new Paper(width, height);
      expect(paper instanceof Paper).toBeTruthy();
			expect(paper.width).toEqual(width);
			expect(paper.height).toEqual(height);
    });
  });

  describe("landscape", () => {
    it("Returns a rotated Paper if it's height is greater than it's width.", () => {
      let portraitPaper = new Paper(10, 100);
      let landscapePaper = portraitPaper.landscape();
      expect(landscapePaper.width).toBe(100);
    });

    it("Returns the current Paper if it's width is greater than it's height.", () => {
      let landscapePaper = new Paper(100, 10);
      expect(landscapePaper.landscape().width).toBe(100);
			expect(landscapePaper.landscape().height).toBe(10);
    });

		it("Returns the current Paper if width and height are equal.", () => {
			let squarePaper = new Paper(100, 100);
			let landscapePaper = squarePaper.landscape();
			expect(landscapePaper).toEqual(squarePaper);
		})
  });

  describe("portrait", () => {
    it("Returns a rotated Paper if it's width is greater than it's height.", () => {
      let landscapePaper = new Paper(100, 10);
      let portraitPaper = landscapePaper.portrait();
			expect(portraitPaper).not.toEqual(landscapePaper)
      expect(portraitPaper.width).toBe(10);
			expect(portraitPaper.height).toBe(100);
    });

    it("Returns the current Paper if it's width is greater than it's height.", () => {
      let portraitPaper = new Paper(10, 100);
			expect(portraitPaper.portrait().width).toBe(10);
      expect(portraitPaper.portrait().height).toBe(100);
    });

		it("Returns the current Paper if width and height are equal.", () => {
			let squarePaper = new Paper(100, 100);
			expect(squarePaper.portrait()).toEqual(squarePaper)
		})
  });
});

describe("PAPER", () => {
  it("Is an object with strings as keys to Paper objects.", () => {
    expect(PAPER).toBeInstanceOf(Object);
    for (let size in PAPER) {
      expect(PAPER[size] instanceof Paper).toBeTruthy();
    }
  });
});
