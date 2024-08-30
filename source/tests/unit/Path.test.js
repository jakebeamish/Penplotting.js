import { Path } from "../../Path";
import { Vector } from "../../Vector";
import { SVGBuilder } from "../../SVGBuilder";

describe("the Path class", () => {
    test("can be set to closed, which is reflected in the SVG element it creates from itself", () => {
        const path = new Path([
            new Vector(0, 0),
            new Vector(1, 0),
            new Vector(1, 1)
        ], {
            isClosed: true
        });

        const svgBuilder = new SVGBuilder();
        svgBuilder.setWidth(100).setHeight(100).setViewBox("0 0 100 100")
        .addShape(path.toSVGElement());
        const s = new XMLSerializer();
        const string = s.serializeToString(svgBuilder.build());
        expect(string).toMatch(" Z");
    })
})