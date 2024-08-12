import { Paper } from "../../Paper.js"

describe("", () => {

    test("The landscape function rotates a Paper object if it's height is greater than it's width", () => {
        let portraitPaper = new Paper(10, 100);
        let landscapePaper = portraitPaper.landscape();
        expect(landscapePaper.width).toBe(100);

    })

    test("The landscape function does not mutate a paper object if it's width is greater than it's height", () => {
        let landscapePaper = new Paper(100, 10);
        expect(landscapePaper.landscape().width).toBe(100)
    })

    test("The portrait function rotates a Paper object if it's width is greater than it's height", () => {
        let landscapePaper = new Paper(100, 10);
        let portraitPaper = landscapePaper.portrait();
        expect(portraitPaper.width).toBe(10);
    })

    test("The landscape function does not mutate a paper object if it's width is greater than it's height", () => {
        let portraitPaper = new Paper(10, 100);
        expect(portraitPaper.portrait().height).toBe(100)
    })

})