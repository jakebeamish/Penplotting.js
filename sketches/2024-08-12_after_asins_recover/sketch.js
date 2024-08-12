import { Vector, Line, Sketch, LCG, PAPER } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    // units: 'mm',
    backgroundColor: 'gainsboro',
});


sketch.generate = () => {
    const { width, height } = sketch.size;
    const margin = 0.1 * width;
    const centre = new Vector(width / 2, height / 2);

    for (let j = 0; j < 1; j++) {

        let turtle = {
            position: new Vector(margin, height / 2),
            move: function (v) {
                this.position.add(v)
            }
        }

        let movements = [
            new Vector(1, 0),
            new Vector(1, 0),
            new Vector(0, 1),
            new Vector(0, -1),
            new Vector(1, 1),
            new Vector(1, -1),
            new Vector(1, 1),
            new Vector(1, -1),
            new Vector(-1, -1),
            new Vector(-1, 1),
        ]

        let previous = null;

        for (let i = 0; i < 50; i++) {
            let a = new Vector(turtle.position.x, turtle.position.y);

            let index = Math.floor((Math.random() * movements.length))
            let movement = movements[index].clone().multiply(5);
            turtle.move(movement);
            let b = new Vector(turtle.position.x, turtle.position.y);
            sketch.add(new Line(a, b))
        }
    }
}

sketch.draw();