import { defineFeature, loadFeature } from "jest-cucumber";

import { Sketch, Line, Vector } from "../../index.js"

const feature = loadFeature("./source/tests/features/removeOverlappingLines.feature");

defineFeature(feature, (test) => {

    afterEach(() => {
        document.body.innerHTML = "";
    });
    test('Remove an overlapping line', ({ given, when, then }) => {

        let mySketch = new Sketch();

        given('a sketch with a long line', () => {
            mySketch.add(new Line(
                new Vector(0, 0),
                new Vector(5, 0)
            ));

            mySketch.add(new Line(
                new Vector(2, 0),
                new Vector(3, 0)
            ))
        });

        when('a shorter overlapping line is added', () => {
            mySketch.add(new Line(
                new Vector(1, 0),
                new Vector(4, 0)
            ));

            mySketch.draw();
        });

        then('the shorter line should not be added to the SVG', () => {
            expect(mySketch.lines.length).toBe(1);
        });
    });
})