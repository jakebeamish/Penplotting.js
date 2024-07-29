import { Sketch, PAPER, map, Vector, Line, XORShift32, Circle, Quadtree, Rectangle } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A6,
    backgroundColor: "#DDDDDD",
    strokeWidth: 0.1,
})

const { width, height } = sketch.size;
const margin = 12;
const centre = new Vector(width / 2, height / 2);
const prng = new XORShift32(sketch.seed.decimal);

function dotfill(boundary, density, prng) {
     let counter = 0;
     let points = new Quadtree(boundary, 3);
     let minimumDistance = map(density, 0, 1, 0.3, 10);


     while (counter < 500000) {
        counter++;
        let point = new Vector(
            boundary.x + prng.randomBipolarFloat() * boundary.width,
            boundary.y + prng.randomBipolarFloat() * boundary.height,
        )

        let valid = true;

        let neighbours = points.query(new Rectangle(point.x, point.y, minimumDistance * 2, minimumDistance * 2));

        for (let other of neighbours) {
            let distance = point.distance(other)
            if (distance < minimumDistance) {
                valid = false;
            }
        }



        if (valid === true) {
            points.insert(point);
            sketch.add(
                new Circle(
                    point.x, point.y,
                    0.1
                )
            )
        }

     }
}

sketch.generate = () => {
    // let boundary = new Rectangle(
    //     width / 3, centre.y, 20, height * 0.5 - margin
    // )

    let cols = 10;
    let rows = 5;
for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {

        let rect = new Rectangle(
            margin + (width-margin * 2) * (i+1)/(rows) - ((width- margin * 2) / rows) * 0.5,
            margin + (height-margin * 2) * (j+1)/(cols) - ((height- margin * 2) / cols) * 0.5,
            (((width- margin * 2) / rows) * 0.5) - 0.1,
            (((height- margin * 2) / cols) * 0.5) - 0.1
        )

        dotfill(rect, map(((i/rows) ** 2) + ((j/cols) ** 2) , 0, 2, 0.01, 0.3), prng);
    }

}
    // dotfill(boundary, 0, prng);



}

sketch.draw();