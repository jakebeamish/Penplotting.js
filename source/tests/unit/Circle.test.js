import { Circle } from "../../Circle";
import { createSVG } from "../../createSVG";

describe("The Circle class", () => {
    test("can append itself to an SVG", () => {


        let svg = createSVG();
        let circle = new Circle(0, 0, 1);
        circle.addToSVG(svg);


        const s = new XMLSerializer();
        const string = s.serializeToString(svg);


        expect(string).toMatch(`<circle cx="0" cy="0" r="1"`);
    })
})