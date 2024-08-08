import { Sketch, PAPER, Vector, Line, Circle, Rectangle, Path, Quadtree, XORShift32, map } from "../../source/index.js";

const sketch = new Sketch({
    title: "zigzag-test",
    size: PAPER.A4.landscape(),
    backgroundColor: "#F0F0F0",
    strokeWidth: 0.1,
    units: "mm"
})

sketch.generate = () => {
    const { width, height } = sketch.size;
    const margin = 0.5 * (width + height) * 0.15;
    const prng = new XORShift32(sketch.seed.decimal);
    const centre = new Vector(width / 2, height / 2);



    for (let i = 0; i < 40; i++) {

        // let xStart = margin + prng.randomFloat() * 40;
        // let xEnd = (width - margin) - prng.randomFloat() * 40;

        let xStart = margin * 2;
        let xEnd = width - margin * 2;
        const y = margin + (i/40) * (height - margin * 2);
        const startpoint = new Vector(xStart, y);
        const endpoint = new Vector(xEnd, y);

        sketch.add(new Line( new Vector(margin, y), new Vector(xStart, y)))


        const zigzag = makeZigzag(startpoint, endpoint, map(i, 0, 40, 1, 0.1), 3.3);
        sketch.add(new Path(zigzag));
        sketch.add(new Line(endpoint, new Vector(width-margin, y)));
    }
    



}


sketch.draw();


function makeZigzag(startpoint, endpoint, density, amplitude) {
    const length = Vector.distance(startpoint, endpoint);
    const cycles = length / (density * 4);
    const numOfPoints = (cycles * 2) - 2;

    const angle = Vector.subtract(endpoint, startpoint).getAngle();


    let points = [];

    points.push(startpoint);
    for (let i = 0; i < numOfPoints; i++) {
        const point = Vector.lerp(startpoint, endpoint, (i + 1) / (numOfPoints + 1.5));        
        let cycle = ((i % 2) * 2) - 1;
        point.add(new Vector(0, cycle * amplitude * 0.5).rotate(angle));
        points.push(point);
    }
    points.push(endpoint)
    return points;
}
