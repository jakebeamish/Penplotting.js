import { loadFeature, defineFeature } from "jest-cucumber";

import { Vector } from "../../Vector";

const feature = loadFeature("./source/tests/features/Vector.feature");

defineFeature(feature, (test) => {
	test("Create a Vector from an array", ({ given, when, then }) => {
		let array;
		let vectorFromArray;
		let vectorFromConstructor;
		given(/^an array of numbers \[(\d+), (\d+)\]$/, (arg0, arg1) => {
			array = [arg0, arg1];
		});

		when("I create a Vector from that array", () => {
			vectorFromArray = Vector.fromArray(array);
			vectorFromConstructor = new Vector(array[0], array[1]);
		});

		then(
			/^I should recieve a Vector with x = (\d+) and y = (\d+)$/,
			(arg0, arg1) => {
				expect(vectorFromArray.x).toBe(arg0);
				expect(vectorFromArray.y).toBe(arg1);

				expect(vectorFromArray).toEqual(vectorFromConstructor);
			},
		);
	});

	test("Calculate the magnitude of a Vector", ({ given, when, then }) => {
		let vector;
		let magnitude;
		let expectedMagnitude = 5;

		given(/^a vector with x = 3 and y = 4$/, () => {
			vector = new Vector(3, 4);
		});

		when("I calculate the magnitude", () => {
			magnitude = vector.getMagnitude();
		});

		then(/^I should recieve a magnitude value of 5$/, () => {
			expect(magnitude).toBe(expectedMagnitude);
		});
	});

	test("Add one vector to another", ({ given, when, then }) => {
		let a, b;

		given("two vectors 3,3 and 1,1", () => {
			a = new Vector(3, 3);
			b = new Vector(1, 1);
		});

		when("I add them together", () => {
			a.add(b);
		});

		then(/^I should recieve a new vector 4,4$/, () => {
			expect(a.x).toBe(4);
			expect(a.y).toBe(4);
		});
	});

	test("Subtract one vector from another", ({ given, when, then }) => {
		let a, b;

		given(/^two vectors 1,1 and 3,3$/, () => {
			a = new Vector(1, 1);
			b = new Vector(3, 3);
		});

		when("I subtract the first from the second", () => {
			b.subtract(a);
		});

		then(/^the second vector should now be 2,2$/, () => {
			expect(b.x).toBe(2);
			expect(b.y).toBe(2);
		});
	});

	test("Static addition of two vectors", ({ given, when, then }) => {
		let v1, v2, sum;

		given(
			/^two vectors \((\d+), (\d+)\) and \((\d+), (\d+)\)$/,
			(arg0, arg1, arg2, arg3) => {
				v1 = new Vector(parseInt(arg0), parseInt(arg1));
				v2 = new Vector(parseInt(arg2), parseInt(arg3));
			},
		);

		when("I add them together using Vector.add()", () => {
			sum = Vector.add(v1, v2);
		});

		then(/^a new vector \((\d+), (\d+)\) should be returned$/, (arg0, arg1) => {
			expect(sum.x).toBe(parseInt(arg0));
			expect(sum.y).toBe(parseInt(arg1));
		});
	});

	test("Calculate the distance to another Vector from this Vector", ({
		given,
		when,
		then,
	}) => {
		let v1, v2, distance, expectedDistance;
		given(
			/^a vector \((\d+), (\d+)\) and another \((\d+), (\d+)\)$/,
			(arg0, arg1, arg2, arg3) => {
				v1 = new Vector(parseInt(arg0), parseInt(arg1));
				v2 = new Vector(parseInt(arg2), parseInt(arg3));
			},
		);

		when("I calculate the distance between them", () => {
			distance = v1.distance(v2);
		});

		then(/^I should recieve a result of (\d+)$/, (arg0) => {
			expectedDistance = parseInt(arg0);
			expect(distance).toBe(expectedDistance);
		});
	});

	test("Static subtraction of two vectors", ({ given, when, then }) => {
		let v1, v2, result;
		given(
			/^two vectors \((\d+), (\d+)\) and \((\d+), (\d+)\)$/,
			(arg0, arg1, arg2, arg3) => {
				v1 = new Vector(parseInt(arg0), parseInt(arg1));
				v2 = new Vector(parseInt(arg2), parseInt(arg3));
			},
		);

		when("I subtract them using Vector.subtract()", () => {
			result = Vector.subtract(v1, v2);
		});

		then(/^a new vector \((\d+), (\d+)\) should be returned$/, (arg0, arg1) => {
			expect(result.x).toBe(parseInt(arg0));
			expect(result.y).toBe(parseInt(arg1));
		});
	});

	test("Multiply this vector by a scalar", ({ given, when, then }) => {
		let vector;
		let scalar;

		given(
			/^a vector \((\d+), (\d+)\) and a scalar (\d+)$/,
			(arg0, arg1, arg2) => {
				vector = new Vector(parseInt(arg0), parseInt(arg1));
				scalar = parseInt(arg2);
			},
		);

		when("I multiply the vector by the scalar", () => {
			vector.multiply(scalar);
		});

		then(/^the vector should now equal \((\d+), (\d+)\)$/, (arg0, arg1) => {
			expect(vector.x).toBe(parseInt(arg0));
			expect(vector.y).toBe(parseInt(arg1));
		});
	});

	test("Rotate this vector by 90 degrees", ({ given, when, then }) => {
		let vector;
		let angle;

		given("a vector (1, 0) and an angle 1.5708 radians", () => {
			vector = new Vector(1, 0);
			angle = 1.5708; // π/2 radians
		});

		when("I rotate the vector by the angle", () => {
			vector.rotate(angle);
		});

		then("the vector should now equal approximately (0, 1)", () => {
			expect(vector.x).toBeCloseTo(0, 5);
			expect(vector.y).toBeCloseTo(1, 5);
		});
	});
});
