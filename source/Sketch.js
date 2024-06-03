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
     * @param {string} [options.units = '']
     * @param {string} [options.backgroundColor = 'transparent']
     */
    constructor(width, height, options) {
        this.width = width;
        this.height = height;
        this.units = options?.units || '';
        this.backgroundColor = options?.backgroundColor || 'transparent';
        this.lines = [];
        this.svg = createSVG(this.width, this.height, {
            units: this.units,
            backgroundColor: this.backgroundColor
        });
    }

    /**
     * Creates an SVG and appends it to the document body
     */
    draw() {
        this.addLinesToSVG();
        this.appendSVG();
    }

    /**
     * Removes duplicate Line objects from this Sketch's lines array.
     * TODO: Also check against Lines with reversed start and endpoints.
     */
    deduplicateLines() {
        this.lines = deduplicateObjectArray(this.lines);
    }

    /**
     * Converts the array of {@link} [Line] objects into SVG elements
     */
    addLinesToSVG() {
        for (let line of this.lines) {
            addLineToSVG(this.svg, line.a.x, line.a.y, line.b.x, line.b.y, { stroke: 'black', strokeWidth: 0.15 });
        }
    }

    /**
     * Adds the SVG image of the sketch to the document body.
     */
    appendSVG() {
        document.body.appendChild(this.svg);
    }
}
