import { Sketch, PAPER, Vector, Line, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    backgroundColor: "#DDDDDD",
    strokeWeight: 0.1,
    seed: {
        decimal: 1,
        hex: "00000001"
    }
})

const { width, height } = sketch.size;
const margin = width * 0.2;
const centre = new Vector(width / 2, height / 2)
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {
    let moves = [];

    const primaryMoves = [
        new Vector(0, -1),
        new Vector(1, 0),
        new Vector(0, 1),
        new Vector(-1, 0),
    ]

    const diagonalMoves = [
        new Vector(1, -1),
        new Vector(-1, -1),
        new Vector(-1, 1),
        new Vector(1, 1),
    ]

    primaryMoves.forEach((move) => {
        move.multiply(30)
    });

    diagonalMoves.forEach((move) => {
        move.y *= 0.5;
        move.multiply(20)
    })

    moves = moves.concat(primaryMoves, diagonalMoves);

    const start = centre;

    for (let i = 0; i < 10; i++) {
        let current = start;
        for (let i = 0; i < 100; i++) {
            let move = prng.randomElement(moves);

            prng.randomChance(0.2) ? move.multiply(0.5): null;

            let next = Vector.add(current, move);

            if (next.x < margin || next.x > width - margin ||
                next.y < margin || next.y > height - margin
            ) {
                next.add(move.multiply(-1))
            }

            if (prng.randomChance(0.5)) {
                sketch.lines.push(new Line(current, next));

                if (current.x !== next.x) {
                    if (prng.randomChance(0.4)) {
                        let n = prng.randomElement([5, 20, 50, 0]);
                        for (let i = 0; i < n; i++) {
                            sketch.lines.push(new Line(
                                Vector.add(current, new Vector(0, i * 0.5)),
                                Vector.add(next, new Vector(0, i * 0.5))
                            ));
                        }
                    }
                }
            }

            current = next;
        }
    }
}

sketch.draw();