import { unseededRandomHex } from "./Random.js";
import { hexToDec } from "./utils.js";
import { decToHex } from "./utils.js";
import { Line } from "./Line.js";
import { Circle } from "./Circle.js";
import { Path } from "./Path.js";
import { SVGBuilder } from "./SVGBuilder.js";

/**
 * @class
 * Sketch is an object that is able to create, display and download SVG documents.
 */
export class Sketch {
  /**
   * @param {object} [options] - An object containing configuration for Sketch.
   * @param {object} [options.size] - An object with width and height properties to be used as dimensions of the Sketch.
   * @param {number} [options.size.width=100] - The width of the Sketch.
   * @param {number} [options.size.height=100] - The height of the Sketch.
   * @param {string} [options.title = "Untitled"] - The title of the Sketch.
   * @param {string} [options.units = "mm"] - The units of measurement to be used (i.e. "mm" or "in").
   * @param {string} [options.backgroundColor = "transparent"] - The background colour of the sketch, as a hex value or HTML color name.
   * @param {number} [options.seed] - The seed to be used for the Sketch. Defaults to an 8 digit hexadecimal integer.
   * @param {string} [options.stroke = "black"] - The foreground colour of the sketch, as a hex value or HTML color name.
   * @param {number} [options.strokeWidth = 1] - The line width of the Sketch. Defaults to 1 unit. (1mm)
   * @param {number} [options.minimumLineLength = 0.1] - Lines shorter than this length are not drawn.
   */
  constructor({
    units = "mm",
    backgroundColor = "transparent",
    title = "Untitled",
    seed = unseededRandomHex(8),
    size = {
      width: 100,
      height: 100,
    },
    stroke = "black",
    strokeWidth = 1,
    minimumLineLength = 0.1,
  } = {}) {
    this.title = title;
    this.size = size;
    this.strokeWidth = strokeWidth;
    this.units = units;
    this.stroke = stroke;
    this.backgroundColor = backgroundColor;
    this.minimumLineLength = minimumLineLength;

    this.lines = [];
    this.paths = [];
    this.circles = [];
    this.seedHistory = [];

    this.svgBuilder = new SVGBuilder();

    this.svgBuilder
      .setWidth(`${this.size.width}${this.units}`)
      .setHeight(`${this.size.height}${this.units}`)
      .setViewBox(`0 0 ${this.size.width} ${this.size.height}`)
      .setBackgroundColor(this.backgroundColor);

    this.header;
    this.generate = () => {};

    this.seed = seed;

    if (typeof seed === "number") {
      this.seed = {
        hex: decToHex(seed, 8),
        decimal: seed,
      };
    }

    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener("keydown", this.handleKeydown);
  }

  /**
   *
   * @returns {string} - The file name to be used to name the Sketch's SVG document, as a string
   */
  filename() {
    return `${this.title}_${this.seed.hex}_${this.size.width}x${this.size.height}${this.units}.svg`;
  }

  /**
   * Adds shapes to the sketch.
   * @param {Line|Circle|Path|Array} shape - An object or array of objects to be added to the sketch.
   */
  add(shape) {
    if (Array.isArray(shape)) {
      shape.forEach((item) => {
        if (Array.isArray(item)) {
          this.add(item);
        } else {
          this.addSingleShape(item);
        }
      });
    } else {
      this.addSingleShape(shape);
    }
  }

  /**
   * Adds a single shape to the appropriate array.
   * @param {Line|Path|Circle} shape
   */
  addSingleShape(shape) {
    if (shape instanceof Line) {
      this.lines.push(shape);
    } else if (shape instanceof Path) {
      this.paths.push(shape);
    } else if (shape instanceof Circle) {
      this.circles.push(shape);
    } else {
      throw new TypeError("Unsupported shape type:", shape);
    }
  }

  /**
   * Generates the SVG and UI and appends them to the document body.
   * Must be called after defining a Sketch.generate() function.
   */
  draw() {
    let startTime = Date.now();
    this.generate();

    this.deduplicateLines();
    this.removeOverlappingLines();
    this.removeShortLines(this.minimumLineLength);

    this.addLinesToSVG();

    this.addPathsToSVG();

    this.addCirclesToSVG();

    this.svg = this.svgBuilder.build();

    const timeTaken = +(
      Math.round((Date.now() - startTime) / 1000 + "e+2") + "e-2"
    );

    this.createUI(timeTaken);
    this.appendSVG();
    if (!this.seedHistory.includes(this.seed.hex)) {
      this.seedHistory.unshift(this.seed.hex);
    }
  }

  handleKeydown(e) {
    const focusedElement = document.activeElement;

    // Check if the focused element is an input, textarea, or select
    if (
      focusedElement.tagName === "INPUT" ||
      focusedElement.tagName === "TEXTAREA" ||
      focusedElement.tagName === "SELECT" ||
      focusedElement.isContentEditable
    ) {
      // If an input is focused, do nothing
      return;
    }

    if (e.key === "d") {
      this.downloadSVG();
    } else if (e.key === "r") {
      this.randomiseSeed();
    }
  }

  /**
   * Empty out any existing HTML UI and SVG document elements on the page, in order to regenerate a Sketch.
   */
  clear() {
    this.lines = [];
    this.paths = [];
    this.circles = [];

    document.body.innerHTML = "";

    this.svgBuilder.clear();
  }

