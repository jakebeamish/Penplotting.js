import { Circle } from "../../Circle";
import { SVGBuilder } from "../../SVGBuilder";

describe("The Circle class", () => {
    test("can append itself to an SVG", () => {


        let svgBuilder = new SVGBuilder();

        svgBuilder.setWidth(100).setHeight(100).setViewBox("0 0 100 100")


        let circle = new Circle(0, 0, 1);
        
        svgBuilder.addShape(circle.toSVGElement())


        const s = new XMLSerializer();
        const string = s.serializeToString(svgBuilder.build());


        expect(string).toMatch(`<circle cx="0" cy="0" r="1"`);
    })
})