import { Sketch } from "../Sketch";
import { Line } from "../Line";
import { Path } from "../Path";
import { Circle } from "../Circle";
import { Vector } from "../Vector";

describe("Sketch", () => {
    describe("constructor", () => {
        it("Creates a seed object literal with hex and decimal properties if Sketch is instantiated with a seed property.", () => {

            let sketch = new Sketch({
                seed: 123
            });
    
            expect(sketch.seed).toHaveProperty("hex");
            expect(sketch.seed).toHaveProperty("decimal");
        });
    });

    describe("addSingleShape", () => {
        let sketch;
        beforeEach(() => {
            sketch = new Sketch();
        });

        it("Adds Lines to the Sketch.lines array.", () => {
            const line = Line.fromArray(0, 0, 1, 1);
            sketch.addSingleShape(line);
            expect(sketch.lines[0]).toEqual(line);
        });

        it("Adds Paths to the Sketch.paths array.", () => {
            const path = new Path([
              new Vector(),
              new Vector(1, 1),
              new Vector(2, 2)
            ]);
            sketch.addSingleShape(path);
            expect(sketch.paths[0]).toEqual(path);
        });

        it("Adds Circles to the Sketch.circles array.", () => {
            const circle = new Circle(0, 0, 5);
            sketch.addSingleShape(circle);
            expect(sketch.circles[0]).toEqual(circle);
        });

        it("Throws a TypeError if an unsupported shape is added.", () => {
            const unsupportedShape = { foo: 15, bar: 20 };
            expect(() => sketch.addSingleShape(unsupportedShape))
            .toThrow(TypeError);
        });
    });

    describe("addPathsToSVG", () => {
      it("Adds a path to the SVG via the SVGBuilder.", () => {
        const sketch = new Sketch();
        sketch.add(new Path([
          new Vector(0, 0),
          new Vector(3, 0),
          new Vector(2, 1)
        ]));
        sketch.draw();
        expect(sketch.svg.outerHTML).toMatch("path");
      });
    });

    describe("addCirclesToSVG", () => {
      it("Adds a circle to the SVG via the SVGBuilder.", () => {
        const sketch = new Sketch();
        sketch.add(new Circle(0, 0, 100));
        sketch.draw();
        expect(sketch.svg.outerHTML).toMatch("circle");
      });
    });

    describe("addLinesToSVG", () => {
      it("Adds a line to the SVG via the SVGBuilder.", () => {
        const sketch = new Sketch();
        sketch.add(new Line(
          new Vector(0, 0), new Vector(4, 4)
        ));
        sketch.draw();
        expect(sketch.svg.outerHTML).toMatch("line");
      });
    });
  
    describe("setSeed", () => {
        it("Sets the Sketch seed.", () => {
            const sketch = new Sketch();
            sketch.draw();
            sketch.setSeed('2');
            expect(sketch.seed.decimal).toEqual(2);
        });
    });

    describe("randomizeSeed", () => {
        it("Sets the Sketch seed to a new and different psuedo-random 8-bit hex string.", () => {
            const sketch = new Sketch();
            sketch.draw();
            const oldSeed = sketch.seed;
            sketch.randomiseSeed();
            expect(sketch.seed).not.toEqual(oldSeed);
        });
    });

    describe("clear", () => {
        it("Clears the document body.", () => {
            let sketch = new Sketch();
    
            let line = new Line(new Vector(1, 1), new Vector(5, 5));
    
            sketch.add(line);
    
            sketch.draw();
    
            expect(sketch.lines).toHaveLength(1)
    
            sketch.clear();
    
            expect(sketch.lines).toHaveLength(0)
            expect(document.body.innerHTML).toBe("");
        });
    
    });

    describe("add", () => {
    
        test("Adds a line object to a sketch", () => {
            const sketch = new Sketch();
    
            const line = new Line(
                new Vector(0, 0),
                new Vector(5, 5)
            );
    
            sketch.add(line);
    
            expect(sketch.lines).toContain(line);
            expect(sketch.lines.length).toBe(1);
        });
    
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
    
        test("Adds a single line and an inner array of lines to a sketch", () => {
            const sketch = new Sketch();
    
            const array = [
                new Line(
                    new Vector(0, 0),
                    new Vector(5, 5)
                ),
                new Line(
                    new Vector(3, 1),
                    new Vector(4, 4)
                )
            ]
    
            const line = new Line(
                new Vector(10, 10),
                new Vector(11, 17)
            );
            sketch.add([array, line]);
            expect(sketch.lines.length).toBe(3);
        });
    });
});

