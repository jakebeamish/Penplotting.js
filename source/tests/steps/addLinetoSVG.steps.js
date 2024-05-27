import { defineFeature, loadFeature } from 'jest-cucumber';
import { createSVG } from '../../createSVG.js';
import { addLineToSVG } from '../../addLineToSVG.js';

const feature = loadFeature('./source/tests/features/addLinetoSVG.feature');

defineFeature(feature, test => {

    test('Add a line to an SVG element', ({ given, when, then }) => {
        let svg;

        given('I have an empty SVG element', () => {
            svg = createSVG();
        });

        when('I add a line to the SVG', () => {
            addLineToSVG(svg, 0, 0, 1, 1);
        });

        then('the SVG element should contain the new line', () => {
            expect(svg.querySelector('line')).toBeTruthy();
        });
    });


    test('Add a line with specific coordinates', ({ given, when, then }) => {
        let svg;

        given('I have an empty SVG element', () => {
            svg = createSVG();
        });

        when(/^I add a line with startpoint of (\d+),(\d+) and endpoint (\d+),(\d+)$/, (x1, y1, x2, y2) => {
            addLineToSVG(svg, x1, y1, x2, y2);
        });

        then(/^the SVG element should contain a line with startpoint (\d+),(\d+) and endpoint (\d+),(\d+)$/, (x1, y1, x2, y2) => {
            expect(svg.querySelector('line').getAttribute('x1')).toBe(x1);
            expect(svg.querySelector('line').getAttribute('y1')).toBe(y1);
            expect(svg.querySelector('line').getAttribute('x2')).toBe(x2);
            expect(svg.querySelector('line').getAttribute('y2')).toBe(y2);

        });
    });
})