import { Path } from "../../Path";
import { Vector } from "../../Vector";
import { createSVG } from "../../createSVG";

describe("the Path class", () => {
    test("can be set to closed, which is reflected in the SVG element it creates from itself", () => {
        const path = new Path([
            new Vector(0, 0),
            new Vector(1, 0),
            new Vector(1, 1)
        ], {
            isClosed: true
        });

        const svg = createSVG();
        path.addToSVG(svg);
        const s = new XMLSerializer();
        const string = s.serializeToString(svg);
        expect(string).toMatch(" Z");
    })
})