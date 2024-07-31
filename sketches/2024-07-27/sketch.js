import { Sketch, PAPER, map, Vector, Line, XORShift32, Circle, Quadtree, Rectangle } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A3,
    backgroundColor: "#DDDDDD",
    strokeWidth: 0.1,
})

const { width, height } = sketch.size;
const margin = 0.1;
const centre = new Vector(width / 2, height / 2)
const prng = new XORShift32(sketch.seed.decimal)

sketch.generate = () => {

    let points = new Quadtree(new Rectangle(centre.x, centre.y, width/2, height/2), 3);
    let counter = 0;

    let circles = [];

    //     for (let i = 0; i < 3; i++) {
    //         circles.push(
    //             new Circle(
    //                 (width * margin * 2) + prng.randomFloat() * (width * (1 - margin * 2)),
    //                 (height * margin * 2) + prng.randomFloat() * (height * (1 - margin * 2)),
    //                 10 + prng.randomFloat() * 50
    //             )
    //         )
    //     }

    //     for (let circle of circles) {
    //         // sketch.add(circle)
    //     }


    while(sketch.circles.length < 100000 && counter < 1000000) {
        counter++;
        let point = new Vector(
            prng.randomFloat() * (width - (width * margin * 2)) + (width * margin),
            Math.pow(prng.randomFloat(),0.2) * (height - (height * margin * 2)) + (height * margin)
        );

        // if (prng.randomChance(0.1)) {
        //     point = Vector.add(centre, new Vector(prng.randomFloat() * 10, 0).rotate(prng.randomFloat() * Math.PI * 2));
        // }

        let valid = true;


        
        // if (centre.distance(point) < 20) {
        //     valid = false;
        // }

        for (let circle of circles) {
            if (point.distance(new Vector(circle.x, circle.y)) < circle.radius) {
                if (prng.randomChance(0.9)) {
                valid = false;
            }
            }
        }
        // if (point.y > centre.y &&
        //     point.x > (width - margin * 2 * width) * (1/3) &&
        //     point.x < width - (width - margin * 2 * width) * (1/3) &&
        //     prng.randomChance(0.8)) {
        //     valid = false;
        // }

        let others = points.query(new Rectangle(point.x, point.y, 2, 2))
        for (let other of others) {
            let distance = other.distance(point);
            let pageGradient = map(point.y, height * margin, height - (height * margin * 2), 1, 0.4);
            if (distance < pageGradient) {
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

sketch.draw();