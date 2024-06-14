import { createSVG } from "./createSVG.js";
import { addLineToSVG } from "./addLineToSVG.js";
import { deduplicateObjectArray } from "./deduplicateObjectArray.js";
import { unseededRandomHex } from "./Random.js";
import { hexToDec } from "./utils.js";
import { decToHex } from "./utils.js";

/**
 * @class
 */
export class Sketch {
	/**
	 *
	 * @param {number} width
	 * @param {number} height
	 * @param {object} [options]
	 * @param {string} [options.title = "Untitled"]
	 * @param {string} [options.units = '']
	 * @param {string} [options.backgroundColor = 'transparent']
	 * @param {number} [seed = unseededRandomHexRandomHex(8)]
	 */
	constructor(
		width,
		height,
		{
			units = "mm",
			backgroundColor = "transparent",
			title = "Untitled",
			seed = unseededRandomHex(8),
		} = {},
	) {
		this.title = title;
		this.width = width;
		this.height = height;
		this.lines = [];
		this.units = units;
		this.backgroundColor = backgroundColor;
		this.svg = createSVG(this.width, this.height, {
			units: this.units,
			backgroundColor: this.backgroundColor,
		});

		this.header;

		// this.seed = seed;

		if (typeof seed === "number") {
			// console.log("seed is a "number")
			this.seed = {
				hex: decToHex(seed, 8),
				decimal: seed
			}
			// console.log("num")
		}

		// this.seed = seed;
		// this.filename = 
	}

	filename() {
		return `${this.title}_${this.seed.hex}_${this.width}x${this.height}${this.units}.svg`;
	}

	/**
	 * Creates an SVG element and appends it to the document body
	 */
	draw() {
		this.generate();
		this.deduplicateLines();
		this.addLinesToSVG();

		document.title = `${this.title} ${this.seed.hex}`;

		this.header = document.createElement("header");
		document.body.append(this.header);

		let pageTitle = document.createElement("h1");
		pageTitle.append(`${this.title} ${this.seed.hex}`);
		this.header.appendChild(pageTitle);

		let nav = document.createElement("nav");
		this.header.appendChild(nav);

		let ul = document.createElement("ul");

		nav.appendChild(ul);

		let li1 = document.createElement("li");
		ul.append(li1);
		let downloadButton = document.createElement("a");
		downloadButton.append("💾 Download");
		// downloadButton.setAttribute("href", "")
		li1.appendChild(downloadButton)
		this.appendSVG();

		downloadButton.addEventListener('click', () => this.downloadSVG())

		let li2 = document.createElement("li");
		ul.appendChild(li2)
		let randomButton = document.createElement("a");
		randomButton.append("🎲 Randomise");
		// randomButton.setAttribute("href)
		li2.appendChild(randomButton)

		randomButton.addEventListener('click', () => this.randomiseSeed())

	}

	clear() {
		this.lines = [];
		document.body.removeChild(this.header)
		document.body.removeChild(this.svg);
	}

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
		console.log(this.seed)
		this.seed = unseededRandomHex(8);
		console.log(this.seed)

		this.clear();

		this.svg = createSVG(this.width, this.height, {
			units: this.units,
			backgroundColor: this.backgroundColor,
		});

		this.draw();
	}

	/**
	 * Removes duplicated Lines in this Sketch's lines array.
	 * @todo Compare startpoints with endpoints too
	 */
	deduplicateLines() {
		this.lines = deduplicateObjectArray(this.lines);
	}

	/**
	 * Adds the Lines in this Sketch's lines array to it's svg element.
	 */
	addLinesToSVG() {
		for (const line of this.lines) {
			addLineToSVG(this.svg, line.a.x, line.a.y, line.b.x, line.b.y, {
				stroke: "black",
				strokeWidth: 0.1,
			});
		}
	}

	/**
	 * Appends this sketch's svg element to the document body.
	 */
	appendSVG() {
		document.body.appendChild(this.svg);
	}
}
