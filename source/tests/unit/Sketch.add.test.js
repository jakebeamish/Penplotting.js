import { Sketch } from "../../Sketch";
import { Line } from "../../Line";
import { Vector } from "../../Vector";

describe("Sketch.add() can be used to add shapes to the sketch.", () => {
    
    test("Adds a line object to a sketch", () => {
        const sketch = new Sketch();

        const line = new Line(
            new Vector(0, 0),
            new Vector(5, 5)
        );

        sketch.add(line);

        expect(sketch.lines).toContain(line);
        expect(sketch.lines.length).toBe(1);
    })

    test("Adds an array of lines to a sketch", () => {
        const sketch = new Sketch();

        const lines = [
            new Line(
                new Vector(0, 0),
                new Vector(5, 5)
            ),
            new Line(
                new Vector(3, 1),
                new Vector(4, 4)
            )
        ]

        sketch.add(lines);

        expect(sketch.lines).toEqual(lines);
    })

})