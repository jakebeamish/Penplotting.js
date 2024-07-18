import { defineFeature, loadFeature } from "jest-cucumber";
import { Vector, createSVG } from "../../index.js";
import { addPathToSVG } from "../../index.js";

const feature = loadFeature("./source/tests/features/createSVGPath.feature")

defineFeature(feature, (test) => {
    test('Add a Path to an SVG file', ({ given, when, then }) => {
        let svg;
        let points;
        
        given('I have an SVG element and a list of points', () => {
            svg = createSVG();
            
            points = [
                new Vector(10, 10),
                new Vector(50, 50)
            ];

        });

        when('I create an SVG path from those points', () => {
            addPathToSVG(svg, points);
        });

        then('the SVG element contains that path', () => {
            expect(svg.querySelector("path").getAttribute("d")).toBe("M 10 10 L 50 50 ");

        });
    });
})