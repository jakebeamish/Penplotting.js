import { Line } from "../Line";
import { Vector } from "../Vector";

describe("Line", () => {



    describe("fromArray", () => {
        it("returns a new Line if successful", () => {

            const line = Line.fromArray([0, 0, 1, 1]);
            expect(line instanceof Line).toBe(true);

        })
    })
})