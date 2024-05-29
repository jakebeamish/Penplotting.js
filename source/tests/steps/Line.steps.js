import { defineFeature, loadFeature } from 'jest-cucumber';

import { Line } from '../../Line.js'



const feature = loadFeature('./source/tests/features/Line.feature')

defineFeature(feature, test => {

    test('Create a Line', ({ given, when, then }) => {
        let x1, y1, x2, y2;
        let start, end;
        let line;
        given('coordinates of start and end points', () => {
            start = {x: x1, y: y1};
            end = {x: x2, y: y2}
        });

        when('I create a line', () => {
            line = new Line(start, end)
        });

        then('a line exists with those start and end points', () => {
            expect(line.x1).toBe(x1);
        });
    });

})