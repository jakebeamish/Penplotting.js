import { addLineToSVG } from "./addLineToSVG.js";
import { createSVG } from "./createSVG.js";
import { Vector } from "./Vector.js";

let svg = createSVG(200, 200);
let width = svg.getAttribute("width");
let height = svg.getAttribute("height");


let centre = new Vector(width / 2, height / 2);
for (let i = 0; i < 1000; i++) {
    let other = Vector.fromArray([Math.random() * width, Math.random() * height])
    let distance = centre.distance(other);

    console.log(distance, centre.magnitude(), other.magnitude())
    if (distance > 100 || distance < 50) {
        addLineToSVG(svg, centre.x, centre.y, other.x, other.y);
    }
}
document.body.appendChild(svg)