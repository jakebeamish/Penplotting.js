import { defineFeature, loadFeature } from "jest-cucumber";
import { createSVG } from "../../createSVG";

const feature = loadFeature("./source/tests/features/createSVG.feature");

defineFeature(feature, (test) => {
	test("Create an SVG", ({ given, when, then }) => {
		let svg;
		given("I have a createSVG function", () => {});

		when("I create an SVG", () => {
			svg = createSVG(100, 100);
		});

		then("an SVG element is created", () => {
			expect(svg.nodeName).toBe("svg");
		});
	});

	test("Create an SVG with specific dimensions", ({ given, when, then }) => {
		let svg;
		let width;
		let height;

		given(/^a width of (\d+) and a height of (\d+)$/, (arg0, arg1) => {
			width = arg0;
			height = arg1;
		});

		when("I create an SVG", () => {
			svg = createSVG(width, height);
		});

		then(
			/^the SVG should have a width of (\d+) and a height of (\d+)$/,
			(width, height) => {
				expect(svg.getAttribute("width")).toBe(width.toString());
				expect(svg.getAttribute("height")).toBe(height.toString());
			},
		);
	});

	test("Create an SVG with default dimensions", ({ given, when, then }) => {
		let svg;

		given("I do not specify width and height", () => {});

		when("I create an SVG", () => {
			svg = createSVG();
		});

		then(
			/^the SVG should have a default width of (\d+) and height of (\d+)$/,
			(defaultWidth, defaultHeight) => {
				expect(svg.getAttribute("width")).toBe(defaultWidth.toString());
				expect(svg.getAttribute("height")).toBe(defaultHeight.toString());
			},
		);
	});
});
