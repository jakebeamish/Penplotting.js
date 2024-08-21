import { Sketch } from "../Sketch";
import { Line } from "../Line";
import { Path } from "../Path";
import { Circle } from "../Circle";
import { Vector } from "../Vector";

describe("Sketch", () => {
    describe("addSingleShape", () => {
        let sketch;
        beforeEach(() => {
            sketch = new Sketch();
        });

        it("should add Lines to the Sketch.lines array.", () => {
            const line = Line.fromArray(0, 0, 1, 1);
            sketch.addSingleShape(line);
            expect(sketch.lines[0]).toEqual(line);
        });

        it("should add Paths to the Sketch.paths array.", () => {
            const path = new Path([new Vector(), new Vector(1, 1), new Vector(2, 2)]);
            sketch.addSingleShape(path);
            expect(sketch.paths[0]).toEqual(path);
        });

        it("should add Circles to the Sketch.circles array.", () => {
            const circle = new Circle(0, 0, 5);
            sketch.addSingleShape(circle);
            expect(sketch.circles[0]).toEqual(circle);
        });

        it("should throw a TypeError if an unsupported shape is added.", () => {
            const unsupportedShape = { foo: 15, bar: 20 };
            expect(() => sketch.addSingleShape(unsupportedShape)).toThrow(TypeError);
        });
    });

    describe("setSeed", () => {
        it("should set the Sketch seed.", () => {
            const sketch = new Sketch();
            sketch.draw();
            sketch.setSeed('2');
            expect(sketch.seed.decimal).toEqual(2);
        });
    });

    describe("randomizeSeed", () => {
        it("should set the Sketch seed to a new and different psuedo-random 8-bit hex string.", () => {
            const sketch = new Sketch();
            sketch.draw();
            const oldSeed = sketch.seed;
            sketch.randomiseSeed();
            expect(sketch.seed).not.toEqual(oldSeed);
        });
    });

    describe("addPathsToSVG", () => {
        let sketch, mockPath1, mockPath2;

        beforeEach(() => {
            sketch = new Sketch();
            mockPath1 = new Path([new Vector(0, 0), new Vector(1, 1)]);
            mockPath2 = new Path([new Vector(2, 2), new Vector(3, 3)]);
            jest.spyOn(mockPath1, 'addToSVG').mockImplementation(()=> {});
            sketch.paths = [mockPath1, mockPath2];
        });

        it("should call addToSVG on each Path in the paths array.", () => {
            sketch.addPathsToSVG();
            expect(mockPath1.addToSVG).toHaveBeenCalledWith(sketch.svg, {
                stroke: sketch.stroke,
                strokeWidth: sketch.strokeWidth
            });
        });
    });

    describe("addCirclesToSVG", () => {
        let sketch, mockCircle1, mockCircle2;

        beforeEach(() => {
            sketch = new Sketch();
            mockCircle1 = new Circle(0, 0, 10);
            mockCircle2 = new Circle(5, 5, 5);
            jest.spyOn(mockCircle1, 'addToSVG').mockImplementation(()=> {});
            jest.spyOn(mockCircle2, 'addToSVG').mockImplementation(()=> {});
            sketch.circles = [mockCircle1, mockCircle2];
        });

        it("should call addToSVG on each Path in the paths array.", () => {
            sketch.addCirclesToSVG();
            expect(mockCircle1.addToSVG).toHaveBeenCalledWith(sketch.svg, {
                stroke: sketch.stroke,
                strokeWidth: sketch.strokeWidth
            });
            expect(mockCircle2.addToSVG).toHaveBeenCalledWith(sketch.svg, {
                stroke: sketch.stroke,
                strokeWidth: sketch.strokeWidth
            })
        });
    });
});