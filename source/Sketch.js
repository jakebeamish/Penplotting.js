import { createSVG } from "./createSVG.js";
import { addLineToSVG } from "./addLineToSVG.js";
import { unseededRandomHex } from "./Random.js";
import { hexToDec } from "./utils.js";
import { decToHex } from "./utils.js";
import { wrap } from "./utils.js";
import { Line } from "./Line.js";
import  { Circle } from "./Circle.js"
import { Path } from "./Path.js";
import { addPathToSVG } from "./addPathToSVG.js";
import { addCircleToSVG } from "./addCircleToSVG.js";

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
	 * @param {string} [options.units = "mm"] - The units of measurement to be used (i.e. "mm" or "in")
	 * @param {string} [options.backgroundColor = "transparent"] - The background colour of the sketch, as a hex value or HTML color name.
	 * @param {number} [options.seed] - The seed to be used for the Sketch. Defaults to an 8 digit hexadecimal integer
	 * @param {number} [options.strokeWidth = 1] - The line width of the Sketch. Defaults to 1 unit (1mm)
	 */
	constructor(
		{
			units = "mm",
			backgroundColor = "transparent",
			title = "Untitled",
			seed = unseededRandomHex(8),
			size = {
				width: 100,
				height: 100
			},
			strokeWidth = 1,
		} = {},
	) {
		this.title = title;
		this.size = size;
		this.strokeWidth = strokeWidth;
		this.units = units;
		this.backgroundColor = backgroundColor;

		this.lines = [];
		this.paths = [];
		this.circles = [];

		this.svg = createSVG(this.size.width, this.size.height, {
			units: this.units,
			backgroundColor: this.backgroundColor,
		});

		this.header;
		this.generate = () => { };

		this.seed = seed;

		if (typeof seed === "number") {
			this.seed = {
				hex: decToHex(seed, 8),
				decimal: seed
			}
		}
	}

	/**
	 * 
	 * @returns {string} - The file name to be used to name the Sketch's SVG document, as a string
	 */
	filename() {
		return `${this.title}_${this.seed.hex}_${this.size.width}x${this.size.height}${this.units}.svg`;
	}

	/**
	 * Adds a shape (line or other future shapes) to the sketch.
	 * @param {Line|Array<Line>} shape - A Line object or array of Line objects
	 */
	add(shape) {
		if (Array.isArray(shape)) {
			shape.forEach(s => this.addSingleShape(s));
		} else {
			this.addSingleShape(shape);
		}
	}

	/**
	 * Adds a single shape to the appropriate array.
	 * Lines -> this.lines
	 * @param {Line} shape 
	 */
	addSingleShape(shape) {
		if (shape instanceof Line) {
			this.lines.push(shape);
		} else if (shape instanceof Path) {
			this.paths.push(shape)
		} else if (shape instanceof Circle) {
			this.circles.push(shape)
		} else {
			console.warn("Unsupported shape type:", shape);
		}
	}

	/**
	 * Creates an SVG element and HTML UI and appends them to the document body.
	 */
	draw() {
		let startTime = Date.now();
		this.generate();

		this.deduplicateLines();
		this.addLinesToSVG();

		this.addPathsToSVG();

		this.addCirclesToSVG();

		const timeTaken = +(Math.round(((Date.now() - startTime) / 1000) + "e+2") + "e-2");

		this.createUI(timeTaken);
		this.appendSVG();
	}

	/**
	 * Empty out any existing HTML UI and SVG document elements on the page, in order to regenerate a Sketch.
	 */
	clear() {
		this.lines = [];
		this.paths = [];
		this.circles = [];
		document.body.removeChild(this.header)
		document.body.removeChild(this.svg);

		this.svg = createSVG(this.size.width, this.size.height, {
			units: this.units,
			backgroundColor: this.backgroundColor,
		});
	}

	/**
	 * Download the {@link Sketch} as an SVG file
	 */
	downloadSVG() {
		const serializer = new XMLSerializer();
		const source = serializer.serializeToString(this.svg);

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

	/**
	 * Removes duplicated Lines in this Sketch's lines array.
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
	 * Adds the Lines in this Sketch's lines array to it's svg element.
	 */
	addLinesToSVG() {
		for (const line of this.lines) {
			addLineToSVG(this.svg, line.a.x, line.a.y, line.b.x, line.b.y, {
				stroke: "black",
				strokeWidth: this.strokeWidth,
			});
		}
	}

	addPathsToSVG() {
		for (const path of this.paths) {
			addPathToSVG(this.svg, path)
		}
	}

	addCirclesToSVG() {
		for (const circle of this.circles) {
			addCircleToSVG(this.svg, circle);
		}
	}

	/**
	 * Appends this sketch's svg element to the document body.
	 */
	appendSVG() {
		document.body.appendChild(this.svg);
	}

	createUI(timeTaken) {

		// Add the document title
		document.title = `${this.title} ${this.seed.hex}`;

		// Create a HTML header element
		this.header = document.createElement("header");
		document.body.append(this.header);

		// Add a h1 title to the header
		let pageTitle = document.createElement("h1");
		pageTitle.append(`${this.title} ${this.seed.hex}`);
		this.header.appendChild(pageTitle);

		// Add a nav element to the header
		let nav = document.createElement("nav");
		this.header.appendChild(nav);

		// Add a ul element to the nav
		let ul = document.createElement("ul");
		nav.appendChild(ul);

		// Add a download SVG button
		let downloadListItem = document.createElement("li");
		ul.append(downloadListItem);
		let downloadButton = document.createElement("a");
		downloadButton.append("⬇️");
		downloadListItem.appendChild(downloadButton)
		downloadButton.addEventListener('click', () => this.downloadSVG())

		// Add a randomise sketch button
		let randomListItem = document.createElement("li");
		ul.appendChild(randomListItem)
		let randomButton = document.createElement("a");
		randomButton.append("🔄");
		randomListItem.appendChild(randomButton)
		randomButton.addEventListener('click', () => this.randomiseSeed())

		// Add a p element in a div to the header
		let sketchInfo = document.createElement("div")
		let numOfLines = document.createElement("p");

		let numOfShapes = this.lines.length + this.paths.length + this.circles.length;

		// The p element tells the user how many lines have been generated and how fast
		if (timeTaken < 0.05) {
			numOfLines.append(`Generated ${numOfShapes} shapes in <0.05s`)
		} else {
			numOfLines.append(`Generated ${numOfShapes} shapes in ~${timeTaken}s`);
		}
		sketchInfo.appendChild(numOfLines);
		this.header.appendChild(sketchInfo);
	}
}
