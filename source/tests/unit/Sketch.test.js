import { Sketch } from "../../Sketch";
import { Line } from "../../Line";

describe("Instance methods of Sketch object", () => {

    test("If a Sketch is instantiated with a number seed, it is parsed into a seed object literal with hex and decimal properties", () => {

        let sketch = new Sketch({
            seed: 123
        });

        expect(sketch.seed).toHaveProperty("hex");
        expect(sketch.seed).toHaveProperty("decimal");

    })



    test("Clearing a Sketch results in an empty document body", () => {
        let sketch = new Sketch();

        let line = new Line({x:1, y:1}, {x:2, y:3});

        sketch.add(line);

        sketch.draw();

        expect(sketch.lines).toHaveLength(1)

        sketch.clear();

        expect(sketch.lines).toHaveLength(0)
        expect(document.body.innerHTML).toBe("");
    });



})