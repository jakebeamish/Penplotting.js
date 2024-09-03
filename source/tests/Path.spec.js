import { Path } from "../Path";
import { Vector } from "../Vector";

describe("Path", () => {
    describe("toSVGElement", () => {
        it("should return a valid unclosed path element with a command string that does not contain a 'Z' if this path is not closed.", () => {
            const path = new Path([
                new Vector(0, 0),
                new Vector(1, 1)
            ], {
                isClosed: false
            });
            expect(path.toSVGElement().outerHTML).not.toMatch("Z");
        });

        it("returns a valid closed path element with a command string that ends with a 'Z'.", () => {
            const path = new Path([
                new Vector(0, 0),
                new Vector(1, 1)
            ], {
                isClosed: true
            });

            expect(path.toSVGElement().outerHTML).toMatch("Z");
        });
    });
});
