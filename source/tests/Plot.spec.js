import { Plot } from "../Plot";
import { Line } from "../Line";
import { Path } from "../Path";
import { Circle } from "../Circle";
import { Point } from "../Point";
import { Vector } from "../Vector";

describe("Plot", () => {
  describe("constructor", () => {
    it("Creates a seed object literal with hex and decimal properties if Plot is instantiated with a seed property.", () => {
      let plot = new Plot({
        seed: 123,
      });

      expect(plot.seed).toHaveProperty("hex");
      expect(plot.seed).toHaveProperty("decimal");
    });
  });

  describe("addSingleShape", () => {
    let plot;
    beforeEach(() => {
      plot = new Plot();
    });

    it("Adds Lines to the Plot.lines array.", () => {
      const line = Line.fromArray(0, 0, 1, 1);
      plot.addSingleShape(line);
      expect(plot.lines[0]).toEqual(line);
    });

    it("Adds Paths to the Plot.paths array.", () => {
      const path = new Path([new Vector(), new Vector(1, 1), new Vector(2, 2)]);
      plot.addSingleShape(path);
      expect(plot.paths[0]).toEqual(path);
    });

    it("Adds Circles to the Plot.circles array.", () => {
      const circle = new Circle(0, 0, 5);
      plot.addSingleShape(circle);
      expect(plot.circles[0]).toEqual(circle);
    });

    it("Adds Points to the Plot.points array.", () => {
      const point = new Point(new Vector());
      plot.addSingleShape(point);
      expect(plot.points[0]).toEqual(point);
    });

    it("Throws a TypeError if an unsupported shape is added.", () => {
      const unsupportedShape = { foo: 15, bar: 20 };
      expect(() => plot.addSingleShape(unsupportedShape)).toThrow(TypeError);
    });
  });

  describe("addPathsToSVG", () => {
    it("Adds a path to the SVG via the SVGBuilder.", () => {
      const plot = new Plot();
      plot.add(
        new Path([new Vector(0, 0), new Vector(3, 0), new Vector(2, 1)]),
      );
      plot.draw();
      expect(plot.svg.outerHTML).toMatch("path");
    });
  });

  describe("addCirclesToSVG", () => {
    it("Adds a circle to the SVG via the SVGBuilder.", () => {
      const plot = new Plot();
      plot.add(new Circle(0, 0, 100));
      plot.draw();
      expect(plot.svg.outerHTML).toMatch("circle");
    });
  });

  describe("addLinesToSVG", () => {
    it("Adds a line to the SVG via the SVGBuilder.", () => {
      const plot = new Plot();
      plot.add(new Line(new Vector(0, 0), new Vector(4, 4)));
      plot.draw();
      expect(plot.svg.outerHTML).toMatch("line");
    });
  });

  describe("addPointsToSVG", () => {
    it("Adds points to the SVG via the SVGBuilder.", () => {
      const plot = new Plot();
      plot.add(new Point(new Vector()));
      plot.draw();

      // Points are circles by default
      expect(plot.svg.outerHTML).toMatch("circle");
    });
  });

  describe("draw", () => {
    it("Adds the seed to seedHistory if it is not already present.", () => {
      let plot = new Plot();
      plot.setSeed("ffffff");
      plot.draw();
      plot.setSeed("abcdef");
      plot.draw();
      plot.setSeed("ffffff");
      plot.draw();
      expect(plot.seedHistory.length).toBe(2);
    });
  });

  describe("setSeed", () => {
    it("Sets the Plot seed.", () => {
      const plot = new Plot();
      plot.draw();
      plot.setSeed("2");
      expect(plot.seed.decimal).toEqual(2);
    });
  });

  describe("randomizeSeed", () => {
    it("Sets the Plot seed to a new and different psuedo-random 8-bit hex string.", () => {
      const plot = new Plot();
      plot.draw();
      const oldSeed = plot.seed;
      plot.randomiseSeed();
      expect(plot.seed).not.toEqual(oldSeed);
    });
  });

  describe("clear", () => {
    it("Clears the document body.", () => {
      let plot = new Plot();

      let line = new Line(new Vector(1, 1), new Vector(5, 5));

      plot.add(line);

      plot.draw();

      expect(plot.lines).toHaveLength(1);

      plot.clear();

      expect(plot.lines).toHaveLength(0);
      expect(document.body.innerHTML).toBe("");
    });
  });

  describe("removeShortLines", () => {
    it("Returns an array of lines that are longer than the minimum length.", () => {
      const plot = new Plot();
      plot.minimumLineLength = 100;
      const lines = [
        Line.fromArray([0, 0, 1, 1]),
        Line.fromArray([0, 0, 0.01, 0]),
        Line.fromArray([0, 0, 100, 100]),
      ];

      plot.add(lines);
      plot.draw();
      expect(plot.lines.length).toBe(1);
    });

    it.skip("Doesn't remove lines that are longer than the minimum length.", () => {
      const plot = new Plot();
      plot.minimumLineLength = 10;
      const lines = [
        Line.fromArray(0, 0, 100, 100),
        Line.fromArray(0, 0, 1000, 10),
      ];
      plot.add(lines);
      plot.removeShortLines(plot.minimumLineLength);
      // plot.draw();
      expect(plot.lines.length).toBe(2);
    });
  });

  describe("handleKeydown", () => {
    let plot;

    beforeEach(() => {
      plot = new Plot();
      jest.spyOn(plot, "randomiseSeed").mockImplementation(() => {});
      jest.spyOn(plot, "downloadSVG").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Calls randomiseSeed when 'r' is pressed.", () => {
      const event = new KeyboardEvent("keydown", { key: "r" });
      plot.handleKeydown(event);
      expect(plot.randomiseSeed).toHaveBeenCalled();
    });

    it("Does not call randomiseSeed when 'r' is not pressed.", () => {
      const event = new KeyboardEvent("keydown", { key: "p" });
      plot.handleKeydown(event);
      expect(plot.randomiseSeed).not.toHaveBeenCalled();
    });

    it("Calls downloadSVG when 'd' is pressed.", () => {
      const event = new KeyboardEvent("keydown", { key: "d" });
      plot.handleKeydown(event);
      expect(plot.downloadSVG).toHaveBeenCalled();
    });

    it("Does not handle keydown events if an element is focused.", () => {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.focus();

      const event = new KeyboardEvent("keydown", { key: "d" });
      plot.handleKeydown(event);
      expect(plot.downloadSVG).not.toHaveBeenCalled();
      expect(plot.randomiseSeed).not.toHaveBeenCalled();
    });

    it("Does nothing if an unmapped key is pressed.", () => {
      const event = new KeyboardEvent("keydown", { key: "z" });
      plot.handleKeydown(event);
      expect(plot.randomiseSeed).not.toHaveBeenCalled();
      expect(plot.downloadSVG).not.toHaveBeenCalled();
    });
    it("Does nothing if an unmapped key is pressed.", () => {
      const event = new KeyboardEvent("keydown", { key: "f" });
      plot.handleKeydown(event);
      expect(plot.randomiseSeed).not.toHaveBeenCalled();
      expect(plot.downloadSVG).not.toHaveBeenCalled();
    });
  });

  describe("createUI", () => {
    it("Creates necessary HTML elements", () => {
      const plot = new Plot();
      plot.createUI(0.05);
      expect(document.querySelector("header")).not.toBeNull();
    });
  });

  describe("deduplicateLines", () => {
    it("Checks the lines array and removes lines that are duplicated.", () => {
      const plot = new Plot();

      plot.add([
        Line.fromArray([0, 0, 5, 5]),
        Line.fromArray([0, 0, 1, 1]),
        Line.fromArray([0, 0, 1, 1]),
        Line.fromArray([0, 0, 1, 1]),
        Line.fromArray([0, 0, 1, 2]),
      ]);
      plot.deduplicateLines();
      expect(plot.lines.length).toBe(3);
    });
  });

  describe("downloadSVG", () => {
    test("Downloads the SVG file. (Bad test)", () => {
      // Instantiate the Plot class
      const plot = new Plot(100, 100, {
        seed: 1,
      });

      // Mock methods
      const createObjectURLMock = jest.fn(() => "mock-url");
      const revokeObjectURLMock = jest.fn();
      const appendChildMock = jest
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => {});
      const removeChildMock = jest
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => {});

      global.URL.createObjectURL = createObjectURLMock;
      global.URL.revokeObjectURL = revokeObjectURLMock;

      // Call the downloadSVG method
      plot.downloadSVG("test.svg");

      // Check that the serializer and Blob were called correctly
      expect(createObjectURLMock).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
      expect(appendChildMock).toHaveBeenCalledTimes(1);
      expect(removeChildMock).toHaveBeenCalledTimes(1);

      // Check that the <a> element was created and clicked
      const aElement = document.body.appendChild.mock.calls[0][0];
      expect(aElement.tagName).toBe("A");

      // Use URL.createObjectURL to generate the expected absolute URL
      const expectedHref = new URL("mock-url", document.location).href;
      expect(aElement.href).toBe(expectedHref);
      // expect(aElement.download).toBe(plot.filename());

      // Clean up mocks
      appendChildMock.mockRestore();
      removeChildMock.mockRestore();
      global.URL.createObjectURL = createObjectURLMock.mockRestore();
      global.URL.revokeObjectURL = revokeObjectURLMock.mockRestore();
    });
  });

  describe("removeOverlappingLines", () => {
    it("Checks the lines array and removes sub-lines.", () => {
      const plot = new Plot();
      plot.add([
        Line.fromArray([0, 0, 5, 5]),
        // These lines are sub-lines of the above.
        Line.fromArray([1, 1, 4, 4]),
        Line.fromArray([2, 2, 3, 3]),

        // These lines are not sub-lines of the first line.
        Line.fromArray([1, 5, 5, 1]),
        Line.fromArray([3, 2, 2, 3]),
      ]);
      plot.removeOverlappingLines();

      expect(plot.lines.length).toBe(3);
    });
  });

  describe("createHistoryForm", () => {
    it("Creates a form with options that call setSeed when clicked.", () => {
      let plot = new Plot();
      let parent = document.createElement("div");
      plot.createHistoryForm(parent);

      plot.randomiseSeed();
      plot.randomiseSeed();

      plot.setSeed = jest.fn();

      const options = document
        .getElementById("history")
        .querySelectorAll("option");
      options[1].dispatchEvent(new Event("click"));
      expect(plot.setSeed).toHaveBeenCalled();
    });
  });

  describe("createNavigation", () => {
    let plot;
    let parent;

    beforeEach(() => {
      plot = new Plot();
      parent = document.createElement("div");
      document.body.appendChild(parent);
    });

    afterEach(() => {
      document.body.innerHTML = ""; // Clean up the DOM after each test
    });

    it("creates a nav element with a ul as its child", () => {
      plot.createNavigation(parent);

      const nav = parent.querySelector("nav");
      const ul = nav.querySelector("ul");

      expect(nav).not.toBeNull();
      expect(ul).not.toBeNull();
      expect(parent.contains(nav)).toBe(true);
      expect(nav.contains(ul)).toBe(true);
    });

    it("creates two nav items with the correct labels", () => {
      plot.createNavigation(parent);

      const ul = parent.querySelector("ul");
      const navItems = ul.querySelectorAll("li");

      expect(navItems.length).toBe(2);
      expect(navItems[0].textContent).toBe("⬇️");
      expect(navItems[1].textContent).toBe("🔄");
    });

    it("Creates a download nav item that calls downloadSVG when clicked.", () => {
      plot.createNavigation(parent);
      plot.downloadSVG = jest.fn();
      plot.draw();

      let button = document.querySelector("nav ul li a");
      button.dispatchEvent(new Event("click"));
      expect(plot.downloadSVG).toHaveBeenCalled();
    });

    it("Creates a randomiseSeed nav item that calls randomiseSeed when clicked.", () => {
      plot.createNavigation(parent);
      plot.randomiseSeed = jest.fn();
      plot.draw();

      let button = document.querySelector("nav ul li:nth-child(2) a");
      button.dispatchEvent(new Event("click"));
      expect(plot.randomiseSeed).toHaveBeenCalled();
    });
  });

  describe("createSeedInput", () => {
    let plot;
    let parentElement;
    beforeEach(() => {
      plot = new Plot();
      parentElement = document.createElement("div");
    });
    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("Creates an input element with the correct initial value.", () => {
      plot.createSeedInput(parentElement);
      const seedInput = parentElement.querySelector("input");
      expect(seedInput.value).toBe(plot.seed.hex);
    });

    it("Creates an input element that selects input text on focus.", () => {
      plot.createSeedInput(parentElement);
      const seedInput = parentElement.querySelector("input");
      seedInput.select = jest.fn();

      seedInput.dispatchEvent(new Event("focus"));
      expect(seedInput.select).toHaveBeenCalled();
    });

    it("Creates an input element that sets the Plot seed to the selected option.", () => {
      plot.createSeedInput(parentElement);
      const seedInput = parentElement.querySelector("input");
      plot.setSeed = jest.fn();

      seedInput.dispatchEvent(new Event("change"));
      expect(plot.setSeed).toHaveBeenCalled();
    });
  });

  describe("add", () => {
    test("Adds a line object to a plot.", () => {
      const plot = new Plot();

      const line = new Line(new Vector(0, 0), new Vector(5, 5));

      plot.add(line);

      expect(plot.lines).toContain(line);
      expect(plot.lines.length).toBe(1);
    });

    it.skip("Adds nothing to the plot if given an empty array to add.", () => {});

    test("Adds an array of lines to a plot.", () => {
      const plot = new Plot();

      const lines = [
        new Line(new Vector(0, 0), new Vector(5, 5)),
        new Line(new Vector(3, 1), new Vector(4, 4)),
      ];

      plot.add(lines);

      expect(plot.lines).toEqual(lines);
    });

    test("Adds a single line and an inner array of lines to a plot.", () => {
      const plot = new Plot();

      const array = [
        new Line(new Vector(0, 0), new Vector(5, 5)),
        new Line(new Vector(3, 1), new Vector(4, 4)),
      ];

      const line = new Line(new Vector(10, 10), new Vector(11, 17));
      plot.add([array, line]);
      expect(plot.lines.length).toBe(3);
    });

    describe("Adds shapes using stroke colour and width of the plot by default.", () => {
      it("Adds a single line width plot stroke width and colour.", () => {
        const plot = new Plot({
          stroke: "blue",
          strokeWidth: 5,
        });
        const line = Line.fromArray([0, 0, 1, 1]);
        plot.add(line);
        plot.draw();

        const s = new XMLSerializer();
        const string = s.serializeToString(plot.svg);
        expect(string).toMatch(/stroke=\"blue\"/);
      expect(string).toMatch(/stroke-width=\"5/)
      });
    });

    it("Adds a single circle to a plot with stroke and strokeWidth of plot.", () => {
      const plot = new Plot({
        stroke: "red",
        strokeWidth: 2,
      });

      const circle = new Circle(0, 0, 5);
      plot.add(circle);

      plot.draw();

      let s = new XMLSerializer();

      const string = s.serializeToString(plot.svg);

      expect(string).toMatch(/stroke=\"red\"/);
      expect(string).toMatch(/stroke-width=\"2/);
    });


  });


  describe("Adds shapes using stroke colour and width of user-defined config object.", () => {

    it("Adds a single Line with user-defined stroke and strokeWidth.", () => {
      const plot = new Plot();
      const line = new Line(
        new Vector(0, 0),
        new Vector(1, 1),
        {
          stroke: "white",
          strokeWidth: 3.2
        }
      )
      plot.add(line);
      plot.draw();
      const s = new XMLSerializer();
      const string = s.serializeToString(plot.svg);
      expect(string).toMatch(/stroke=\"white/);
      expect(string).toMatch(/stroke-width=\"3.2/);
    });

    it("Adds a Path with user-defined stroke and strokeWidth.", () => {
      const plot = new Plot();
      
      const path = new Path([
        new Vector(0, 0),
        new Vector(1, 1),
        new Vector(2, 3)
      ], {
        stroke: "purple",
        strokeWidth: 0.24
      });

      plot.add(path);
      plot.draw();
      const s = new XMLSerializer();
      const string = s.serializeToString(plot.svg);
      expect(string).toMatch(/stroke=\"purple/);
      expect(string).toMatch(/stroke-width=\"0.24/);
    })

    it("Adds a single Circle with user-defined stroke and strokeWidth.", () => {
      const plot = new Plot();
      const circle = new Circle(0, 0, 5, {
        stroke: "green",
        strokeWidth: 7.65
      });

      plot.add(circle);

      plot.draw();
      const s = new XMLSerializer();
      const string = s.serializeToString(plot.svg);

      expect(string).toMatch(/stroke=\"green"/);
      expect(string).toMatch(/stroke-width=\"7.65/);
    })

  })
});
