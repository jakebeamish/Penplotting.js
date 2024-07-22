import { Sketch, PAPER, Vector, Rectangle } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5.portrait(),
    backgroundColor: "#FFFFFF",
    strokeWeight: 0.1
})

const { width, height } = sketch.size;
const centre = new Vector(width/2, height/2);
const margin = width * 0.2

sketch.generate = () => {

    const rect = new Rectangle(centre.x, centre.y, width/3, height/3);
    sketch.add(rect.lines())
}


sketch.draw();