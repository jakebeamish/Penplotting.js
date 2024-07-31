import { Sketch, PAPER, Vector, Line, Path, Circle, XORShift32 } from "../../source/index.js";

const sketch = new Sketch({
    size: PAPER.A5,
    backgroundColor: "#FFFFFF",
    strokeWidth: 0.1
})

const { width, height } = sketch.size;
const centre = new Vector(width * 0.5, height * 0.5);
const margin = width * 0.3;
const prng = new XORShift32(sketch.seed.decimal)

class Mover {
    constructor(position) {
        this.position = position;
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.maxSpeed = 1;
        this.maxForce = 0.02;
        this.radius = 2;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.edges();
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.multiply(0);
    }

    move(direction) {
        const desired = direction.normalize().multiply(this.maxSpeed);
        const steering = Vector.subtract(desired, this.velocity);
        if (steering.magnitude() > this.maxForce) {
            steering.normalize().multiply(this.maxForce);
        }
        this.applyForce(steering);
    }

    show() {
        sketch.add(new Circle(this.position.x, this.position.y, this.radius));
    }

    edges() {
        if (this.position.x < margin ||
            this.position.x > width - margin) {
            this.velocity.x *= -1;
        }
        if (this.position.y < margin ||
            this.position.y > height - margin) {
            this.velocity.y *= -1;
        }
    }
}

sketch.generate = () => {


    for (let j = 0; j < 10; j++) {
        let wobbliness = 0.01 + prng.randomFloat() * 0.01;
    let m = new Mover(centre);
    let points = [];

    let steering = new Vector();

    for (let i = 0; i < 1000; i++) {

        steering.add(new Vector(
            prng.randomBipolarFloat() * wobbliness,
            prng.randomBipolarFloat() * wobbliness
        ))

        m.move(steering);
        m.update();
        points.push(m.position.clone());
    }

    let path = new Path(points);
    sketch.add(path)
}

}


sketch.draw();

