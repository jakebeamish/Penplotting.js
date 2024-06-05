import { createSVG } from "./createSVG.js";
import { addLineToSVG } from "./addLineToSVG.js";
import { deduplicateObjectArray } from "./deduplicateObjectArray.js";

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
     */
    constructor(width, height, {
       units = 'mm',
       backgroundColor = 'transparent',
       title = "Untitled"
    }={}) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.lines = [];
        this.units = units;
        this.backgroundColor = backgroundColor
        this.svg = createSVG(this.width, this.height, {
            units: this.units,
            backgroundColor: this.backgroundColor
        });
    }

    /**
     * Creates an SVG element and appends it to the document body
     */
    draw() {
        this.deduplicateLines();
        this.addLinesToSVG();

        document.title = this.title;
        this.appendSVG();

    }

    downloadSVG() {
        const svgData = new XMLSerializer().serializeToString(this.svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `${this.title}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
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
        for (let line of this.lines) {
            addLineToSVG(this.svg, line.a.x, line.a.y, line.b.x, line.b.y, { stroke: 'black', strokeWidth: 0.1 });
        }
    }

    /**
     * Appends this sketch's svg element to the document body.
     */
    appendSVG() {
        document.body.appendChild(this.svg);
        }
}