import { Sketch, PAPER, map, Vector, Line, XORShift32, Circle, Quadtree, Rectangle, sinFract, wrap, fract, lerp } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A4,
    backgroundColor: "#DDDDDD",
    strokeWidth: 0.1,
})

const { width, height } = sketch.size;
const margin = 0.2;
const centre = new Vector(width / 2, height / 2)
const prng = new XORShift32(sketch.seed.decimal)

function sf(vector) {
    return sinFract(
        vector.x + sketch.seed.decimal,
        vector.y + sketch.seed.decimal,
        100, 6574, 5647
    )
}

function smoothstep(value) {
    return (value * value * (3 - 2 * value));
}

sketch.generate = () => {

    let grid = [];

    for (let j = 0; j < 141; j += 1) {
        grid[j] = [];
        for (let i = 0; i < 100; i += 1) {
            const angle = sf(new Vector(i, j))

            grid[j][i] = angle;
        }
    }

    for (let j = 0; j < 141; j += 1) {
        for (let i = 0; i < 100; i += 1) {


            let gridX = Math.floor((i /10) % 10);
            let gridY = Math.floor((j/10) % 10);
            let lv = fract((i/10) % 10);
            // lv = smoothstep(lv)
            // console.log(gridX, lv)
            let left = wrap(gridX - 1, 0, 10);
            let right = wrap(gridX + 1, 0, 10);
            let above = wrap(gridY - 1, 0, 10);
            let below = wrap(gridY + 1, 0, 10);

            let bl = grid[below][left];
            let br = grid[below][right];
            let tl = grid[above][left];
            let tr = grid[above][right];

            let b = lerp(bl, br, lv);
            let t = lerp(tl, tr, lv);

            let c = lerp(b, t, lv);
            //  c = smoothstep(c)

            const startpoint = new Vector(
                (margin * width) + (i / 100 * (width * (1 - margin * 2))),
                (margin * height) + (j / 141 * (height * (1 - margin * 2)))
            )

            const endpoint = new Vector(0.8, 0).rotate(c * Math.PI * 2).add(startpoint);

            sketch.add(new Line(startpoint, endpoint))
        }
        // }
    }

    // for (let j = 0; j < 14 - 1; j++) {
    //     for (let i = 0; i < 10 - 1; i++) {
    //         const midpoint = new Vector(
    //             (margin * width) + ((i + 1) / 10 * (width * (1 - margin * 2))),
    //             (margin * height) + ((j + 1) / 14 * (height * (1 - margin * 2)))
    //         )

    //         sketch.add(new Rectangle(
    //             midpoint.x, midpoint.y, (width - (width * margin * 2)) / 10, (height - (height * margin * 2)) / 14
    //         ).lines())
    //     }
    // }

}

sketch.draw();