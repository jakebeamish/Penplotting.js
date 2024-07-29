import { defineFeature, loadFeature } from "jest-cucumber";
import { createSVG } from "../../createSVG.js";
// import { addLineToSVG } from "../../addLineToSVG.js";
import { Line } from "../../Line.js";

const feature = loadFeature("./source/tests/features/addLinetoSVG.feature");

defineFeature(feature, (test) => {
	test("Add a line to an SVG element", ({ given, when, then }) => {
		let svg;
		let line;

		given("I have an empty SVG element", () => {
			svg = createSVG();
		});

		when("I add a line to the SVG", () => {
			line = new Line({x: 0, y: 0}, {x:1, y:1 });
			line.addToSVG(svg)
			// addLineToSVG(svg, 0, 0, 1, 1);
		});

		then("the SVG element should contain the new line", () => {
			expect(svg.querySelector("line")).toBeTruthy();
		});
	});

	test("Add a line with specific coordinates", ({ given, when, then }) => {
		let svg;

		given("I have an empty SVG element", () => {
			svg = createSVG();
		});

		when(
			/^I add a line with startpoint of (\d+),(\d+) and endpoint (\d+),(\d+)$/,
			(x1, y1, x2, y2) => {

				new Line({x: x1, y: y1}, {x:x2, y:y2}).addToSVG(svg);
				// addLineToSVG(svg, x1, y1, x2, y2);
			},
		);

		then(
			/^the SVG element should contain a line with startpoint (\d+),(\d+) and endpoint (\d+),(\d+)$/,
			(x1, y1, x2, y2) => {
				expect(svg.querySelector("line").getAttribute("x1")).toBe(x1);
				expect(svg.querySelector("line").getAttribute("y1")).toBe(y1);
				expect(svg.querySelector("line").getAttribute("x2")).toBe(x2);
				expect(svg.querySelector("line").getAttribute("y2")).toBe(y2);
			},
		);
	});

	test("Add a line with a specified stroke colour", ({ given, when, then }) => {
		let svg;
		given("I have an empty SVG element", () => {
			svg = createSVG();
		});

		when("I add a line with a specified stroke colour", () => {

			new Line({x: 0, y: 0}, {x: 1, y: 1}).addToSVG(svg, {
				stroke: "blue"
			})
		});

		then(
			"the SVG element should contain a line with the specified stroke colour",
			() => {
				expect(svg.querySelector("line").getAttribute("stroke")).toBe("blue");
			},
		);
	});
});