  /**
   * Download the {@link Sketch} as an SVG file.
   */
  downloadSVG() {
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(this.svgBuilder.build());

    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = this.filename();
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  randomiseSeed() {
    this.seed = unseededRandomHex(8);
    this.clear();
    this.draw();
  }

  setSeed(input) {
    this.seed = {
      hex: input,
      decimal: hexToDec(input),
    };
    this.clear();
    this.draw();
  }

  /**
   * Removes duplicated [Lines]{@link Line} from this Sketch's lines array.
   */
  deduplicateLines() {
    const uniqueLines = [];

    for (const line of this.lines) {
      let isDuplicate = false;
      for (const uniqueLine of uniqueLines) {
        if (line.isDuplicate(uniqueLine)) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        uniqueLines.push(line);
      }
    }

    this.lines = uniqueLines;
  }

  /**
   * Removes overlapping [Lines]{@link Line} from this Sketch's lines array.
   */
  removeOverlappingLines() {
    const uniqueLines = [];

    let sortedLines = this.lines.toSorted(
      (j, k) => k.a.distance(k.b) - j.a.distance(j.b)
    );
    for (const line of sortedLines) {
      let isOverlapped = false;
      for (const uniqueLine of uniqueLines) {
        if (line.isContainedBy(uniqueLine)) {
          isOverlapped = true;
          break;
        }
      }
      if (!isOverlapped) {
        uniqueLines.push(line);
      }
    }

    this.lines = uniqueLines;
  }

  /**
   * Removes [Lines]{@link Line} in this Sketch's lines array that are shorter than a specified minimum length.
   * @param {number} minimumLength
   */
  removeShortLines(minimumLength) {
    const validLines = [];

    for (const line of this.lines) {
      if (line.length() > minimumLength) {
        validLines.push(line);
      }
    }

    this.lines = validLines;
  }

  /**
   * Adds the [Lines]{@link Line} in this Sketch's lines array to it's SVG element.
   */
  addLinesToSVG() {
    for (const line of this.lines) {
      this.svgBuilder.addShape(line.toSVGElement());
    }
  }

  /**
   * Adds the [Paths]{@link Path} in this Sketch's paths array to it's SVG element.
   */
  addPathsToSVG() {
    for (const path of this.paths) {
      this.svgBuilder.addShape(path.toSVGElement());
    }
  }
  /**
   * Adds the [Circles]{@link Circle} in this Sketch's circles array to it's SVG element.
   */
  addCirclesToSVG() {
    for (const circle of this.circles) {
      this.svgBuilder.addShape(circle.toSVGElement());
    }
  }

  /**
   * Appends this sketch's SVG element to the document body.
   */
  appendSVG() {
    document.body.appendChild(this.svg);
  }

  updateDocumentTitle() {
    document.title = `${this.title} ${this.seed.hex}`;
  }

  createElement(tag, parent, textContent = "", attributes = {}) {
    const element = document.createElement(tag);
    if (textContent) element.textContent = textContent;
    Object.keys(attributes).forEach((key) =>
      element.setAttribute(key, attributes[key])
    );
    parent.appendChild(element);
    return element;
  }

  createSeedInput(parent) {
    const seedInput = this.createElement("input", parent, "", {
      value: this.seed.hex,
    });
    seedInput.addEventListener("change", () => this.setSeed(seedInput.value));
    seedInput.addEventListener("focus", () => seedInput.select());
  }

  createHistoryForm(parent) {
    const historyForm = this.createElement("form", parent);
    const historyLabel = this.createElement("label", historyForm, "History: ", {
      for: "history",
    });
    const historySelect = this.createElement("select", historyLabel, "", {
      name: "history",
      id: "history",
    });

    this.createElement("option", historySelect, "--------", { value: "" });

    this.seedHistory.forEach((seed) => {
      const option = this.createElement("option", historySelect, seed, {
        value: seed,
      });
      option.addEventListener("click", () => this.setSeed(seed));
    });
  }

  createNavigation(parent) {
    const nav = this.createElement("nav", parent);
    const ul = this.createElement("ul", nav);

    this.createNavItem(ul, "⬇️", () => this.downloadSVG());
    this.createNavItem(ul, "🔄", () => this.randomiseSeed());
  }

  createNavItem(parent, text, clickHandler) {
    const listItem = this.createElement("li", parent);
    const button = this.createElement("a", listItem, text);
    button.addEventListener("click", clickHandler);
  }

  addSketchInfo(parent, timeTaken) {
    const sketchInfo = this.createElement("div", parent);
    const numOfShapes =
      this.lines.length + this.paths.length + this.circles.length;
    const timeText = timeTaken < 0.05 ? "<0.05s" : `~${timeTaken}s`;
    this.createElement(
      "p",
      sketchInfo,
      `Generated ${numOfShapes} shapes in ${timeText}`
    );
  }

  /**
   * Creates HTML UI and adds it to the document body.
   * @param {number} timeTaken
   */
  createUI(timeTaken) {
    this.updateDocumentTitle();

    // Create a HTML header element and append to body.
    this.header = this.createElement("header", document.body);

    // Create a h1 title and append to header.
    this.createElement("h1", this.header, this.title);

    this.createSeedInput(this.header);

    this.createHistoryForm(this.header);

    this.createNavigation(this.header);

    this.addSketchInfo(this.header, timeTaken);
  }
}
