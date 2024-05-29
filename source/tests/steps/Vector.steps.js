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
    });
});