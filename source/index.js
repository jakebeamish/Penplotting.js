import { Vector } from "./Vector.js";
import { Line } from "./Line.js";
import { Sketch } from "./Sketch.js";
import { randomInteger } from "./random.js";
import { wrap } from "./wrap.js";
import { intersectionLineLine } from "./intersectionLineLine.js";
// import { deduplicateLines } from "./deduplicateObjectArray.js";

let sketch = new Sketch(210, 297, {
    units: 'mm',
    backgroundColor: 'gainsboro'
});

let { width, height } = sketch;
const margin = 0.1 * width;

let centre = new Vector(width / 2, height / 2);



for (let i = 0; i < 3; i++) {
    let y = (i+0.5)/3 * height;
    let line = new Line(
        {
            x: margin,
            y: y
        },
        {
            x: width - margin,
            y: y
        }
    )

    sketch.lines.push(line)
}

let newLines = [];

// line.hasChild = false;

for (let i = 0; i < 100; i++) {
    for (let line of sketch.lines) {
        if (!line.hasChild) {
            let midpoint = Vector.lerp(line.a, line.b, Math.random());
            let newpoint;
            if (line.a.x == line.b.x) {
                newpoint = Vector.add(midpoint, new Vector(randomInteger(-50, 50), 0))
            } else if (line.a.y == line.b.y) {
                newpoint = Vector.add(midpoint, new Vector(0, randomInteger(-50, 50)))
            } else {
                console.log("Not straight")
            }

            // newpoint = new Vector(
            //     wrap(newpoint.x, 0, width),
            //     wrap(newpoint.y, 0, height)
            // )

            let newLine = new Line(midpoint, newpoint);
            newLine.hasChild = false;

            let valid = true;
            for (let other of sketch.lines) {
                if (line !== other && intersectionLineLine(newLine, other)
                    || newLine.length() < 10) {
                    valid = false;
                }
            }
            if (valid) {
                // console.log(newLine.length())
                newLines.push(newLine)
                line.hasChild = true;
            }
            // console.log(newLine.length())
        }
    }

    for (let line of newLines) {
        sketch.lines.push(line)
    }
}




sketch.deduplicateLines();

console.log(sketch.lines.length)
console.table(sketch.lines)
sketch.draw();
