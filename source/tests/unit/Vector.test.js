import { Vector } from "../../Vector";
import {Line} from "../../Line";
describe("Vector", () => {
	describe("Vector class", () => {
		test("It exists", () => {
			let v = new Vector(0, 0);

			// It is an object
			expect(typeof v).toBe("object");

			// It is a Vector
			expect(v instanceof Vector).toBe(true);
		});

		test("can be created without coordinates (defaults to [0, 0])", () => {
			const a = new Vector();
			expect(a).toEqual({x: 0, y: 0});
		})
	});

	test("has a magnitude which can be set", () => {
		const a = new Vector(1, 1);
		a.setMagnitude(10);
		expect(a.getMagnitude()).toBe(10);
	})

	test("the distance between two vectors can be measured using a static method", () => {
		const a = new Vector(0, 0);
		const b = new Vector(5, 0);
		expect(Vector.distance(a, b)).toBe(5);
	})

	test("isOnLine", () => {
		const a = new Vector(10, 10);
		const line = new Line(new Vector(0, 0), new Vector(10, 0));
		expect(a.isOnLine(line)).toBe(false);
	})


	test("can find nearest neighbours from a given array", () => {


		const a = new Vector(0, 0);
		const b = new Vector(10, 0);
		const c = new Vector(11, 0);
		const d = new Vector(12, 0);

		const points = [b, c, d];

		expect(a.nearestNeighbour(points, 1)).toContain(b)



	})
	

	describe("Vector.lerp()", () => {
		test("It returns a new Vector", () => {
			const a = new Vector(0, 0);
			const b = new Vector(1, 1);
			const amount = 0.5;
			const output = Vector.lerp(a, b, amount);
			expect(output instanceof Vector).toBeTruthy();
		});

		test("Vector.lerp( [0,0], [1,1], 0.5 ) returns [0.5, 0.5]", () => {
			const a = new Vector(0, 0);
			const b = new Vector(1, 1);
			const amount = 0.5;

			expect(Vector.lerp(a, b, amount)).toEqual(new Vector(0.5, 0.5));
		});
	});

	describe("Dot product", () => {
		test("The dot product of (2,2) and (1,4) should be 10", () => {
			expect(Vector.dot(new Vector(2, 2), new Vector(1, 4))).toBe(10);
		});
	});

	describe("Cross product", () => {
		test("The cross product of (2,2) and (1,4) should be 6", () => {
			expect(Vector.cross(new Vector(2, 2), new Vector(1, 4))).toBe(6);
		});
	});

	describe("Vector.normalize()", () => {
		test("Normalized vector should have magnitude of 1", () => {
			const v = new Vector(10, 53);
			v.normalize();
			expect(v.getMagnitude()).toBe(1);
		});

		test("Error should be thrown if a Vector of magnitude zero is normalized", () => {
			const v = new Vector(0, 0);
			expect(() => {
				v.normalize();
			}).toThrowError("Cannot normalize a zero vector");
		});
	});

	describe("Vector.clone()", () => {
		test("It returns a new Vector with the same values", () => {
			const a = new Vector(3, 5);
			const b = a.clone();

			expect(b).toEqual(a);
			expect(b).not.toBe(a);
		});
	});
	


	describe("can be created from an angle", () => {
		test("A vector from angle Pi is the same as [-1, 0]", () => {
			const a = Vector.fromAngle(Math.PI);
			expect(a.x).toBeCloseTo(-1);
			expect(a.y).toBeCloseTo(0);
			expect(a.getMagnitude()).toBe(1);
		});

		test("A vector from angle 0 and magnitude 10 is the same as [10, 0]", () => {
			const a =Vector.fromAngle(0, 10);
			expect(a).toEqual({
				x: 10,
				y: 0
			})
		})
	});

});
