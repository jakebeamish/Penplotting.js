import { addLineToSVG } from "./addLineToSVG.js";
import { createSVG } from "./createSVG.js";
import { Vector } from "./Vector.js";

let svg = createSVG(200, 200);
let width = svg.getAttribute("width");
let height = svg.getAttribute("height");


let centre = new Vector(width / 2, height / 2);
for (let i = 0; i < 100; i++) {
    let other = Vector.fromArray([Math.random() * width, Math.random() * height])

    addLineToSVG(svg, centre.x, centre.y, other.x, other.y);

}
document.body.appendChild(svg)