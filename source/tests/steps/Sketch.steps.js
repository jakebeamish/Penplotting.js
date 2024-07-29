import { defineFeature, loadFeature } from "jest-cucumber";
import { Sketch } from "../../index.js";
import { Line } from "../../index.js";
import { Vector } from "../../index.js";

const feature = loadFeature("./source/tests/features/Sketch.feature");

// Cleanup function to reset the DOM after each test
afterEach(() => {
	document.body.innerHTML = "";
});

defineFeature(feature, (test) => {
	test("Create a sketch", ({ given, when, then }) => {
		let sketch;
		given(
			"I want to create a sketch object to contain an SVG element and stuff",
			() => { },
		);

		when("when I create a sketch object", () => {
			sketch = new Sketch();
		});

		then("a sketch object should exist", () => {
			expect(sketch instanceof Sketch).toBeTruthy();
		});
	});

	test("Add a sketch SVG to the document body", ({ given, when, then }) => {
		let sketch = new Sketch(100, 100);

		given("I want to see the sketch", () => { });

		when("I append the SVG to the document", () => {
			sketch.appendSVG();
		});

		then("the SVG should be contained in the document", () => {
			expect(document.querySelector("svg")).toBeTruthy();
		});
	});

	test("Read Lines from the lines array and add them to the SVG", ({
		given,
		when,
		then,
	}) => {
		let sketch;

		let line = new Line({x: 0, y: 0}, {x:1, y:1})

		given("the sketch may have a line in it's lines array", () => {
			sketch = new Sketch();
			sketch.lines.push(line);
		});

		when("I add that line to the SVG", () => {
			sketch.addLinesToSVG();
		});

		then("the SVG should contain that line", () => {
			expect(sketch.svg.querySelector("line").getAttribute("x1")).toBe("0");
			expect(sketch.svg.querySelector("line").getAttribute("y1")).toBe("0");
			expect(sketch.svg.querySelector("line").getAttribute("x2")).toBe("1");
			expect(sketch.svg.querySelector("line").getAttribute("y2")).toBe("1");
		});
	});

	test("Add lines to the SVG and then add the SVG to the document body", ({
		given,
		when,
		then,
	}) => {
		let sketch;

		given("I want to generate and see the sketch simply", () => { });
		sketch = new Sketch(100, 100);

		sketch.add(new Line(
			{x: 3, y: 4}, {x:5, y:6}
		));
		
	
		when("I call sketch.draw()", () => {
			sketch.generate = function () { };
			sketch.draw();
		});

		then("lines should be added and the SVG should be shown", () => {
			expect(sketch.svg).toBeTruthy();
			expect(sketch.svg).toBeInstanceOf(SVGElement);
			expect(sketch.svg.hasChildNodes()).toBeTruthy();

			// Comparing the SVG element in the document with sketch.svg
			// may need to be done using WaitFor

			expect(document.body.querySelector("svg")).toBeTruthy();
		});
	});

	test("Simplify the Sketch by removing duplicate Lines", ({
		given,
		when,
		then,
	}) => {
		let sketch = new Sketch();

		let a = new Line(
			new Vector(3, 4),
			new Vector(5, 6)
		);

		let b = new Line(
			new Vector(5, 6),
			new Vector(3, 4)

		);

		sketch.lines.push(a);
		sketch.lines.push(b);

		given("I don't want to draw duplicated lines", () => { });

		when("I call Sketch.deduplicateLines()", () => {
			sketch.deduplicateLines();
		});

		then("the Sketch lines array should not contain duplicated lines", () => {
			expect(sketch.lines.length).toBe(1);
		});
	});
});
