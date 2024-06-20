import { createSVG } from "./createSVG.js";
import { addLineToSVG } from "./addLineToSVG.js";
import { deduplicateObjectArray } from "./deduplicateObjectArray.js";
import { unseededRandomHex } from "./Random.js";
import { hexToDec } from "./utils.js";
import { decToHex } from "./utils.js";
import { wrap } from "./utils.js";

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
		this.generate = () => { };

		this.seed = seed;

		if (typeof seed === "number") {
			this.seed = {
				hex: decToHex(seed, 8),
				decimal: seed
			}
		}
	}

	filename() {
		return `${this.title}_${this.seed.hex}_${this.width}x${this.height}${this.units}.svg`;
	}

	/**
	 * Creates an SVG element and appends it to the document body
	 */
	draw() {
		let startTime = Date.now();
		this.generate();

		this.deduplicateLines();
		this.addLinesToSVG();

		const timeTaken = +(Math.round(((Date.now() - startTime) / 1000) + "e+2") + "e-2");


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

		let downloadListItem = document.createElement("li");
		ul.append(downloadListItem);
		let downloadButton = document.createElement("a");
		downloadButton.append("💾 Download");
		downloadListItem.appendChild(downloadButton)

		downloadButton.addEventListener('click', () => this.downloadSVG())

		let randomListItem = document.createElement("li");
		ul.appendChild(randomListItem)
		let randomButton = document.createElement("a");
		randomButton.append("🎲 Randomise");
		randomListItem.appendChild(randomButton)

		randomButton.addEventListener('click', () => this.randomiseSeed())

		let sketchInfo = document.createElement("div")

		let numOfLines = document.createElement("p");
		numOfLines.append(`Generated ${this.lines.length} lines in ~${timeTaken}s`)
		sketchInfo.appendChild(numOfLines)
		this.header.appendChild(sketchInfo)

		this.appendSVG();
	}

	clear() {
		this.lines = [];
		document.body.removeChild(this.header)
		document.body.removeChild(this.svg);

		this.svg = createSVG(this.width, this.height, {
			units: this.units,
			backgroundColor: this.backgroundColor,
		});
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
		// console.log(this.seed)
		this.seed = unseededRandomHex(8);
		// console.log(this.seed)
		this.clear();
		this.draw();
	}

	/**
	 * Removes duplicated Lines in this Sketch's lines array.
	 * @todo Compare startpoints with endpoints too
	 */
	deduplicateLines() {
		// this.lines = deduplicateObjectArray(this.lines);
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
