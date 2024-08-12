import { Sketch, PAPER, Vector, Line, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "#FFFFFF",
    strokeWidth: 0.1
})

const { width, height } = sketch.size;
const margin = width * 0.2
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {

    const possibleMoves = [
        new Vector(1, 0),
        new Vector(-1, 0),
        new Vector(0, 1),
        new Vector(0, -1),
    ]

    let r = prng.randomFloat();

    if (r < 0.3) {
        possibleMoves.push(
            new Vector(1, -1),
            new Vector(-1, 1)
        )
    } else if (r < 0.6) {
        possibleMoves.push(
            new Vector(1, 1),
            new Vector(-1, -1)
        )
    }

    createPath();

    function createPath() {
        const start = new Vector(width / 2, height / 2);
        let current = start;

        for (let i = 0; i < 1000; i++) {

            let move = prng.randomElement(possibleMoves).clone();
            move.multiply(prng.randomElement([0.5, 1, 2, 3, 10]));
            let next = Vector.add(current, move);

            if (next.x < margin || next.x > width - margin ||
                next.y < margin || next.y > height - margin
            ) {
                if (sketch.lines.length < 10000) {
                    createPath();
                } else {

                }
                return;
            }


            sketch.lines.push(new Line(current, next))
            current = next;
        }
    }
}


sketch.draw();