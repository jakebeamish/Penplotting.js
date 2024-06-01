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
     * 
     */
    deduplicateLines() {
        this.lines = deduplicateObjectArray(this.lines);
    }

    addLinesToSVG() {
        for (let line of this.lines) {
            addLineToSVG(this.svg, line.a.x, line.a.y, line.b.x, line.b.y, { stroke: 'black', strokeWidth: 0.1 });
        }
    }

    appendSVG() {
        document.body.appendChild(this.svg);
    }
}