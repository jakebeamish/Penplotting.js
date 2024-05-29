import { defineFeature, loadFeature } from "jest-cucumber";
import { Sketch } from "../../Sketch";

const feature = loadFeature('./source/tests/features/Sketch.feature');

defineFeature(feature, test => {
    test('Create a sketch', ({ given, when, then }) => {
        let sketch;
        given('I want to create a sketch object to contain an SVG element and stuff', () => {

        });

        when('when I create a sketch object', () => {
            sketch = new Sketch();
        });

        then('a sketch object should exist', () => {
            expect(sketch instanceof Sketch).toBeTruthy();
        });
    });

    test('Add a sketch SVG to the document body', ({ given, when, then }) => {
        let sketch = new Sketch(100, 100);

        given('I want to see the sketch', () => {

        });

        when('I append the SVG to the document', () => {
            sketch.appendSVG();
        });

        then('the SVG should be contained in the document', () => {
            expect(document.querySelector('svg')).toBeTruthy();
        });
    });

    test('Create Lines and add them to the Sketch', ({ given, when, then }) => {

        let sketch;
        let line = {
            a: {
                x: 0,
                y: 0
            },
            b: {
                x: 1,
                y: 1
            }
        }

        given('the sketch may have a line in it\'s lines array', () => {
            sketch = new Sketch();
            sketch.lines.push(line);
        });

        when('I add that line to the SVG', () => {
            sketch.addLinesToSVG();
        });

        then('the SVG should contain that line', () => {
            expect(sketch.svg.querySelector('line').getAttribute('x1')).toBe("0");
            expect(sketch.svg.querySelector('line').getAttribute('y1')).toBe("0");
            expect(sketch.svg.querySelector('line').getAttribute('x2')).toBe("1");
            expect(sketch.svg.querySelector('line').getAttribute('y2')).toBe("1");
        });
    });
})