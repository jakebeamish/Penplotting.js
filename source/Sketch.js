import { createSVG } from "./createSVG.js";

export class Sketch {
    constructor(width, height, units) {
        this.width = width;
        this.height = height;
        this.units = units;
        this.lines = [];
        this.svg = createSVG(this.width, this.height, this.units);
    }
}