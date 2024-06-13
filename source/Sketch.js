import { createSVG } from "./createSVG.js";
import { addLineToSVG } from "./addLineToSVG.js";
import { deduplicateObjectArray } from "./deduplicateObjectArray.js";
import { unseededRandomHex } from "./Random.js";

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
		this.seed = seed;
		this.filename = `${this.title}_${this.seed.hex}_${this.width}x${this.height}${this.units}.svg`;
	}

	/**
	 * Creates an SVG element and appends it to the document body
	 */
	draw() {
		this.deduplicateLines();
		this.addLinesToSVG();

		document.title = `${this.title} ${this.seed.hex}`;

		let pageTitle = document.createElement("h1");
		pageTitle.setAttribute("class", "gui")
		pageTitle.append(`${this.title} ${this.seed.hex}`);
		document.body.appendChild(pageTitle);

		let downloadButton = document.createElement("a");
		downloadButton.setAttribute("class", "gui")
		downloadButton.append("Download");
		document.body.appendChild(downloadButton)
		this.appendSVG();

		downloadButton.addEventListener('click', () => this.downloadSVG())



	}

	downloadSVG() {
		const serializer = new XMLSerializer();
		const source = serializer.serializeToString(this.svg);

		const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(svgBlob);

		const a = document.createElement("a");
		a.href = url;
		a.download = this.filename;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
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
