import { createSVG } from "./createSVG.js";
import { addLineToSVG } from "./addLineToSVG.js";

export class Sketch {
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

    draw() {
        this.addLinesToSVG();
        this.appendSVG();
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