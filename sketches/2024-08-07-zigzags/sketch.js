import { Sketch, PAPER, Vector, Line, Circle, Rectangle, Path, Quadtree, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    title: "zigzag-test",
    size: PAPER.A5.landscape(),
    backgroundColor: "#F0F0F0",
    strokeWidth: 0.1
})

sketch.generate = () => {
    const { width, height } = sketch.size;
    const margin = 0.5 * (width + height) * 0.13;
    const prng = new XORShift32(sketch.seed.decimal);
    const centre = new Vector(width / 2, height / 2);

    let start = new Vector(margin, centre.y);
    let end = new Vector(width - margin, centre.y);

    // let points = [];
    // let samples = 100000;

    // for (let i = 0; i < samples; i++) {
    //     let frequency = (i * i) * 0.0000005
    //     points.push(
    //         new Vector(
    //             margin + (i/samples) * (width - margin * 2),
    //             centre.y + Math.sin(frequency) * 50
    //         )
    //     )
    // }

    // sketch.add(new Path(points));




    let points = [];
    points.push(start);

    for (let i = 0; i < 1000; i++) {
        let x = ((width - margin * 2) / 1000);
        let y = (((i % 2) * 2) - 1) * (height - margin * 2);

        x *= (i+1)/500;

        switch (i) {
            case 0:
                y *= 0;
                break;
            case 1:
                y *= 0.5;
                break;
            case 999:
                y *= 0.5;
                break;
        }
        console.log(x)

        let next = Vector.add(points[i], new Vector(x, y));
        points.push(next)
    }

    // points.push(end);




    sketch.add(new Path(points));



}


sketch.draw();