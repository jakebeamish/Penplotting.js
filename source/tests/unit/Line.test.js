import { Line } from "../../Line";
import { Vector } from "../../Vector";

describe("The Line class", () => {
	test("The length method returns the distance between the startpoint and endpoint of the line", () => {
		let l = new Line(new Vector(0, 0), new Vector(10, 0));
		expect(l.length()).toBe(10);
	});

	test("can check if it is identical to another line", () => {
		const line1 = new Line(
			new Vector(0, 0),
			new Vector(1, 1)
		)
		const line2 = new Line(
			new Vector(0, 0),
			new Vector(1, 1)
		)

		expect(line1.isDuplicate(line2)).toBe(true)
	})
});
