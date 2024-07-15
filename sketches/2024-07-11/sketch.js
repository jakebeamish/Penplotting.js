import { Sketch, PAPER, Vector, Line, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "#DDDDDD",
    strokeWeight: 0.1,
    seed: {
        decimal: 1,
        hex: "00000001"
    }
})

const { width, height } = sketch.size;
const margin = width * 0.1;
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
        move.multiply(50)
    });

    diagonalMoves.forEach((move) => {
        move.y *= 0.5;
        move.multiply(30)
    })

    moves = moves.concat(primaryMoves, diagonalMoves);

    const start = centre;

    for (let i = 0; i < 5; i++) {
        let current = start;
        for (let i = 0; i < 20; i++) {
            let move = prng.randomElement(moves);

            prng.randomChance(0.01) ? move.multiply(0.5): null;

            let next = Vector.add(current, move);

            if (next.x < margin || next.x > width - margin ||
                next.y < margin || next.y > height - margin * 3
            ) {
                next.add(move.multiply(-1))
            }

            if (prng.randomChance(1)) {
                sketch.lines.push(new Line(current, next));

                if (current.x !== next.x && current.y < height-margin*3) {
                    if (prng.randomChance(1)) {
                        let n = prng.randomElement([5, 20, 50, 100]);
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