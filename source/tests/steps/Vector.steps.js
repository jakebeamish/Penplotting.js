import { loadFeature, defineFeature } from "jest-cucumber";

import { Vector } from "../../Vector";

const feature = loadFeature('./source/tests/features/Vector.feature');

defineFeature(feature, test => {
    test('Create a Vector from an array', ({ given, when, then }) => {
        let array;
        let vectorFromArray;
        let vectorFromConstructor;
        given(/^an array of numbers \[(\d+), (\d+)\]$/, (arg0, arg1) => {
            array = [arg0, arg1];
        });

        when('I create a Vector from that array', () => {
            vectorFromArray = Vector.fromArray(array);
            vectorFromConstructor = new Vector(array[0], array[1]);
        });

        then(/^I should recieve a Vector with x = (\d+) and y = (\d+)$/, (arg0, arg1) => {
            expect(vectorFromArray.x).toBe(arg0)
            expect(vectorFromArray.y).toBe(arg1)

            expect(vectorFromArray).toEqual(vectorFromConstructor)


        });
    });

    test('Calculate the magnitude of a Vector', ({ given, when, then }) => {
        let vector;
        let magnitude;
        let expectedMagnitude = 5;

        given(/^a vector with x = 3 and y = 4$/, () => {
            vector = new Vector(3, 4)
        });

        when('I calculate the magnitude', () => {
            magnitude = vector.magnitude();
        });

        then(/^I should recieve a magnitude value of 5$/, () => {
            expect(magnitude).toBe(expectedMagnitude)
        });

    });

    test('Add one vector to another', ({ given, when, then }) => {
        let a, b;

        given('two vectors 3,3 and 1,1', () => {
            a = new Vector(3, 3);
            b = new Vector(1, 1);
        });

        when('I add them together', () => {
            a.add(b);
        });

        then(/^I should recieve a new vector 4,4$/, () => {
            expect(a.x).toBe(4);
            expect(a.y).toBe(4)
        });
    });


    test('Subtract one vector from another', ({ given, when, then }) => {
        let a, b;

        given(/^two vectors 1,1 and 3,3$/, () => {
            a = new Vector(1,1);
            b = new Vector(3,3);
        });

        when('I subtract the first from the second', () => {
            b.subtract(a);
        });

        then(/^the second vector should now be 2,2$/, () => {
            expect(b.x).toBe(2);
            expect(b.y).toBe(2);
        });
    });
});