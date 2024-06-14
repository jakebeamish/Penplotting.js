import { Sketch, Line, Vector, LCG } from "./source/index.js";

let sketch = new Sketch(200, 282,
    {
        // units: "mm",
        seed: 1,
        backgroundColor: "gray",
    }
);

sketch.generate = function () {

    const { width, height } = sketch;
    const lcg = new LCG(sketch.seed.decimal);
    const margin = 0.1 * (width + height) * 0.5;

    const options = {
        cols: [4, 5, 7],
        rows: [3, 5, 8],
        offset: [0],
        lines: [20, 100, 1000]
    }

    const cols = lcg.randomElement(options.cols);
    const rows = lcg.randomElement(options.rows);

    let grid = [];

    for (let j = 0; j < rows; j++) {
        grid[j] = [];
        for (let i = 0; i < cols; i++) {
            const x = margin + (((i + 0.5) / cols) * (width - (margin * 2)));
            const y = margin + (((j + 0.5) / rows) * (height - (margin * 2)));
            const v = new Vector(x, y);
            const r = new Vector(
                (lcg.randomFloat() * 2) - 1,
                (lcg.randomFloat() * 2) - 1
            )
            v.add(r.multiply(lcg.randomElement(options.offset)));

            grid[j].push(v);
        }
    }

    for (let c = 0; c < lcg.randomElement(options.lines); c++) {
        const a = grid[lcg.randomInteger(0, rows)][lcg.randomInteger(0, cols)];
        const b = grid[lcg.randomInteger(0, rows)][lcg.randomInteger(0, cols)];
        const l = new Line(a, b);
        sketch.lines.push(l)
    }
}

sketch.draw();