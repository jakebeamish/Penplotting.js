import { addLineToSVG } from "./addLineToSVG.js";
import { createSVG } from "./createSVG.js";

let svg = createSVG(200, 200);

addLineToSVG(svg, 0, 0, 200, 200)

document.body.appendChild(svg)