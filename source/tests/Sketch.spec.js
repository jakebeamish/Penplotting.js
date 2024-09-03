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

  describe("draw", () => {
    it("Adds the seed to seedHistory if it is not already present.", () => {
      let sketch = new Sketch();
      sketch.setSeed('ffffff');
      sketch.draw();
      sketch.setSeed('abcdef');
      sketch.draw();
      sketch.setSeed('ffffff');
      sketch.draw();
      expect(sketch.seedHistory.length).toBe(2);
    })
  })

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


  describe("removeShortLines", () => {
    it("Returns an array of lines that are longer than the minimum length.", () => {
      const sketch = new Sketch();
      sketch.minimumLineLength = 100;
      const lines = [
        Line.fromArray([0, 0, 1, 1]),
        Line.fromArray([0, 0, 0.01, 0]),
        Line.fromArray([0, 0, 100, 100])
      ];

      sketch.add(lines);
      sketch.draw();
      expect(sketch.lines.length).toBe(1);
    });

    it.skip("Doesn't remove lines that are longer than the minimum length.", () => {
      const sketch = new Sketch();
      sketch.minimumLineLength = 10;
      const lines = [
        Line.fromArray(0, 0, 100, 100),
        Line.fromArray(0, 0, 1000, 10),
      ]
      sketch.add(lines);
      sketch.removeShortLines(sketch.minimumLineLength);
      // sketch.draw();
      expect(sketch.lines.length).toBe(2);
    });
  });

  describe("handleKeydown", () => {
    let sketch;

    beforeEach(() => {
      sketch = new Sketch();
      jest.spyOn(sketch, "randomiseSeed").mockImplementation(() => {});
      jest.spyOn(sketch, "downloadSVG").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Calls randomiseSeed when 'r' is pressed.", () => {
      const event = new KeyboardEvent('keydown', { key: 'r' });
      sketch.handleKeydown(event);
      expect(sketch.randomiseSeed).toHaveBeenCalled();
    });

    it("Does not call randomiseSeed when 'r' is not pressed.", () => {
      const event = new KeyboardEvent('keydown', { key: 'p' });
      sketch.handleKeydown(event);
      expect(sketch.randomiseSeed).not.toHaveBeenCalled();
    });


    it("Calls downloadSVG when 'd' is pressed.", () => {
      const event = new KeyboardEvent('keydown', { key: 'd' });
      sketch.handleKeydown(event);
      expect(sketch.downloadSVG).toHaveBeenCalled();
    });

    it("Does not handle keydown events if an element is focused.", () => {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();

      const event = new KeyboardEvent('keydown', { key: 'd' });
      sketch.handleKeydown(event);
      expect(sketch.downloadSVG).not.toHaveBeenCalled();
      expect(sketch.randomiseSeed).not.toHaveBeenCalled();
    });

    it("Does nothing if an unmapped key is pressed.", () => {
      const event = new KeyboardEvent('keydown', { key: "z" });
      sketch.handleKeydown(event);
      expect(sketch.randomiseSeed).not.toHaveBeenCalled();
      expect(sketch.downloadSVG).not.toHaveBeenCalled();
    });
    it("Does nothing if an unmapped key is pressed.", () => {
      const event = new KeyboardEvent('keydown', { key: "f" });
      sketch.handleKeydown(event);
      expect(sketch.randomiseSeed).not.toHaveBeenCalled();
      expect(sketch.downloadSVG).not.toHaveBeenCalled();
    });
  });

  describe("createUI", () => {
    it("Creates necessary HTML elements", () => {
      const sketch = new Sketch();
      sketch.createUI(0.05);
      expect(document.querySelector("header")).not.toBeNull();
    });
  });

  describe("deduplicateLines", () => {
    it("Checks the lines array and removes lines that are duplicated.", () => {
      const sketch = new Sketch();

      sketch.add(
        [
          Line.fromArray([0, 0, 5, 5]),
          Line.fromArray([0, 0, 1, 1]),
          Line.fromArray([0, 0, 1, 1]),
          Line.fromArray([0, 0, 1, 1]),
          Line.fromArray([0, 0, 1, 2])
        ]
      );
      sketch.deduplicateLines();
      expect(sketch.lines.length).toBe(3);

    });
  });

  describe("removeOverlappingLines", () => {
    it("Checks the lines array and removes sub-lines.", () => {
      const sketch = new Sketch();
      sketch.add([
        Line.fromArray([0, 0, 5, 5]),
        // These lines are sub-lines of the above.
        Line.fromArray([1, 1, 4, 4]),
        Line.fromArray([2, 2, 3, 3]),

        // These lines are not sub-lines of the first line.
        Line.fromArray([1, 5, 5, 1]),
        Line.fromArray([3, 2, 2, 3])
      ]);
      sketch.removeOverlappingLines();

      expect(sketch.lines.length).toBe(3);
    });
  });

  describe("createHistoryForm", () => {
    it("Creates a form with options that call setSeed when clicked.", () => {
      let sketch = new Sketch();
      let parent = document.createElement("div");
      sketch.createHistoryForm(parent);

      sketch.randomiseSeed();
      sketch.randomiseSeed();

      sketch.setSeed = jest.fn();

      const options = document.getElementById("history").querySelectorAll("option");
      options[1].dispatchEvent(new Event("click"));
      expect(sketch.setSeed).toHaveBeenCalled();
    });
  });

  describe("createNavigation", () => {
    let sketch;
    let parent;
  
    beforeEach(() => {
      sketch = new Sketch();
      parent = document.createElement("div");
      document.body.appendChild(parent);
    });
  
    afterEach(() => {
      document.body.innerHTML = ""; // Clean up the DOM after each test
    });
  
    it("creates a nav element with a ul as its child", () => {
      sketch.createNavigation(parent);
  
      const nav = parent.querySelector("nav");
      const ul = nav.querySelector("ul");
  
      expect(nav).not.toBeNull();
      expect(ul).not.toBeNull();
      expect(parent.contains(nav)).toBe(true);
      expect(nav.contains(ul)).toBe(true);
    });
  
    it("creates two nav items with the correct labels", () => {
      sketch.createNavigation(parent);
  
      const ul = parent.querySelector("ul");
      const navItems = ul.querySelectorAll("li");
  
      expect(navItems.length).toBe(2);
      expect(navItems[0].textContent).toBe("⬇️");
      expect(navItems[1].textContent).toBe("🔄");
    });

    it("Creates a download nav item that calls downloadSVG when clicked.", () => {
      sketch.createNavigation(parent);
      sketch.downloadSVG = jest.fn();
      sketch.draw();

      let button = document.querySelector("nav ul li a");
      button.dispatchEvent(new Event("click"));
      expect(sketch.downloadSVG).toHaveBeenCalled();
    });

    it("Creates a randomiseSeed nav item that calls randomiseSeed when clicked.", () => {
      sketch.createNavigation(parent);
      sketch.randomiseSeed = jest.fn();
      sketch.draw();

      let button = document.querySelector("nav ul li:nth-child(2) a");
      button.dispatchEvent(new Event("click"));
      expect(sketch.randomiseSeed).toHaveBeenCalled();
    });
  });
  

  describe("createSeedInput", () => {
    let sketch;
    let parentElement;
    beforeEach(() => {
      sketch = new Sketch();
      parentElement = document.createElement("div");
    });
    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("Creates an input element with the correct initial value.", () => {
      sketch.createSeedInput(parentElement);
      const seedInput = parentElement.querySelector("input");
      expect(seedInput.value).toBe(sketch.seed.hex);
    });

    it("Creates an input element that selects input text on focus.", () => {
      sketch.createSeedInput(parentElement);
      const seedInput = parentElement.querySelector("input");
      seedInput.select = jest.fn();

      seedInput.dispatchEvent(new Event("focus"));
      expect(seedInput.select).toHaveBeenCalled();
    });

    it("Creates an input element that sets the Sketch seed to the selected option.", () => {
      sketch.createSeedInput(parentElement);
      const seedInput = parentElement.querySelector("input");
      sketch.setSeed = jest.fn();

      seedInput.dispatchEvent(new Event("change"));
      expect(sketch.setSeed).toHaveBeenCalled();
    })
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

    it.skip("Adds nothing to the sketch if given an empty array to add.", () => {
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

