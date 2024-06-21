import { Sketch, Paper, Line, Vector, LCG } from "../../source/index.js";

const sketch = new Sketch({
    title: "10PRINT",
    backgroundColor: "snow",
    size: Paper.A5
});

sketch.generate = () => {

    const columns = 100;
    const rows = 141;
    const cellWidth = sketch.size.width / columns;
    const cellHeight = sketch.size.height / rows;
    const lcg = new LCG(Number(sketch.seed.decimal));

    const grid = Array.from({
        length: rows
    }, (v, rowIndex) => Array.from({
        length: columns
    }, (v, columnIndex) => {

        let a = new Vector(
            cellWidth * columnIndex,
            cellHeight * rowIndex
        )
        let b = new Vector(
            cellWidth * (columnIndex + 1),
            cellHeight * (rowIndex + 1)
        )

        if (lcg.randomChance(0.5)) {
            a.add(new Vector(cellWidth, 0));
            b.subtract(new Vector(cellWidth, 0));
        }

        let line = new Line(a, b);
        sketch.lines.push(line);
    }));
}

sketch.draw();
